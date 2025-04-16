import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins, Lato, Roboto } from "next/font/google"; // Only Poppins font is loaded globally
import { Metadata } from "next";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "DataCliq LMS",
  description: "Master data analysis with DataCliq – free courses, mentorship, and real-world projects for aspiring data analysts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <Toaster position="top-right" />
          {children}
        </body>
      </html>
      </ClerkProvider>
  );
}