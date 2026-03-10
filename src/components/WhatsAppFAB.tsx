import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/data";

const WhatsAppFAB = () => (
  <button
    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`)}
    className="fixed bottom-10 right-10 w-20 h-20 bg-success rounded-full flex items-center justify-center text-success-foreground shadow-[0_0_30px_hsl(var(--success)/0.4)] hover:scale-110 active:scale-95 transition-all z-50"
  >
    <MessageCircle className="w-10 h-10" />
  </button>
);

export default WhatsAppFAB;
