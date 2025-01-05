'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "@/components/homePage/header"
import Footer from '../components/homePage/footer';
import { persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import store from "@/redux/store";
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
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Header />
            {children}
            <Footer />
          </Router>
        </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
