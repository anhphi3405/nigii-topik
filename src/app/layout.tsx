'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/app//components/header"
import Footer from './components/footer';
import { Provider } from "react-redux";
import store from "@/redux/store";
import { BrowserRouter as Router } from 'react-router-dom';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <Router>
            <Header />
            {children}
            <Footer />
          </Router>
        </Provider>
      </body>
    </html>
  );
}
