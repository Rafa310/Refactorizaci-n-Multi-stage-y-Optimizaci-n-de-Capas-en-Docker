import { headers } from "next/headers";
export async function postDemoApi<T>(path:string,data:unknown):Promise<{ok:boolean;status:number;body:T}>{
 const incoming=await headers();const host=incoming.get("host")||"localhost:3000";const protocol=incoming.get("x-forwarded-proto")||(host.includes("localhost")?"http":"https");
 const base=(process.env.BASE_URL || `${protocol}://${host}/api`).replace(/\/$/, "");
 const res=await fetch(`${base}${path.replace(/^\/api/, "")}`,{method:"POST",headers:{"content-type":"application/json",cookie:incoming.get("cookie")||""},body:JSON.stringify(data),cache:"no-store"});
 return {ok:res.ok,status:res.status,body:await res.json() as T};
}
