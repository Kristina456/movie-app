import type { Metadata } from "next";
import "./../common/styles/global.css";

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
      <body>{children}</body>
    </html>
  );
}
