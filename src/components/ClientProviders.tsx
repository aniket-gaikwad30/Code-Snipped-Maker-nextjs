// components/ClientProviders.tsx
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "next-themes";

export const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <ToastContainer position="top-right" autoClose={2000} />
    </ThemeProvider>
  );
};
