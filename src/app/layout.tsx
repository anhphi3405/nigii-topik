'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/homePage/header";
import Footer from "./components/homePage/footer";
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
      <head>
      <link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEVHcEz/zUT/zEb/zUP/zD3/zUX/z0r/0E//xT//0VH/uC3/vjX/zkz/yz//0lX/tin/1F7/xjr/z0n/1F//0VTFnyThAAAAFXRSTlMAG8Cw///////SvP89Rf///2aZnPOzRIc1AAAAnUlEQVR4Ac3PxQHDMAAEQTNb3H+tuQ0IUoH3dx6TumfWD+0e+8qmudFhWfti04xmm5eiE7hkHbYN/YwR1Nw/89iU5lge5F6p7DxRXWBdEwpKsZ9ewrugGQ5rT0JvYV+hWaySoX39TdCtoFjYkc9PosbCyuezgDIhyrMH8tEK0WJoQbIWKwpmNVhVqJ+MtdCVeBJM97/BYU9pj1f33F4sIQrJju1MZAAAAABJRU5ErkJggg==" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
            {children}
        <Footer />
      </body>
    </html>
  );
}
