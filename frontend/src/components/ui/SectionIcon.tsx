import { ArrowLeft, ArrowRight, Flame, Gamepad2, LogIn, LogOut, Mail, MapPin, Phone, Utensils, Waves } from "lucide-react";

const icons = { arrow_back: ArrowLeft, arrow_forward: ArrowRight, local_fire_department: Flame, sports_esports: Gamepad2, login: LogIn, logout: LogOut, email: Mail, location_on: MapPin, call: Phone, restaurant: Utensils, pool: Waves };

export function SectionIcon({ name, className = "" }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] || MapPin;
  return <Icon className={className} aria-hidden="true" />;
}
