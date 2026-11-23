import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import type { DemoOrder } from "@/lib/session";
export async function GET(){return NextResponse.json({provider:"Stripe",mode:"simulado",realPayments:false,message:"No se procesan tarjetas ni cobros reales."})}
export async function POST(req:Request){if(!(await getSession()))return NextResponse.json({error:"No autenticado"},{status:401});const data=await req.json().catch(()=>({}));const order=data.order as Partial<DemoOrder>|undefined;
if(!order || typeof order.id!=="string" || !order.id.startsWith("DEMO-") || typeof order.total!=="number" || !Array.isArray(order.items))return NextResponse.json({error:"Orden no válida"},{status:400});return NextResponse.json({order:{...order,status:"Pagado (simulación)"},provider:"simulado",realPayment:false});}
