import type { Metadata, Viewport } from "next";
import "./globals.scss";

// Note: Đã loại bỏ Inter font và React Query Providers để tối ưu performance

export const metadata: Metadata = {
  title: "React Test App",
  description: "A complete Next.js base project with TypeScript, Bootstrap, and modern tools",
  keywords: ["Next.js", "React", "TypeScript", "Bootstrap"],
  authors: [{ name: "Your Name" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
