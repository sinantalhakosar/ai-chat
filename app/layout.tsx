import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/common/Toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "AI - Chat",
  description: "Innovative AI-powered chat interface",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${GeistMono.className} dark`} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <main className="w-full h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
