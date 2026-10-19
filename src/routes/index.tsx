import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HeroSection, ReceiveSection, BenefitsSection, HowItWorksSection, TestimonialsSection, GuaranteeSection, Footer,
} from "@/components/landing/sections";
import { PricingSection } from "@/components/landing/PricingSection";
import { UpgradeModal } from "@/components/landing/UpgradeModal";
import { FAQSection } from "@/components/landing/FAQSection";
import { scrollToPricing } from "@/config/offer";

const TITLE = "Biblioteca Digital Premium | Livros Digitais em PDF";
const DESC =
  "Conheça a Biblioteca Digital Premium e escolha entre pacotes com milhares de livros digitais em PDF e opções com audiobooks.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const pricing = document.getElementById("pacotes");
      const r = pricing?.getBoundingClientRect();
      const inPricing = r ? r.top < window.innerHeight && r.bottom > 0 : false;
      setShowBar(window.scrollY > window.innerHeight * 0.9 && !inPricing);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => opener.current?.focus(), 0);
  }, []);

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ReceiveSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection onBasic={(el) => { opener.current = el; setOpen(true); }} />
      <FAQSection />
      <GuaranteeSection />
      <Footer />
      <UpgradeModal open={open} onClose={close} />

      {showBar && !open && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <p className="min-w-0 text-sm leading-tight text-primary-foreground">
              Biblioteca Digital a partir de <strong className="text-gold">R$ 27</strong>
            </p>
            <button onClick={scrollToPricing} className="shrink-0 rounded-lg bg-buy px-4 py-2.5 text-sm font-bold text-buy-foreground">
              VER PACOTES
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
