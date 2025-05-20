import path from "path";
import type { NextConfig } from "next";
import type { RuleSetRule, RuleSetUse } from "webpack";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  webpack: (config) => {
    /**
     * Ensure variables, functions, and mixins are loaded as resources into all
     * SCSS stylesheets.
     *
     * @see https://github.com/vercel/next.js/issues/11617#issuecomment-629667363
     */
    config.module.rules.forEach((rule: RuleSetRule) => {
      if (rule.oneOf) {
        // Filter out invalid types from rule.oneOf
        const validConfigRules = rule.oneOf.filter(
          (configRule): configRule is RuleSetRule => {
            return (
              configRule !== false &&
              configRule !== null &&
              configRule !== "" &&
              typeof configRule !== "undefined"
            );
          }
        );

        validConfigRules.forEach((configRule: RuleSetRule) => {
          const loaders = configRule.use as RuleSetUse | undefined;

          if (Array.isArray(loaders)) {
            loaders.forEach((loaderItem) => {
              const isSassRule =
                loaderItem &&
                typeof loaderItem === "object" &&
                loaderItem.loader &&
                loaderItem.loader.includes("sass-loader");

              if (isSassRule) {
                loaders.push({
                  loader: "sass-resources-loader",
                  options: {
                    resources: [
                      path.resolve(
                        __dirname,
                        "./src/common/styles/global.scss"
                      ),
                    ],
                  },
                });
              }
            });
          }
        });
      }
    });

    return config;
  },
};

export default nextConfig;
