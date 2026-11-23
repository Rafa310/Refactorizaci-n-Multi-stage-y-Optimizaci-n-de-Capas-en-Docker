import { NextResponse } from "next/server";
import { getOrders,getSession } from "@/lib/session";
import { products } from "@/lib/products";
export async function GET() { if (!(await getSession())) return NextResponse.json({error:"No autenticado"},{status:401});return NextResponse.json({data:await getOrders()}); }
export async function POST(req:Request) {
 if(!(await getSession()))return NextResponse.json({error:"No autenticado"},{status:401});
 const input=await req.json().catch(()=>({}));const items=input.items;
 if(!Array.isArray(items)||items.length<1||items.length>20)return NextResponse.json({error:"Carrito inválido"},{status:400});
 const combined=new Map<string,number>();
 for(const i of items){if(!i||typeof i.id!=="string"||!Number.isInteger(i.qty)||i.qty<1||i.qty>10||!products.some(p=>p.id===i.id))return NextResponse.json({error:"Producto inválido"},{status:400});combined.set(i.id,(combined.get(i.id)||0)+i.qty);}
 if([...combined.values()].some(qty=>qty>10))return NextResponse.json({error:"Cantidad inválida"},{status:400});
 const normalized=[...combined].map(([id,qty])=>({id,qty}));
 const total=Math.round(normalized.reduce((sum,i)=>sum+products.find(p=>p.id===i.id)!.price*i.qty,0)*100)/100;
 return NextResponse.json({order:{id:`DEMO-${crypto.randomUUID().slice(0,8).toUpperCase()}`,date:new Date().toISOString(),items:normalized,total,status:"Pendiente"}});
}
