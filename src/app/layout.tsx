import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";
// import db from "@/lib/supabase/db";

const roboto = Roboto({ subsets: ["latin"],
  weight:'400'
 });


export const metadata: Metadata = {
  title: "Boat-Notes",
  description:
    "The place to organize your notes, collabrate with your friends and share with the world ",
     appleWebApp: {
    title: 'Boat Note',
  }
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log(db)
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" 
        enableSystem
        disableTransitionOnChange
        
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
