import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CONSENT_KEY, NOTICE, permitted, readConsent, requiresConsent, saveConsent, syncPixel } from "@/lib/advertising";

export function AdvertisingConsent() {
  const [region, setRegion] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    let resolved: string | null = null;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const sync = () => {
      const choice = readConsent()?.history.at(-1);
      const optOut = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
      syncPixel(permitted(resolved, choice, optOut));
      if (active) setOpen(!choice && requiresConsent(resolved) && !optOut);
    };
    void (async () => {
      try {
        const response = await fetch("/cdn-cgi/trace", { signal: controller.signal });
        if (response.ok) resolved = (await response.text()).match(/^loc=([A-Z]{2})$/m)?.[1] ?? null;
      } catch { /* Unknown region defaults to denied. */ }
      finally { clearTimeout(timeout); }
      if (!active) return;
      setRegion(resolved); setReady(true); sync();
    })();
    const storage = (event: StorageEvent) => { if (event.key === CONSENT_KEY || event.key === null) sync(); };
    window.addEventListener("storage", storage);
    return () => { active = false; controller.abort(); clearTimeout(timeout); window.removeEventListener("storage", storage); };
  }, []);
  const choose = (advertising: boolean) => {
    if (!saveConsent(advertising, region)) { syncPixel(false); setError(true); return; }
    const optOut = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    syncPixel(permitted(region, readConsent()?.history.at(-1), optOut));
    setError(false); setOpen(false);
  };
  return <>
    <div className="flex flex-wrap items-center justify-center gap-3 bg-cream px-4 py-5 text-sm text-ink">
      <Link to="/privacidade" className="underline">Política de Privacidade</Link>
      <Button variant="link" onClick={() => setOpen(true)}>Configurações de cookies</Button>
    </div>
    {open && <section role="dialog" aria-label="Preferências de publicidade" className="fixed inset-x-0 bottom-0 z-[100] border-t border-gold bg-background px-5 py-5 shadow-soft">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-lg font-bold text-ink">Sua privacidade</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{NOTICE} <Link to="/privacidade" className="underline">Política de Privacidade</Link></p>
        {error && <p role="alert" className="mt-2 text-sm text-destructive">Não foi possível salvar sua escolha. A medição permanece desativada.</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="outline" disabled={!ready} onClick={() => choose(false)}>Recusar</Button>
          <Button variant="outline" disabled={!ready} onClick={() => choose(true)}>Aceitar</Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>Fechar</Button>
        </div>
      </div>
    </section>}
  </>;
}