<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
  
    let clientesPedidos = [];
  
    onMount(async () => {
      const { data, error } = await supabase.rpc('get_customers_orders');
      if (error) {
        console.error(error);
      } else {
        clientesPedidos = data;
      }
    });
  </script>
  
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-4xl w-full bg-base-100 p-6 rounded-lg shadow-md overflow-x-auto">
      <h1 class="text-2xl font-bold mb-4">Clientes y Número de Pedidos</h1>
      <div class="overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pedidos
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each clientesPedidos as clientePedido}
              <tr class="hover:bg-gray-100">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{clientePedido.nombre}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{clientePedido.total_pedidos}</div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </main>
  
  
  
  