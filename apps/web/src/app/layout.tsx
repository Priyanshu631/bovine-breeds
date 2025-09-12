import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoSevak - Indian Cattle Breed Identifier",
  description: "Deep learning model to identify Indian cattle and buffalo breeds from images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}