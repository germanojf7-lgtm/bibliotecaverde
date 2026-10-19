import { describe, it, expect } from "vitest";
import { CHECKOUT_LINKS, PACKAGES } from "@/config/offer";

describe("offer rules", () => {
  it("basic R$27 link", () => expect(CHECKOUT_LINKS.basic27).toBe("https://pay.hotmart.com/X108086974E?off=3ctng9r9"));
  it("complete R$47 link", () => expect(CHECKOUT_LINKS.complete47).toBe("https://pay.hotmart.com/X108086974E?off=1rd9j06o"));
  it("upgrade R$37 link", () => expect(CHECKOUT_LINKS.upgrade37).toBe("https://pay.hotmart.com/X108086974E?off=a2enc5gw"));
  it("prices", () => {
    expect(PACKAGES.basic.price).toBe("27,00");
    expect(PACKAGES.complete.price).toBe("47,00");
    expect(PACKAGES.upgrade.price).toBe("37,00");
  });
  it("basic plan lists e-mail support as 'Suporte por e-mail'", () => {
    expect(PACKAGES.basic.includes).toContain("Suporte por e-mail");
    expect(PACKAGES.basic.includes.join(" ")).not.toMatch(/atendimento/i);
  });
});
