import { MessageCircle } from "lucide-react";

interface WhatsAppFloatProps {
  phone: string; // in international format without +, e.g., 2567XXXXXXXX
  message?: string;
}

const WhatsAppFloat = ({ phone, message = "Hello! I'd like to talk to ModanTech." }: WhatsAppFloatProps) => {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppFloat;
