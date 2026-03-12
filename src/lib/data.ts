import rifa1 from "@/assets/rifa-1.png";
import rifa2 from "@/assets/rifa-2.png";
import rifa3 from "@/assets/rifa-3.png";
import rifaNoturna1 from "@/assets/rifa-noturna-1.png";
import rifaNoturna2 from "@/assets/rifa-noturna-2.png";
import rifaNoturna3 from "@/assets/rifa-noturna-3.png";
import rifaNoturna4 from "@/assets/rifa-noturna-4.png";
import rifaNoturna5 from "@/assets/rifa-noturna-5.png";

export const WHATSAPP_NUMBER = "5511999999999";

// Express: total = premio × 2.5 × 2, preço = R$0,50/cota
export const EXPRESS_RAFFLES = [
  { id: 1, titulo: "PIX DE R$ 500,00", desc: "Prêmio máximo — sua grande chance!", preco: 0.50, vendidos: 2200, total: 2500, img: rifa1 },
  { id: 2, titulo: "PIX DE R$ 400,00", desc: "Premiação alta com ótimas chances!", preco: 0.50, vendidos: 1500, total: 2000, img: rifa2 },
  { id: 3, titulo: "PIX DE R$ 300,00", desc: "Prêmio intermediário — valor garantido!", preco: 0.50, vendidos: 1000, total: 1500, img: rifa3 },
  { id: 4, titulo: "PIX DE R$ 250,00", desc: "Sorteio rápido com grande retorno!", preco: 0.50, vendidos: 800, total: 1250, img: rifa1 },
  { id: 5, titulo: "PIX DE R$ 200,00", desc: "Sorteio expresso — resultado em 60 min!", preco: 0.50, vendidos: 600, total: 1000, img: rifa2 },
  { id: 6, titulo: "PIX DE R$ 100,00", desc: "Sua chance rápida de ganhar hoje!", preco: 0.50, vendidos: 300, total: 500, img: rifa3 },
];

// Noturnas: total = premio × 2.5 × 1, preço = R$1,00/cota
export const NIGHTLY_RAFFLES = [
  { id: 7, titulo: "PIX DE R$ 1.000,00", desc: "O grande prêmio da noite!", preco: 1.00, vendidos: 2000, total: 2500, img: rifa1 },
  { id: 8, titulo: "PIX DE R$ 800,00", desc: "Premiação noturna de alto valor!", preco: 1.00, vendidos: 1500, total: 2000, img: rifa2 },
  { id: 9, titulo: "PIX DE R$ 600,00", desc: "Sorteio noturno — valor garantido!", preco: 1.00, vendidos: 1000, total: 1500, img: rifa3 },
  { id: 10, titulo: "PIX DE R$ 500,00", desc: "Noturna premium com ótimas chances!", preco: 1.00, vendidos: 800, total: 1250, img: rifa1 },
  { id: 11, titulo: "PIX DE R$ 400,00", desc: "Sorteio noturno expresso!", preco: 1.00, vendidos: 600, total: 1000, img: rifa2 },
  { id: 12, titulo: "PIX DE R$ 200,00", desc: "Noturna acessível — participe agora!", preco: 1.00, vendidos: 300, total: 500, img: rifa3 },
];

// Mantém RAFFLES como alias das expressas para compatibilidade
export const RAFFLES = EXPRESS_RAFFLES;

export const RANKING = [
  { nome: "Marcos S.", cotas: 1450, avatar: "MS" },
  { nome: "Ana Paula", cotas: 980, avatar: "AP" },
  { nome: "Ricardo Oliveira", cotas: 720, avatar: "RO" },
  { nome: "Carla Menezes", cotas: 450, avatar: "CM" },
];

export const WINNERS = [
  { nome: "Felipe T.", premio: "R$ 50.000,00", data: "12/02", rifa: "Super Pix 50k" },
  { nome: "Juliana K.", premio: "R$ 10.000,00", data: "05/02", rifa: "Pix Relâmpago" },
  { nome: "André L.", premio: "R$ 5.000,00", data: "01/02", rifa: "Giro da Sorte" },
  { nome: "Patrícia M.", premio: "R$ 25.000,00", data: "28/01", rifa: "Mega Dinheiro" },
];

export function handleBuy(raffle: typeof RAFFLES[0], count: number) {
  const totalVal = (raffle.preco * count).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const text = `💰 *PEDIDO DE COTAS - GOLDENRIFA*\n\n💎 *Prêmio:* ${raffle.titulo}\n🎫 *Quantidade:* ${count} cotas\n💵 *Total:* ${totalVal}\n\nQuero o link para pagamento via PIX!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}
