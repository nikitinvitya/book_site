import type {Metadata} from "next";
import { Roboto } from "next/font/google";
import './styles/index.scss'
import React from "react";
import {NavBar} from "@/widgets/NavBar";
import {Footer} from "@/shared/ui/Footer/Footer";

export const metadata: Metadata = {
  title: {
    default: "Book site",
    template: "%s | Book site"
  }
}

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
      <NavBar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
