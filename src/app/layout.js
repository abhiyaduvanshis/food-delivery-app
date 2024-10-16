import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/_components/Header";
import Footer from "@/_components/Footer";
import AuthenticationProvider from "@/context/AuthenticationProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthenticationProvider>
        {children}
        </AuthenticationProvider>
        <ToastContainer/>
        </body>
    </html>
  );
}
