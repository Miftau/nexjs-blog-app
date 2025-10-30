import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {ThemeProvider} from 'next-themes'
import ThemeCom from "./components/ThemeCom";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeModeScript } from "flowbite-react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PROGRESS BLOG",
  description: "Created by Yusuf Babatunde Muftaudeen (Dev. Progress)",
};

export default function RootLayout({ children }) {
  return (
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <ThemeModeScript/>
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
              <ThemeProvider>
                <ThemeCom>
                  <Header />
                  {children}
                  <Footer />
                </ThemeCom>
              </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
  );
}
