import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from './lib/auth'
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Components",
  description: "Header, Hero, Footer",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth.api.getSession({
  //   headers: headers(),
  // });

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
