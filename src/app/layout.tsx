import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Rei Sikk - Web & Frontend developer",
  description: "Portfolio website of Rei Sikk",
  metadataBase: new URL('https://reihopsti.ee'),
  openGraph: {
    title: "Rei Sikk - Web & Frontend developer",
    description: "I develop websites and web applications using modern tools & technologies. Based out of Tallinn, Estonia.",
    url: "https://reihopsti.ee",
    siteName: "Rei Sikk Portfolio",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/1caaaded-267f-4e0c-952a-edd016eb74de.png?token=ROqC5PZ0ksnK0Np90KbKQA9_k7Z_3-V0NvUP-cje3rs&height=732&width=1200&expires=33277000205",
        width: 1200,
        height: 732,
        alt: "Rei Sikk Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rei Sikk - Web & Frontend developer",
    description: "I develop websites and web applications using modern tools & technologies. Based out of Tallinn, Estonia.",
    images: ["https://opengraph.b-cdn.net/production/images/1caaaded-267f-4e0c-952a-edd016eb74de.png?token=ROqC5PZ0ksnK0Np90KbKQA9_k7Z_3-V0NvUP-cje3rs&height=732&width=1200&expires=33277000205"],
    creator: "@reisikk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://reihopsti.ee',
  },
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
