import rifa1 from "@/assets/rifa-1.png";
import rifa2 from "@/assets/rifa-2.png";
import rifa3 from "@/assets/rifa-3.png";

export const WHATSAPP_NUMBER = "5511999999999";

export const RAFFLES = [
  { id: 1, titulo: "PIX DE R$ 500,00", desc: "Prêmio principal em dinheiro vivo.", preco: 0.50, vendidos: 4600, total: 5000, img: rifa1 },
  { id: 2, titulo: "PIX DE R$ 200,00", desc: "Sorteio expresso — resultado em 60 min!", preco: 0.50, vendidos: 1500, total: 2000, img: rifa2 },
  { id: 3, titulo: "PIX DE R$ 100,00", desc: "Sua chance rápida de ganhar hoje!", preco: 0.50, vendidos: 800, total: 1000, img: rifa3 },
];

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
