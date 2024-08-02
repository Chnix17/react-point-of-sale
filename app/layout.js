// app/layout.js
import { Inter } from "next/font/google";
import Header from './components/Header'; // Adjust the path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();

  return (
    <html lang="en">
      <body className={inter.className}>
      
        {children}
      </body>
    </html>
  );
}
