import {getOrders,getSession} from "@/lib/session";
import {redirect,notFound} from "next/navigation";
import Link from "next/link";
import {ClearCart} from "@/components/clear-cart";
export default async function Confirmation({searchParams}:{searchParams:Promise<{id?:string}>}){if(!(await getSession()))redirect("/login");const {id}=await searchParams;const order=(await getOrders()).find(o=>o.id===id);if(!order)notFound();return <div className="card max-w-xl mx-auto text-center"><ClearCart/><div className="text-6xl mb-3">✅</div><h1 className="text-3xl font-black">Compra simulada confirmada</h1><p className="mt-3">Orden {order.id}</p><p className="text-slate-600 mb-6">Ningún pago real se procesó.</p><Link href="/historial" className="btn">Ver historial</Link></div>}
