import { createFileRoute, Link } from "@tanstack/react-router";
import { NOTICE, NOTICE_VERSION } from "@/lib/advertising";
const title = "Privacidade | Biblioteca Digital Premium";
const description = "Saiba como a Biblioteca Digital Premium usa o Pixel da Meta e como gerenciar sua autorização de publicidade.";
export const Route = createFileRoute("/privacidade")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: Privacy,
});
function Privacy() {
  return <main className="mx-auto max-w-3xl px-6 py-12 text-ink">
    <Link to="/" className="text-sm underline">Voltar à Biblioteca</Link>
    <h1 className="mt-8 font-display text-3xl font-bold">Política de Privacidade</h1>
    <p className="mt-3 text-sm text-ink-soft">Aviso de publicidade — versão {NOTICE_VERSION}</p>
    <h2 className="mt-8 text-xl font-bold">Medição de publicidade</h2>
    <p className="mt-3 leading-relaxed">{NOTICE}</p>
    <p className="mt-4 leading-relaxed">O evento PageView informa uma visita à página; não confirma uma compra. Não configuramos coleta de nomes, e-mails, dados de formulários ou envio de compras ao Pixel. Não inclua dados pessoais nos endereços das páginas.</p>
    <h2 className="mt-8 text-xl font-bold">Sua escolha e retirada</h2>
    <p className="mt-3 leading-relaxed">Nas regiões que exigem autorização, ou quando a localização não puder ser confirmada, a medição fica bloqueada até você aceitar. Nas demais regiões, a medição pode funcionar sem aviso, respeitando recusas e o sinal Global Privacy Control do navegador. A localização é consultada pelo próprio site.</p>
    <p className="mt-4 leading-relaxed">Em Configurações de cookies, no fim da página, você pode recusar ou retirar a autorização a qualquer momento. Abrir as configurações não altera sua escolha. A retirada impede novos envios, mas não apaga dados já recebidos pela Meta.</p>
    <h2 className="mt-8 text-xl font-bold">Registro e destinatário</h2>
    <p className="mt-3 leading-relaxed">Este navegador guarda um identificador aleatório e o histórico de escolhas, com data, região e versão deste aviso. Uma retirada preserva o registro de aceitação anterior. Esses registros ficam neste dispositivo até que o armazenamento do site seja apagado; não são compartilhados com a Meta. Cookies do Pixel seguem os prazos definidos pela Meta.</p>
    <p className="mt-4 leading-relaxed">A destinatária dos dados de medição é a Meta, que pode processá-los internacionalmente conforme sua <a className="underline" href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Política de Privacidade</a>. O pagamento é realizado na Hotmart, sob as regras de privacidade apresentadas no checkout.</p>
  </main>;
}