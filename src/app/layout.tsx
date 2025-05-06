import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "Rei Sikk - Web & Frontend developer",
  description: "Portfolio website of Rei Sikk",
  keywords: [
    "Rei Sikk",
    "Rei Sikk portfolio",
    "Rei Sikk web developer",
    "Rei Sikk frontend developer",
    "Rei Sikk frontend development",
    "Rei Sikk web development",
    "Rei Sikk web designer",
    "Rei Sikk web design",
    "Rei Sikk web applications",
    "Rei Sikk websites",
    "Rei Sikk UI designer",
    "Rei Sikk UI design",
    "Rei Sikk",
    "rei sikk",
    "rei sikk portfolio",
    "rei",
    "sikk",
    "reeisikk",
    "sikkrei",
    "Estonian web developer",
    "Tallinn frontend developer",
    "React developer Estonia",
    "Next.js developer",
    "JavaScript expert Tallinn",
    "TypeScript developer",
    "UI/UX designer Estonia",
    "Frontend freelancer Europe",
    "Web developer portfolio",
    "Creative developer Rei Sikk",
    "Interactive web experiences",
    "Modern web applications",
    "GSAP animations",
    "Responsive web design",
    "Tallinn web design",
    "Frontend development Estonia",
    "Web design portfolio",
    "Web development portfolio",
    "Web design and development",
    "Web design and development portfolio",
    "Web design and development services",
    "Web design and development company Estonia",

  ],
  authors: [
    {
      name: "Rei Sikk",
      url: "https://reihopsti.ee",
    },
  ],
  creator: "Rei Sikk",
  publisher: "Rei Sikk",
  applicationName: "Rei Sikk Portfolio",
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
      {process.env.NEXT_PUBLIC_GA_ID && (
         <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
       )}
    </html>
  );
}
