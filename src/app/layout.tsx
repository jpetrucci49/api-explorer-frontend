import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Explorer",
  description: "Query GitHub user data across multiple backend APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}