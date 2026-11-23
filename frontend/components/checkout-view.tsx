"use client";
import {useCart} from "@/components/cart-provider";
import {checkoutAction} from "@/lib/actions";
import {products,money} from "@/lib/products";
import Link from "next/link";
import {useFormStatus} from "react-dom";
function Submit(){const {pending}=useFormStatus();return <button className="btn w-full" disabled={pending}>{pending?"Procesando...":"Confirmar pago simulado"}</button>}
export function CheckoutView(){const {items}=useCart();const total=items.reduce((s,i)=>s+(products.find(p=>p.id===i.id)?.price||0)*i.qty,0);if(!items.length)return <div className="card">Carrito vacío. <Link href="/catalogo" className="underline">Volver al catálogo</Link></div>;return <section className="max-w-lg mx-auto card"><h1 className="text-3xl font-black mb-3">Checkout</h1><p className="text-slate-600 mb-4">Demostración académica: no se procesan cobros reales ni datos de tarjetas.</p><div className="border-t border-b py-4 mb-5 space-y-2">{items.map(i=>{const p=products.find(p=>p.id===i.id);return p?<p key={i.id} className="flex justify-between"><span>{p.name} × {i.qty}</span><b>{money(p.price*i.qty)}</b></p>:null})}</div><p className="font-black text-xl mb-6">Total: {money(total)}</p><form action={checkoutAction}><input type="hidden" name="items" value={JSON.stringify(items)}/><Submit/></form></section>}
