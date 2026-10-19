import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./ui";

const faqs = [
  ["Os livros são físicos ou digitais?", "Todos os livros são digitais, em formato PDF. Você não receberá livros físicos."],
  ["Posso ler pelo celular?", "Sim. Os arquivos PDF podem ser abertos em celulares, tablets e computadores compatíveis."],
  ["Qual é a diferença entre o Básico e o Completo?", "O Básico oferece 3.500 livros digitais, atendimento por e-mail e garantia de 7 dias. O Completo amplia a biblioteca para 5.500 livros no total, acrescenta mais de 3.500 audiobooks e oferece suporte pelo WhatsApp, além dos benefícios do Básico."],
  ["O Pacote Básico inclui audiobooks?", "Não. Os audiobooks estão disponíveis no Pacote Completo."],
  ["Como vou receber meu produto?", "Após a confirmação do pagamento, você receberá as instruções de acesso e entrega digital disponibilizadas pela plataforma."],
  ["Tenho direito a garantia?", "Sim. Os pacotes possuem garantia de 7 dias, conforme as condições informadas na compra."],
  ["Posso pagar pela Hotmart?", "Sim. Ao escolher seu pacote, você será direcionado ao checkout correspondente da Hotmart."],
  ["O atendimento é pelo WhatsApp?", "O Pacote Básico possui atendimento exclusivamente por e-mail. O Pacote Completo inclui também suporte pelo WhatsApp."],
];

export function FAQSection() {
  return (
    <section className="bg-background px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Perguntas Frequentes" />
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-border bg-card shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <h3 className="min-w-0 text-base">{q}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-gold-deep transition group-open:rotate-180" aria-hidden />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
