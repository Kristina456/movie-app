import type { Metadata } from "next";
import "./../common/styles/global.css";
import { Navigation } from "@/components/Navigation/Navigation.component";

export const metadata: Metadata = {
  title: "Movie app",
  description: "Movie app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Navigation />
        </nav>
        <div className="children-wrapper">{children}</div>
      </body>
    </html>
  );
}
