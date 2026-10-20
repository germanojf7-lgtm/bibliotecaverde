export const PIXEL_ID = "2109631469651323";
export const CONSENT_KEY = "biblioteca-advertising-v1";
export const NOTICE_VERSION = "2026-10-20";
export const NOTICE = "Usamos o Pixel da Meta para medir visitas e resultados dos anúncios e apoiar sua otimização no Facebook e Instagram. A Meta pode receber a página visitada, horário, endereço IP, informações do navegador e identificadores de cookies. Você pode aceitar, recusar ou retirar a autorização em Configurações de cookies.";
const CONSENT_REGIONS = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IS IE IT LV LI LT LU MT NL NO PL PT RO SK SI ES SE GB CH BR".split(" "));
export type Choice = { advertising: boolean; at: string; region: string | null; noticeVersion: string };
export type ConsentRecord = { visitor: string; history: Choice[] };

export function requiresConsent(region: string | null) {
  return !region || !/^[A-Z]{2}$/.test(region) || region === "XX" || region === "T1" || CONSENT_REGIONS.has(region);
}
export function permitted(region: string | null, choice: Choice | undefined, optOut: boolean) {
  if (optOut || choice?.advertising === false) return false;
  return choice?.advertising === true || !requiresConsent(region);
}
export function readConsent(): ConsentRecord | null {
  try {
    const record = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    if (!record || typeof record.visitor !== "string" || !Array.isArray(record.history) || !record.history.every((c: Choice) => typeof c.advertising === "boolean" && typeof c.at === "string" && c.noticeVersion === NOTICE_VERSION)) return null;
    return record;
  } catch { return null; }
}
export function saveConsent(advertising: boolean, region: string | null) {
  const previous = readConsent();
  const record: ConsentRecord = { visitor: previous?.visitor ?? crypto.randomUUID(), history: [...(previous?.history ?? []), { advertising, at: new Date().toISOString(), region, noticeVersion: NOTICE_VERSION }] };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(record)); return true; } catch { return false; }
}

type Pixel = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue: unknown[][]; push?: Pixel; loaded?: boolean; version?: string };
declare global { interface Window { fbq?: Pixel; _fbq?: Pixel } }
let initialized = false;
let viewed = false;
export function syncPixel(allowed: boolean) {
  if (!allowed) { window.fbq?.("consent", "revoke"); return; }
  if (!window.fbq) {
    const fbq: Pixel = Object.assign((...args: unknown[]) => { if (fbq.callMethod) fbq.callMethod.apply(fbq, args); else fbq.queue.push(args); }, { queue: [] as unknown[][], loaded: true, version: "2.0" });
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
  }
  window.fbq("consent", "grant");
  if (!initialized) { window.fbq("init", PIXEL_ID, {}, { agent: "lovable" }); initialized = true; }
  if (!document.getElementById("biblioteca-meta-pixel")) {
    const script = document.createElement("script");
    script.id = "biblioteca-meta-pixel";
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  if (!viewed && window.location.pathname === "/") { window.fbq("track", "PageView"); viewed = true; }
}