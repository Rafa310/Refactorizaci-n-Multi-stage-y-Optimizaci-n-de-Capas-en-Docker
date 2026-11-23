import Link from "next/link";
import type { Product } from "@/lib/products";
import { money } from "@/lib/products";
import { AddToCart } from "@/components/add-to-cart";
export function ProductCard({product:p}:{product:Product}){return <article className="card flex flex-col gap-3"><div className="h-36 bg-teal-50 rounded-xl flex items-center justify-center text-6xl" aria-hidden>{p.emoji}</div><p className="text-xs font-bold uppercase tracking-wider text-teal-700">{p.category}</p><Link href={`/catalogo/${p.id}`} className="font-bold text-lg">{p.name}</Link><p className="text-slate-600 text-sm flex-1">{p.description}</p><div className="flex justify-between items-center gap-3 flex-wrap"><strong>{money(p.price)}</strong><AddToCart id={p.id}/></div></article>}
