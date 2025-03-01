import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Rei Sikk - Web & Frontend developer",
  description: "Portfolio website of Rei Sikk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
