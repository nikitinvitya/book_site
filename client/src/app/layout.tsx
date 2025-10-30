import type {Metadata} from "next";
import './styles/global.css'
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Book site",
    template: "%s | Book site"
  }
}

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
