import { useEffect, useRef, useState } from "react";
import { Check, X, Sparkles, Gift } from "lucide-react";
import { CHECKOUT_LINKS, PACKAGES } from "@/config/offer";
import { cn } from "@/lib/utils";
import { buyLinkClass } from "./ui";

const COLORS = ["var(--gold)", "var(--buy)", "#f5d36b", "#ff7aa8", "#7ad3ff", "#ffffff"];
const GLITTER = Array.from({ length: 60 }, (_, i) => {
  const a = (i / 60) * Math.PI * 2 + (i % 3) * 0.2;
  const r = 90 + ((i * 37) % 140);
  return { dx: Math.cos(a) * r, dy: Math.sin(a) * r, s: 4 + (i % 4) * 2, c: COLORS[i % COLORS.length], d: (i % 6) * 40 };
});

export function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [celebrating, setCelebrating] = useState(false);
  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    if (!open) {
      setWelcome(false);
      setCelebrating(false);
      return;
    }
    setWelcome(true);
    const t = setTimeout(() => setWelcome(false), 2600);
    return () => clearTimeout(t);
  }, [open]);

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
        {welcome && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl bg-card/70" role="status" aria-live="polite">
            {GLITTER.map((g, i) => (
              <span key={i} className="glitter-piece rounded-sm" style={{ width: g.s, height: g.s, background: g.c, animationDelay: `${g.d}ms`, ["--dx" as string]: `${g.dx}px`, ["--dy" as string]: `${g.dy}px` }} />
            ))}
            <div className="animate-welcome absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="animate-gift grid h-20 w-20 place-items-center rounded-3xl bg-gold/30 text-gold-deep ring-2 ring-gold shadow-lg shadow-gold/40"><Gift className="h-10 w-10" /></span>
              <p className="mt-4 font-display text-2xl font-extrabold text-ink">Seja bem-vindo(a)! 🎁</p>
              <p className="mt-1 text-sm text-ink-soft">Seu presente está a caminho…</p>
            </div>
          </div>
        )}
        {celebrating && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-3xl bg-card/85" role="status">
            {GLITTER.map((g, i) => (
              <span key={i} className="glitter-piece rounded-sm" style={{ width: g.s, height: g.s, background: g.c, animationDelay: `${g.d}ms`, ["--dx" as string]: `${g.dx}px`, ["--dy" as string]: `${g.dy}px` }} />
            ))}
            <div className="animate-welcome absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <span className="animate-gift grid h-20 w-20 place-items-center rounded-3xl bg-gold/30 text-gold-deep ring-2 ring-gold"><Gift className="h-10 w-10" /></span>
              <p className="mt-4 font-display text-2xl font-extrabold text-ink">Seja bem-vindo(a)! 🎁</p>
              <p className="mt-1 text-sm text-ink-soft">Seu presente está a caminho…</p>
            </div>
          </div>
        )}
        <button onClick={onClose} aria-label="Fechar" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-muted">
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center text-center">
          <span aria-hidden className="animate-gift grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold/40 to-gold/10 text-gold-deep ring-2 ring-gold/60">
            <Gift className="h-8 w-8 drop-shadow" />
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
          onClick={(e) => {
            if (celebrating) { e.preventDefault(); return; }
            e.preventDefault();
            setCelebrating(true);
            setTimeout(() => { window.location.href = CHECKOUT_LINKS.upgrade37; }, 1600);
          }}
          className={cn(
            buyLinkClass,
            "mt-5 whitespace-nowrap px-3 text-[length:clamp(0.7rem,3.4vw,1rem)] sm:px-6",
            !celebrating && "animate-slow-pulse",
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
