// Links de pagamento Hotmart — NÃO ALTERAR
export const CHECKOUT_LINKS = {
  basic27: "https://pay.hotmart.com/X108086974E?off=3ctng9r9",
  complete47: "https://pay.hotmart.com/X108086974E?off=1rd9j06o",
  upgrade37: "https://pay.hotmart.com/X108086974E?off=a2enc5gw",
} as const;

export const PACKAGES = {
  basic: {
    name: "Pacote Básico",
    price: "27,00",
    includes: [
      "3.500 livros digitais em PDF",
      "Conteúdo 100% digital",
      "Leitura em dispositivos compatíveis",
      "Garantia de 7 dias",
      "Suporte por e-mail",
    ],
    excludes: ["Audiobooks", "Suporte pelo WhatsApp", "Biblioteca ampliada de 5.500 livros"],
    cta: "QUERO O PACOTE BÁSICO",
  },
  complete: {
    name: "Pacote Completo",
    price: "47,00",
    badge: "MAIS BENEFÍCIOS",
    includes: [
      "Todos os benefícios do Pacote Básico",
      "Biblioteca ampliada: 5.500 livros em PDF no total",
      "Mais de 3.500 audiobooks para baixar e escutar",
      "Suporte pelo WhatsApp",
      "Suporte por e-mail",
      "Garantia de 60 dias",
      "Conteúdo digital para dispositivos compatíveis",
    ],
    cta: "QUERO O PACOTE COMPLETO",
  },
  upgrade: {
    oldPrice: "47,00",
    price: "37,00",
    includes: [
      "5.500 livros digitais em PDF no total",
      "Mais de 3.500 audiobooks",
      "Audiobooks disponíveis para baixar e escutar",
      "Suporte pelo WhatsApp",
      "Suporte por e-mail",
      "Garantia de 60 dias",
      "Todos os benefícios do Pacote Básico",
    ],
  },
} as const;

// Depoimentos reais: preencha aqui. Enquanto vazio, a seção fica oculta.
export type Testimonial = {
  name: string;
  text: string;
  photo?: string;
  rating?: number; // 1-5, somente se real
  verified?: boolean; // somente se comprovado
};
export const TESTIMONIALS: Testimonial[] = [];

// Dados do rodapé: preencha com informações reais. Campos vazios ficam ocultos.
export const FOOTER_INFO = {
  supportEmail: "",
  responsible: "",
  privacyUrl: "",
  termsUrl: "",
  refundUrl: "",
};

export function scrollToPricing() {
  document.getElementById("pacotes")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
