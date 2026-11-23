import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export type DemoSession = { email: string; name: string; exp: number };
export type DemoOrder = { id: string; date: string; items: { id: string; qty: number }[]; total: number; status: "Pagado (simulación)" };
function secret() { const value = process.env.DEMO_SESSION_SECRET; if (!value || value.length < 32 || value.startsWith("REEMPLAZAR")) throw new Error("Configura DEMO_SESSION_SECRET en .env.local (mínimo 32 caracteres)"); return value; }
function sign(data: string) { return createHmac("sha256", secret()).update(data).digest("base64url"); }
export function seal(value: unknown) { const data = Buffer.from(JSON.stringify(value)).toString("base64url"); return `${data}.${sign(data)}`; }
export function unseal<T>(token?: string): T | null { if (!token) return null; try { const [data,mac] = token.split("."); if (!data || !mac) return null; const expected = Buffer.from(sign(data)); const received = Buffer.from(mac); if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null; return JSON.parse(Buffer.from(data,"base64url").toString()) as T; } catch { return null; } }
const cookieOpts = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 };
export async function setSession(email: string, name: string) { (await cookies()).set("demo_session", seal({ email, name, exp: Date.now() + 8 * 3600_000 }), cookieOpts); }
export async function getSession(): Promise<DemoSession|null> { const parsed = unseal<DemoSession>((await cookies()).get("demo_session")?.value); return parsed && parsed.exp > Date.now() ? parsed : null; }
export async function clearSession() { (await cookies()).delete("demo_session"); (await cookies()).delete("demo_orders"); }
export async function getOrders(): Promise<DemoOrder[]> { const session=await getSession(); if (!session) return []; const data=unseal<{ email: string; orders: DemoOrder[] }>((await cookies()).get("demo_orders")?.value); return data?.email === session.email && Array.isArray(data.orders) ? data.orders : []; }
export async function saveOrder(order: DemoOrder) { const session=await getSession(); if (!session) throw new Error("Sesión requerida"); const existing=await getOrders(); (await cookies()).set("demo_orders",seal({email: session.email,orders: [order,...existing].slice(0,5)}),cookieOpts); }
