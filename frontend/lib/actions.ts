"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { clearSession, getSession, saveOrder, setSession } from "@/lib/session";
import type { DemoOrder } from "@/lib/session";
import { postDemoApi } from "@/lib/server-api";

export async function loginAction(data:FormData){
 const email=String(data.get("email")||"").trim().toLowerCase();const password=String(data.get("password")||"");
 const response=await postDemoApi<{user?:{email:string;name:string}}>("/api/auth/login",{email,password});
 if(!response.ok||!response.body.user)redirect("/login?error=credenciales");
 await setSession(response.body.user.email,response.body.user.name);revalidatePath("/historial");redirect("/catalogo");
}
export async function registerAction(data:FormData){
 const name=String(data.get("name")||"").trim();const email=String(data.get("email")||"").trim().toLowerCase();const password=String(data.get("password")||"");
 const response=await postDemoApi<{user?:{email:string;name:string}}>("/api/auth/register",{name,email,password});
 if(!response.ok||!response.body.user)redirect("/registro?error=datos");
 await setSession(response.body.user.email,response.body.user.name);revalidatePath("/historial");redirect("/catalogo");
}
export async function logoutAction(){await clearSession();revalidatePath("/historial");redirect("/");}
export async function checkoutAction(data:FormData){
 if(!(await getSession()))redirect("/login?error=sesion");
 let items:unknown;
 try{items=JSON.parse(String(data.get("items")||"[]"));}catch{redirect("/checkout?error=carrito");}
 const created=await postDemoApi<{order?:DemoOrder}>("/api/orders",{items});
 if(!created.ok||!created.body.order)redirect("/checkout?error=carrito");
 const paid=await postDemoApi<{order?:DemoOrder}>("/api/checkout",{order:created.body.order});
 if(!paid.ok||!paid.body.order)redirect("/checkout?error=pago");
 await saveOrder(paid.body.order);revalidatePath("/historial");redirect(`/checkout/confirmacion?id=${encodeURIComponent(paid.body.order.id)}`);
}
