import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Code, Sparkles } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Code Snippet Maker - Beautiful Code Organization",
  description: "Create, organize, and share your code snippets with beautiful syntax highlighting and smart tagging",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientProviders>
          {/* Enhanced NavBar */}
          <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-lg">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold gradient-text">Code Snippet Maker</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Organize your code beautifully</p>
                  </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex gap-8 items-center">
                  <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                    Home
                  </Link>
                  <Link href="/snippet/new" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                    Create
                  </Link>
                  <Link href="/snippets" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                    Browse
                  </Link>
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Enhanced Footer */}
          <footer className="bg-white/60 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-700 backdrop-blur-md mt-16">
            <div className="container mx-auto px-6 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Code className="w-6 h-6 text-blue-500" />
                  <span className="text-lg font-semibold gradient-text">Code Snippet Maker</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Built with Next.js, Tailwind CSS, and ❤️ for developers
                </p>
              </div>
            </div>
          </footer>
        </ClientProviders>
      </body>
    </html>
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./lib/**/*.{ts,tsx,js,jsx}",
  ],
  // ...existing theme and plugins...
}
