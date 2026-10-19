import { useEffect, useRef } from "react";
import { Check, X, Sparkles, Gift } from "lucide-react";
import { CHECKOUT_LINKS, PACKAGES } from "@/config/offer";
import { cn } from "@/lib/utils";
import { buyLinkClass } from "./ui";

export function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  if (!open) return null;
  const u = PACKAGES.upgrade;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-[4vw] animate-in fade-in" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-3xl border-t-4 border-gold bg-card p-6 shadow-2xl outline-none animate-in zoom-in-95 sm:p-8"
      >
        <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-muted">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <span aria-hidden className="grid h-14 w-14 place-items-center rounded-2xl bg-gold/15 text-gold-deep ring-1 ring-gold/30">
            <Gift className="h-7 w-7" />
          </span>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs font-bold tracking-widest text-gold-deep">
            <Sparkles className="h-4 w-4" aria-hidden /> UMA OFERTA ESPECIAL PARA VOCÊ!
          </p>
          <h2 id="upgrade-title" className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink">
            Que Tal Levar o Pacote Completo por Apenas R$ 37?
          </h2>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Por apenas R$ 37, você pode ampliar sua biblioteca e receber benefícios adicionais.
          </p>
        </div>
        <ul className="mt-5 space-y-2 text-sm text-ink">
          {u.includes.map((i) => <li key={i} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-buy" aria-hidden />{i}</li>)}
        </ul>
        <div className="mt-6 rounded-2xl bg-cream p-4 text-center">
          <p className="text-sm text-ink-soft">De: <s>R$ {u.oldPrice}</s></p>
          <p className="font-display text-ink">Por: <span className="text-4xl font-extrabold text-gold-deep">R$ {u.price}</span></p>
        </div>
        <a
          href={CHECKOUT_LINKS.upgrade37}
          className={cn(
            buyLinkClass,
            "mt-5 whitespace-nowrap px-3 text-[length:clamp(0.7rem,3.4vw,1rem)] sm:px-6",
          )}
        >
          SIM, QUERO O COMPLETO POR R$ 37
        </a>
        <a href={CHECKOUT_LINKS.basic27} className="mt-3 block rounded-xl border border-border px-4 py-3 text-center text-sm font-medium text-ink underline-offset-4 hover:underline">
          Prefiro continuar com o Básico por R$ 27
        </a>
      </div>
    </div>
  );
}
