export const dynamic = "force-dynamic";
type Product = { id: number; name: string; price: number; stock: number };
export default async function InfrastructurePage() {
  const url = `${process.env.INTERNAL_API_URL || "http://nginx"}/api/products`;
  let products: Product[] = [];
  let error: string | null = null;
  try {
    const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(7000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: unknown = await response.json();
    if (!Array.isArray(data)) throw new Error("Formato incorrecto");
    products = data as Product[];
  } catch {
    error = "No se pudo consultar la API Laravel. Comprueba el estado de Nginx, PHP y MySQL con docker compose ps.";
  }
  return <section className="space-y-6 py-8">
    <div><p className="text-sm font-bold text-teal-700">Demostración Docker</p><h1 className="text-3xl font-black">API Laravel + MySQL</h1><p className="mt-2 text-slate-600">Estos productos se consultan en el servidor de Next.js a través de Nginx, PHP-FPM y MySQL.</p></div>
    {error ? <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-5 text-red-700">{error}</div> :
    <div className="grid gap-4 md:grid-cols-3">{products.map((product) => <article key={product.id} className="rounded-2xl border bg-white p-5"><h2 className="font-bold">{product.name}</h2><p className="mt-2 text-xl font-black">${Number(product.price).toFixed(2)}</p><p className="text-sm text-slate-600">Stock: {product.stock}</p></article>)}</div>}
    <p className="text-sm text-slate-600">El catálogo comercial y su checkout son una demostración local heredada de la tarea previa; esta sección comprueba la comunicación real entre contenedores.</p>
  </section>;
}
