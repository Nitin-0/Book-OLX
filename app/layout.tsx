import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { PromoBar } from "@/components/layout/PromoBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { ConfettiCanvas } from "@/components/ui/Confetti";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthModal } from "@/components/modals/AuthModal";
import { ChatModal } from "@/components/modals/ChatModal";
import { DeleteListingModal } from "@/components/modals/DeleteListingModal";
import { LightboxModal } from "@/components/modals/LightboxModal";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookOLX — Old Books, New Stories | Buy & Sell Pre-loved Books",
  description:
    "India's most loved second-hand book marketplace. Buy pre-loved books up to 70% off. Sell your shelf in 60 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <body className="antialiased pb-20 md:pb-0 font-body bg-paper text-ink">
        <AppProvider>
          <ConfettiCanvas />
          <ToastContainer />
          <PromoBar />
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <MobileNav />

          {/* Global Modals & Drawers */}
          <CartDrawer />
          <AuthModal />
          <ChatModal />
          <DeleteListingModal />
          <LightboxModal />
        </AppProvider>
      </body>
    </html>
  );
}
