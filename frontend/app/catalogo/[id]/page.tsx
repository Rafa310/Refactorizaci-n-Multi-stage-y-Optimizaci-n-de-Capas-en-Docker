import { fetchProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import { money } from "@/lib/products";
import { AddToCart } from "@/components/add-to-cart";
export default async function Detail({params}:{params:Promise<{id:string}>}){const {id}=await params;const p=(await fetchProducts()).find(x=>x.id===id);if(!p)notFound();return <div className="grid lg:grid-cols-2 gap-10"><div className="bg-teal-50 rounded-3xl h-80 flex items-center justify-center text-9xl" aria-hidden>{p.emoji}</div><div><p className="text-teal-700 font-semibold">{p.category}</p><h1 className="text-4xl font-black mt-2 mb-4">{p.name}</h1><p className="text-slate-600 text-lg mb-6">{p.description}</p><p className="text-3xl font-black mb-6">{money(p.price)}</p><AddToCart id={p.id}/></div></div>}
