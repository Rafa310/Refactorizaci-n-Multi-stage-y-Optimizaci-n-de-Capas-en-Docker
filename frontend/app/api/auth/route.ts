import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
export async function GET() { const session=await getSession(); return NextResponse.json({ authenticated:Boolean(session), user:session ? {email:session.email,name:session.name}:null }); }
