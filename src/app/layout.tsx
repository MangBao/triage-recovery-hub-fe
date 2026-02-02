import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Triage & Recovery Hub",
  description:
    "AI-powered customer support triage system with intelligent complaint analysis",
  keywords: ["AI", "support", "triage", "customer service", "automation"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        {/* Premium Navigation */}
        <nav className="sticky top-0 z-50 glass border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/dashboard" className="flex items-center gap-3 group">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  🎫
                </span>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Triage & Recovery Hub
                  </h1>
                  <p className="text-xs text-slate-400">
                    AI-Powered Support Triage
                  </p>
                </div>
              </a>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-400">
                  System Online
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-sm text-slate-500">
              💡 Powered by <span className="text-primary-400">Mang Bao</span> •
              Built for Full Stack Assessment
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
