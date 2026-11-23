import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
export const metadata={title:"Tienda Demo | Next.js",description:"Proyecto académico de e-commerce con API y checkout simulados"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body><CartProvider><Header/><main className="mx-auto max-w-6xl px-5 py-10 min-h-[80vh]">{children}</main><footer className="border-t border-slate-200 text-center text-sm text-slate-600 py-5">Proyecto académico · Pagos simulados · No ingreses datos reales de tarjetas</footer></CartProvider></body></html>}
