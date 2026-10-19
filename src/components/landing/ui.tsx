import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function BuyButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex min-h-14 w-full max-w-md items-center justify-center rounded-xl bg-buy px-6 py-4 text-center font-display text-base font-bold tracking-wide text-buy-foreground shadow-buy transition hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-buy/40",
        className,
      )}
    >
      {children}
    </button>
  );
}

export const buyLinkClass =
  "inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-buy px-6 py-4 text-center font-display text-base font-bold tracking-wide text-buy-foreground shadow-buy transition hover:brightness-110 active:scale-[0.98]";

export function SectionHeading({ title, subtitle }: { title: ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gold" />
      <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-ink-soft sm:text-lg">{subtitle}</p>}
    </div>
  );
}
