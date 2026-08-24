import { Building2, FlaskConical, Gavel, Newspaper, Rocket, TrendingUp } from "lucide-react";
import { Category } from "@/lib/types";

const STYLES: Record<Category, string> = {
  Headline: "bg-headline-bg text-headline border-headline/25",
  Product: "bg-product-bg text-product border-product/25",
  Company: "bg-company-bg text-company border-company/25",
  Research: "bg-research-bg text-research border-research/25",
  Policy: "bg-policy-bg text-policy border-policy/25",
  Investment: "bg-investment-bg text-investment border-investment/25",
};

const ICONS: Record<Category, typeof Newspaper> = {
  Headline: Newspaper,
  Product: Rocket,
  Company: Building2,
  Research: FlaskConical,
  Policy: Gavel,
  Investment: TrendingUp,
};

export default function CategoryBadge({ category }: { category: Category }) {
  const Icon = ICONS[category];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border font-mono text-[11px] uppercase tracking-wide transition-colors duration-200 ${STYLES[category]}`}
    >
      <Icon size={11} strokeWidth={2.25} aria-hidden />
      {category}
    </span>
  );
}
