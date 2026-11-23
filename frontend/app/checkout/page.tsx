import {getSession} from "@/lib/session";import {redirect} from "next/navigation";import {CheckoutView} from "@/components/checkout-view";
export default async function Checkout(){if(!(await getSession()))redirect("/login?error=sesion");return <CheckoutView/>}
