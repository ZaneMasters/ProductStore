<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  let pedidosDetalles = [];

  onMount(async () => {
    const { data, error } = await supabase.rpc('get_orders_details');
    if (error) {
      console.error(error);
    } else {
      const pedidosMap = new Map();
      data.forEach(detalle => {
        if (!pedidosMap.has(detalle.pedido_id)) {
          pedidosMap.set(detalle.pedido_id, []);
        }
        pedidosMap.get(detalle.pedido_id).push(detalle);
      });
      pedidosDetalles = Array.from(pedidosMap.values());
    }
  });
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="max-w-6xl w-full bg-base-100 p-6 rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4">Detalles de Pedidos</h1>
    {#each pedidosDetalles as pedidoDetalles}
      <div class="mb-8">
        <h2 class="text-lg font-bold mb-2">Pedido ID: {pedidoDetalles[0].pedido_id}</h2>
        <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each pedidoDetalles as detalle}
                <tr class="hover:bg-gray-100">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{detalle.cliente_nombre}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{detalle.producto_nombre}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{detalle.cantidad}</div>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/each}
  </div>
</main>



