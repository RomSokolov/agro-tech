import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SITE } from "@/lib/constants";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agrifield.example"),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    "Browse new and pre-owned tractors, harvesters, sprayers and farm machinery. In-house service, warranty and nationwide delivery.",
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "New and pre-owned agricultural equipment with service, warranty and nationwide delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
