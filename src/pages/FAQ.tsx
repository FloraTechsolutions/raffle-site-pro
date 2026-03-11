import { Shield, Wallet, DollarSign, Zap, HelpCircle, Lock, RefreshCw, CreditCard, Award, Clock, Moon, Hash } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const FAQ_SECTIONS = [
  {
    title: "Segurança e Transparência",
    icon: Shield,
    items: [
      {
        q: "O sorteio é realmente seguro?",
        a: "Sim. Utilizamos um algoritmo de criptografia de ponta a ponta para a geração dos números premiados. O sistema opera de forma autônoma e descentralizada, o que torna o resultado impossível de ser manipulado por qualquer pessoa, inclusive pela administração do site. Cada bilhete gerado possui uma assinatura digital única vinculada ao sorteio.",
        icon: Lock,
      },
      {
        q: "Como funciona a auditoria dos números?",
        a: "Todos os números são gerados através de uma função matemática de hash (SHA-256), garantindo que a sequência seja 100% aleatória e auditável.",
        icon: Hash,
      },
      {
        q: "Meus dados estão protegidos?",
        a: "Utilizamos criptografia SSL/TLS em todas as conexões e seus dados pessoais são armazenados de forma segura, em conformidade com a LGPD. Nunca compartilhamos suas informações com terceiros.",
        icon: Shield,
      },
    ],
  },
  {
    title: "Pagamentos e Saldo",
    icon: Wallet,
    items: [
      {
        q: "O que acontece se a rifa não atingir o lote mínimo?",
        a: "Nossa prioridade é a sua participação. Caso o lote de uma rifa específica não alcance 90% das cotas vendidas até o horário do sorteio, o valor investido não é perdido: ele é automaticamente estornado para o seu perfil na plataforma como Saldo Interno.",
        icon: RefreshCw,
      },
      {
        q: "Como posso utilizar meu saldo acumulado?",
        a: "O saldo disponível em sua conta é exclusivo para a aquisição de novas cotas em qualquer sorteio ativo no GoldenRifa. É uma forma prática de garantir que você nunca perca a chance de concorrer, mesmo que um lote específico não seja concluído.",
        icon: Wallet,
      },
      {
        q: "Recebi um prêmio! Como recebo o dinheiro?",
        a: "O pagamento é instantâneo. Assim que o sorteio é finalizado e o sistema valida o ganhador, o valor é transferido via PIX em tempo real para a chave cadastrada em seu perfil. Sem burocracia, sem espera.",
        icon: Zap,
      },
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Aceitamos pagamentos exclusivamente via PIX, garantindo transações instantâneas, seguras e sem taxas adicionais. O QR Code é gerado automaticamente ao finalizar sua compra.",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Dinâmica dos Sorteios",
    icon: DollarSign,
    items: [
      {
        q: "Qual a diferença entre a Rifa de 60 Minutos e a Rifa das 21h?",
        a: "Rifas de 60 Minutos: São sorteios expressos de alta rotatividade, ideais para quem busca resultados rápidos ao longo do dia. Rifas das 21h: É o nosso sorteio principal diário, com lotes maiores e prêmios diferenciados, ocorrendo sempre no horário nobre.",
        icon: Clock,
      },
      {
        q: "Existe um valor mínimo de compra?",
        a: "Cada rifa possui um valor de cota específico. Você pode comprar a partir de 1 cota, mas oferecemos pacotes promocionais (50, 100, 500 e 1000 cotas) para melhor custo-benefício.",
        icon: Award,
      },
    ],
  },
];

const FAQ = () => (
  <div className="min-h-screen">
    <Navbar />
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full mx-auto">
          <HelpCircle className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary-foreground">
            Central de Ajuda
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
          Dúvidas <span className="text-primary">Frequentes</span>
        </h2>
        <p className="text-muted-foreground text-sm font-medium max-w-lg mx-auto">
          Tudo o que você precisa saber sobre a GoldenRifa, nossos sorteios, pagamentos e segurança.
        </p>
      </div>

      {/* Sections */}
      {FAQ_SECTIONS.map((section) => (
        <div key={section.title} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 gold-gradient rounded-xl text-primary-foreground">
              <section.icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-tight">{section.title}</h3>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {section.items.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`${section.title}-${idx}`}
                className="glass rounded-2xl border-border/50 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-sm font-bold hover:no-underline hover:text-primary py-5 gap-3">
                  <div className="flex items-center gap-3 text-left">
                    <item.icon className="w-4 h-4 text-primary shrink-0" />
                    {item.q}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}

      {/* CTA */}
      <div className="glass-card rounded-3xl p-10 text-center space-y-4">
        <h4 className="text-2xl font-black uppercase italic">Ainda tem dúvidas?</h4>
        <p className="text-muted-foreground text-sm font-medium">
          Fale com nosso suporte via WhatsApp. Atendimento rápido e humano.
        </p>
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Preciso%20de%20ajuda%20com%20a%20GoldenRifa."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 gold-gradient px-8 py-4 rounded-2xl text-primary-foreground font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all"
        >
          Falar com Suporte
        </a>
      </div>
    </div>
    <Footer />
    <WhatsAppFAB />
  </div>
);

export default FAQ;
