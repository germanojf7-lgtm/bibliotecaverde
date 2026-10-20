import { beforeEach, describe, expect, it } from "vitest";
import { permitted, readConsent, requiresConsent, saveConsent } from "@/lib/advertising";
describe("regional advertising permission", () => {
  beforeEach(() => localStorage.clear());
  it("blocks unknown and consent regions before acceptance", () => {
    for (const region of [null, "XX", "T1", "DE", "GB", "BR"]) expect(permitted(region, undefined, false)).toBe(false);
    expect(requiresConsent("US")).toBe(false);
    expect(permitted("US", undefined, false)).toBe(true);
  });
  it("honors explicit refusals and global opt-outs in every region", () => {
    const choice = { advertising: false, at: "2026-10-20", region: "US", noticeVersion: "2026-10-20" };
    expect(permitted("US", choice, false)).toBe(false);
    expect(permitted("US", { ...choice, advertising: true }, true)).toBe(false);
    expect(permitted("DE", { ...choice, advertising: true }, false)).toBe(true);
  });
  it("preserves acceptance evidence after withdrawal", () => {
    expect(saveConsent(true, "BR")).toBe(true);
    const visitor = readConsent()?.visitor;
    expect(saveConsent(false, "BR")).toBe(true);
    expect(readConsent()?.visitor).toBe(visitor);
    expect(readConsent()?.history.map(c => c.advertising)).toEqual([true, false]);
    expect(readConsent()?.history[0].noticeVersion).toBe("2026-10-20");
  });
});