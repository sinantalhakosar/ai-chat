import { HeaderAuth } from "@/components/HeaderAuth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Copyright } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistMono.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-4 sm:gap-2 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold text-xl">
                    <Link href={"/"} className="text-[#FE8621]">
                      HOME
                    </Link>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="flex flex-col w-full h-[calc(100vh-10rem)] overflow-hidden items-center">
                <div className="flex-grow overflow-auto px-5 w-full flex items-center justify-center">
                  {children}
                </div>
              </div>

              <footer className="w-full flex flex-col items-center justify-center border-t mx-auto text-center text-xs gap-2 py-4 mt-auto">
                <p className="flex items-center gap-2">
                  <Copyright className="w-4 h-4" /> Copyright 2024{" "}
                  <Link
                    href="https://stkdev.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-orange-500 hover:underline">
                      Sinan Talha KOSAR
                    </span>
                  </Link>
                </p>
                <p>All rights reserved</p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
