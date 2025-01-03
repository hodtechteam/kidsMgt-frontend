import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import "./globals.css";
import { Suspense } from 'react';


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kids Management",
  description: "HOD's Kids Managment Applicationwsw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head> 
         <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <MantineProvider>
            {children}
          </MantineProvider>
        </Suspense>

  
      </body>
    </html>
  );
}
