import { Shield, Wallet, DollarSign, Zap, HelpCircle, Lock, RefreshCw, CreditCard, Award, Clock, Moon, Hash } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const FAQ_SECTIONS = [
  {
    title: "Segurança & Transparência",
    icon: Shield,
    items: [
      {
        q: "Os sorteios são realmente aleatórios e justos?",
        a: "Sim. Nosso sistema utiliza um algoritmo de criptografia ponta a ponta, impossível de manipular. Os resultados são vinculados à Loteria Federal, garantindo sorteios 100% aleatórios e auditáveis. Nenhum funcionário, administrador ou terceiro pode influenciar o resultado.",
        icon: Lock,
      },
      {
        q: "Como posso verificar a autenticidade do sorteio?",
        a: "Cada sorteio possui um hash criptográfico público gerado antes do início. Após o resultado, você pode verificar a integridade comparando o hash com o resultado da Loteria Federal. Transparência total.",
        icon: Shield,
      },
      {
        q: "Meus dados estão protegidos?",
        a: "Utilizamos criptografia SSL/TLS em todas as conexões e seus dados pessoais são armazenados de forma segura, em conformidade com a LGPD. Nunca compartilhamos suas informações com terceiros.",
        icon: Lock,
      },
    ],
  },
  {
    title: "Saldo & Regras",
    icon: Wallet,
    items: [
      {
        q: "O que acontece se a rifa não atingir 90% de adesão?",
        a: "Caso o lote da rifa não alcance 90% de adesão até o horário do sorteio, o valor total do seu PIX é depositado integralmente na sua conta como saldo. Você não perde nada.",
        icon: RefreshCw,
      },
      {
        q: "Como funciona o saldo na minha conta?",
        a: "O dinheiro acumulado na sua conta é exclusivo para a compra de novas rifas dentro da plataforma GoldenRifa. Você pode usar seu saldo para adquirir cotas em qualquer sorteio ativo, maximizando suas chances de ganhar.",
        icon: Wallet,
      },
      {
        q: "Posso sacar meu saldo em dinheiro?",
        a: "O saldo disponível na plataforma é destinado exclusivamente para a compra de cotas em novos sorteios. Essa regra garante a sustentabilidade e segurança do ecossistema para todos os participantes.",
        icon: CreditCard,
      },
    ],
  },
  {
    title: "Pagamentos & Prêmios",
    icon: DollarSign,
    items: [
      {
        q: "Como recebo meu prêmio?",
        a: "O PIX do prêmio é realizado instantaneamente após a finalização do sorteio, diretamente para a chave PIX registrada no seu perfil. Sem burocracia, sem espera — dinheiro no bolso em segundos.",
        icon: Zap,
      },
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Aceitamos pagamentos exclusivamente via PIX, garantindo transações instantâneas, seguras e sem taxas adicionais. O QR Code é gerado automaticamente ao finalizar sua compra.",
        icon: CreditCard,
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
