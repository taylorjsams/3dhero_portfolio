import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Scene from "@/components/canvas/Scene";
import ProceduralHero from "@/components/canvas/ProceduralHero";
import ScrollManager from "@/components/dom/ScrollManager";
import Navbar from "@/components/dom/Navbar";
import Loader from "@/components/dom/Loader";
import HeroBackgroundGrid from "@/components/dom/HeroBackgroundGrid";
import Footer from "@/components/dom/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taylor Sams - Digital Product Designer New York",
  description: "Premium personal portfolio of Taylor Sams, a Digital Product Designer based in New York specializing in industrial futurism and 3D interfaces.",
  keywords: ["Digital Product Designer", "UX/UI Design", "3D Interface", "Industrial Futurism", "New York Designer", "React", "Next.js", "Three.js"],
  openGraph: {
    title: "Taylor Sams - Digital Product Designer",
    description: "Designing the future of digital interfaces through industrial futurism and 3D experiences.",
    url: "https://taylorsams.design",
    siteName: "Taylor Sams Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists or is created
        width: 1200,
        height: 630,
        alt: "Taylor Sams Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taylor Sams - Digital Product Designer",
    description: "Designing the future of digital interfaces.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <HeroBackgroundGrid />
        <Scene>
          <ProceduralHero />
        </Scene>
        <ScrollManager />
        <Navbar />
        <Loader />
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
