import { headers } from "next/headers";
import type { Product } from "@/lib/products";
export async function fetchProducts(): Promise<Product[]> {
  const h=await headers(); const host=h.get("host") || "localhost:3000"; const proto=h.get("x-forwarded-proto") || (host.includes("localhost")?"http":"https");
  const base=(process.env.BASE_URL || `${proto}://${host}/api`).replace(/\/$/, "");
  const response=await fetch(`${base}/products`,{cache:"no-store"});
  if (!response.ok) throw new Error("No se pudo consultar el catálogo");
  const payload: {data:Product[]}=await response.json(); return payload.data;
}
