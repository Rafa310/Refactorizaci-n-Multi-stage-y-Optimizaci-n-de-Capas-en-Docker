export type Product = { id: string; name: string; description: string; price: number; category: string; emoji: string };
export const products: Product[] = [
  { id: "p1", name: "Auriculares Nova", description: "Auriculares inalámbricos cómodos para el día a día.", price: 39.99, category: "Audio", emoji: "🎧" },
  { id: "p2", name: "Teclado Focus", description: "Teclado compacto con teclas silenciosas.", price: 49.50, category: "Oficina", emoji: "⌨️" },
  { id: "p3", name: "Ratón Orbit", description: "Ratón ergonómico inalámbrico.", price: 25.00, category: "Oficina", emoji: "🖱️" },
  { id: "p4", name: "Mochila Urban", description: "Mochila ligera para estudiar y trabajar.", price: 32.00, category: "Accesorios", emoji: "🎒" },
  { id: "p5", name: "Lámpara Aura", description: "Luz de escritorio con intensidad regulable.", price: 28.50, category: "Hogar", emoji: "💡" },
  { id: "p6", name: "Termo Terra", description: "Botella térmica reutilizable de 600 ml.", price: 17.99, category: "Accesorios", emoji: "🥤" }
];
export const money = (amount: number) => new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" }).format(amount);
