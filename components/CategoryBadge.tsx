import { Category } from "@/lib/types";

const STYLES: Record<Category, string> = {
  Headline: "bg-headline-bg text-headline border-headline/25",
  Product: "bg-product-bg text-product border-product/25",
  Company: "bg-company-bg text-company border-company/25",
  Research: "bg-research-bg text-research border-research/25",
  Policy: "bg-policy-bg text-policy border-policy/25",
  Investment: "bg-investment-bg text-investment border-investment/25",
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm border font-mono text-[11px] uppercase tracking-wide ${STYLES[category]}`}
    >
      {category}
    </span>
  );
}
