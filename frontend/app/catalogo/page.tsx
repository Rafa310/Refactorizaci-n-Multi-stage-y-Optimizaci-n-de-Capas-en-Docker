import { Suspense } from "react";
import { fetchProducts } from "@/lib/api";
import { ProductCard } from "@/components/product-card";
async function ProductGrid(){const products=await fetchProducts();return <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{products.map(p=><ProductCard key={p.id} product={p}/>)}</div>}
export default function Catalog(){return <section><h1 className="text-3xl font-black mb-2">Catálogo de productos</h1><p className="text-slate-600 mb-8">Datos de una API REST interna simulada.</p><Suspense fallback={<p className="card">Cargando productos...</p>}><ProductGrid/></Suspense></section>}
