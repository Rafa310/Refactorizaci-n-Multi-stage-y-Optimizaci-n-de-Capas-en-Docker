"use client";
import { useCart } from "@/components/cart-provider";
export function AddToCart({id}:{id:string}) { const {add}=useCart();const [ok,setOk]=React.useState(false);return <button className="btn" onClick={()=>{add(id);setOk(true);setTimeout(()=>setOk(false),1500)}}>{ok?"✓ Agregado":"Agregar al carrito"}</button> }
import * as React from "react";
