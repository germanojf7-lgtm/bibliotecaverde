import { Check, X } from "lucide-react";
import { CHECKOUT_LINKS, PACKAGES } from "@/config/offer";
import { BuyButton, SectionHeading, buyLinkClass } from "./ui";

export function PricingSection({ onBasic }: { onBasic: (el: HTMLButtonElement) => void }) {
  const { basic, complete } = PACKAGES;
  return (
    <section id="pacotes" className="scroll-mt-4 bg-background px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Seu Próximo Livro Está a Um Clique de Distância" subtitle="Escolha seu pacote e finalize a compra com segurança pela Hotmart." />
        <div className="grid gap-6 md:grid-cols-2 md:items-start">
          <article className="flex flex-col items-center text-center rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-bold text-ink">{basic.name}</h3>
            <p className="mt-3 font-display text-ink"><span className="text-lg">R$</span> <span className="text-5xl font-extrabold">{basic.price}</span></p>
            <ul className="mx-auto mt-6 w-fit max-w-full space-y-3 text-left text-sm text-ink">
              {basic.includes.map((i) => <li key={i} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-buy" aria-hidden />{i}</li>)}
            </ul>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-soft">Não inclui</p>
            <ul className="mx-auto mt-2 w-fit max-w-full space-y-2 text-left text-sm text-ink-soft">
              {basic.excludes.map((i) => <li key={i} className="flex gap-2"><X className="h-5 w-5 shrink-0 text-destructive/70" aria-hidden />{i}</li>)}
            </ul>
            <BuyButton className="mt-8 max-w-none self-stretch" onClick={(e) => onBasic(e.currentTarget)} aria-haspopup="dialog">{basic.cta}</BuyButton>
          </article>

          <article className="relative flex flex-col items-center text-center rounded-3xl border-2 border-gold bg-card p-6 shadow-gold sm:p-8">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold tracking-wider text-ink">{complete.badge}</span>
            <h3 className="font-display text-xl font-bold text-ink">{complete.name}</h3>
            <p className="mt-3 font-display text-ink"><span className="text-lg">R$</span> <span className="text-5xl font-extrabold">{complete.price}</span></p>
            <ul className="mx-auto mt-6 w-fit max-w-full space-y-3 text-left text-sm text-ink">
              {complete.includes.map((i) => <li key={i} className="flex gap-2"><Check className="h-5 w-5 shrink-0 text-buy" aria-hidden />{i}</li>)}
            </ul>
            <a href={CHECKOUT_LINKS.complete47} className={`${buyLinkClass} mt-8 self-stretch`}>{complete.cta}</a>
          </article>
        </div>
      </div>
    </section>
  );
}
