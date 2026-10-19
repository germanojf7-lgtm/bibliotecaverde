import {
  BookOpen, Library, Smartphone, Lightbulb, Download, Check, ShieldCheck, Home, Compass, CalendarClock,
  MousePointerClick, CreditCard, PackageOpen, Star, BadgeCheck,
} from "lucide-react";
import mockup from "@/assets/mockup.png.asset.json";
import { scrollToPricing, TESTIMONIALS, FOOTER_INFO } from "@/config/offer";
import { BuyButton, SectionHeading } from "./ui";

export function HeroSection() {
  return (
    <section className="bg-cream pb-14">
      <header className="border-b border-gold/20 bg-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-3">
          <BookOpen className="h-5 w-5 shrink-0 text-gold" aria-hidden />
          <span className="font-display text-sm font-bold tracking-[0.2em] text-primary-foreground">BIBLIOTECA DIGITAL PREMIUM</span>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 pt-10 text-center">
        <h1 className="font-display text-[1.75rem] font-extrabold leading-tight text-ink sm:text-5xl">
          Transforme Seu Celular em Uma Biblioteca com <span className="text-gold-deep">Milhares de Livros!</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-ink-soft sm:text-lg">
          Tenha acesso a uma coleção de 3.500 livros digitais em PDF para ler, estudar e ampliar seus conhecimentos.
        </p>
        <img
          src={mockup.url}
          alt="Coleção de livros digitais da Biblioteca Digital Premium"
          width={1146}
          height={1408}
          fetchPriority="high"
          className="mx-auto mt-8 h-auto w-full max-w-[460px] mix-blend-multiply"
        />
        <ul className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-2 text-sm text-ink sm:flex-row sm:justify-center sm:gap-5">
          {["Produto 100% digital", "Leitura no celular, tablet ou computador", "Garantia de 7 dias"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-gold-deep" aria-hidden /> {t}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <BuyButton onClick={scrollToPricing}>QUERO ACESSAR MINHA BIBLIOTECA</BuyButton>
        </div>
      </div>
    </section>
  );
}

const receive = [
  { icon: Library, t: "3.500 Livros em PDF", d: "Uma ampla coleção de livros digitais reunidos em um único pacote." },
  { icon: Smartphone, t: "Leia Onde Quiser", d: "Acesse os arquivos em dispositivos compatíveis, como celular, tablet e computador." },
  { icon: Lightbulb, t: "Diversos Temas", d: "Explore diferentes assuntos e descubra novas possibilidades de aprendizado." },
  { icon: Download, t: "Conteúdo Digital", d: "Receba os arquivos digitais conforme as instruções de entrega disponibilizadas após a compra." },
];

export function ReceiveSection() {
  return (
    <section className="bg-background px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="O Que Você Vai Encontrar na Sua Biblioteca Digital?"
          subtitle="Uma coleção de conteúdos digitais para acompanhar você nos momentos de leitura, estudo e aprendizado."
        />
        <div className="grid gap-4 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {receive.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gold/15">
                <Icon className="h-6 w-6 text-gold-deep" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: Library, t: "Tenha milhares de livros reunidos em um só lugar." },
  { icon: Home, t: "Leia no conforto da sua casa ou durante seus momentos livres." },
  { icon: Compass, t: "Explore assuntos de desenvolvimento pessoal, conhecimentos gerais e outras áreas disponíveis na coleção." },
  { icon: CalendarClock, t: "Organize seus momentos de leitura conforme sua rotina." },
];

export function BenefitsSection() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Conhecimento Sempre ao Seu Alcance" />
        <ul className="space-y-3">
          {benefits.map(({ icon: Icon, t }) => (
            <li key={t} className="flex items-start gap-4 rounded-2xl bg-card p-5 shadow-soft">
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-gold-deep" aria-hidden />
              <p className="min-w-0 text-base text-ink">{t}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <BuyButton onClick={scrollToPricing}>CONHECER OS PACOTES</BuyButton>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { icon: MousePointerClick, t: "Escolha Seu Pacote", d: "Selecione a opção que melhor atende às suas necessidades." },
  { icon: CreditCard, t: "Finalize Sua Compra", d: "Você será direcionado para o ambiente de pagamento da Hotmart." },
  { icon: PackageOpen, t: "Receba Seu Acesso", d: "Após a confirmação do pagamento, siga as instruções de entrega para acessar os conteúdos digitais." },
];

export function HowItWorksSection() {
  return (
    <section className="bg-background px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Comece Sua Jornada de Leitura em 3 Passos" />
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, t, d }, i) => (
            <li key={t} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="absolute right-5 top-5 font-display text-3xl font-extrabold text-gold/40">{i + 1}</span>
              <Icon className="mb-4 h-7 w-7 text-gold-deep" aria-hidden />
              <h3 className="font-display text-lg font-bold text-ink">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="O Que Dizem Nossos Leitores" subtitle="Conheça as experiências de pessoas que adquiriram a biblioteca digital." />
        <div className="grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl bg-card p-6 shadow-soft">
              {t.rating && (
                <div className="mb-3 flex gap-0.5" aria-label={`${t.rating} de 5 estrelas`}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
              )}
              <blockquote className="text-sm leading-relaxed text-ink">“{t.text}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                {t.photo && <img src={t.photo} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />}
                <span className="font-semibold text-ink">{t.name}</span>
                {t.verified && <span className="flex items-center gap-1 text-xs text-buy"><BadgeCheck className="h-4 w-4" />Compra verificada</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GuaranteeSection() {
  return (
    <section className="bg-cream px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gold/30 bg-card p-8 text-center shadow-soft">
        <ShieldCheck className="mx-auto h-14 w-14 text-gold-deep" aria-hidden />
        <h2 className="mt-4 font-display text-2xl font-extrabold text-ink sm:text-3xl">Compre com Mais Tranquilidade</h2>
        <p className="mt-3 text-ink-soft">Sua compra é realizada através da Hotmart, e você conta com uma garantia de 7 dias.</p>
        <ul className="mx-auto mt-6 flex w-fit flex-col gap-2 text-left text-ink">
          {["Checkout pela Hotmart", "Produto digital", "Garantia de 7 dias"].map((t) => (
            <li key={t} className="flex items-center gap-2"><Check className="h-5 w-5 text-buy" aria-hidden />{t}</li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <BuyButton onClick={scrollToPricing}>ESCOLHER MEU PACOTE</BuyButton>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const f = FOOTER_INFO;
  const links = [
    { label: "Política de Privacidade", href: f.privacyUrl },
    { label: "Termos de Uso", href: f.termsUrl },
    { label: "Política de Reembolso", href: f.refundUrl },
  ].filter((l) => l.href);
  return (
    <footer className="bg-ink px-4 pb-28 pt-12 text-center text-sm text-primary-foreground/70 md:pb-12">
      <div className="flex items-center justify-center gap-2">
        <BookOpen className="h-5 w-5 text-gold" aria-hidden />
        <span className="font-display font-bold tracking-widest text-primary-foreground">Biblioteca Digital Premium</span>
      </div>
      <p className="mx-auto mt-3 max-w-md">Uma coleção digital para quem valoriza o conhecimento e a leitura.</p>
      {f.supportEmail && <p className="mt-4">Suporte: <a className="text-gold underline" href={`mailto:${f.supportEmail}`}>{f.supportEmail}</a></p>}
      {links.length > 0 && (
        <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {links.map((l) => <a key={l.label} href={l.href} className="hover:text-gold">{l.label}</a>)}
        </nav>
      )}
      {f.responsible && <p className="mt-4">{f.responsible}</p>}
      <p className="mt-6 text-xs">© {new Date().getFullYear()} Biblioteca Digital Premium. Todos os direitos reservados.</p>
    </footer>
  );
}
