import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CoHabit",
  description: "Find your perfect roommate match",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
