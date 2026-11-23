import Link from "next/link";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/lib/actions";
import { CartCount } from "@/components/cart-count";
export async function Header(){const user=await getSession();return <header className="bg-white border-b border-slate-200"><div className="mx-auto max-w-6xl px-5 py-4 flex flex-wrap items-center justify-between gap-4"><Link href="/" className="font-black text-xl text-teal-800">🛍️ Tienda Demo</Link><nav className="flex flex-wrap gap-4 items-center text-sm font-semibold"><Link href="/catalogo">Catálogo</Link><Link href="/carrito">Carrito <CartCount/></Link>{user?<><Link href="/historial">Mis compras</Link><form action={logoutAction}><button className="text-teal-700 cursor-pointer">Salir</button></form></>:<><Link href="/login">Ingresar</Link><Link href="/registro">Registrarse</Link></>}</nav></div></header>}
