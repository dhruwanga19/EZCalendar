import { Inter, Josefin_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Meeting Scheduler",
  description: "Made with help of NextJS, ReactJS, Firebase and KindeAuth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
