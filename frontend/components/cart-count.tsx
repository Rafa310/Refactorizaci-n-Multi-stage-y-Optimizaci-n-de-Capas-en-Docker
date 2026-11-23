"use client";import {useCart} from "@/components/cart-provider";export function CartCount(){const {totalCount}=useCart();return <span>({totalCount})</span>;}
