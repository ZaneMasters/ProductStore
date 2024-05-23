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
    <div class="max-w-4xl w-full bg-base-100 p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Clientes y Número de Pedidos</h1>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Pedidos</th>
          </tr>
        </thead>
        <tbody>
          {#each clientesPedidos as clientePedido}
            <tr class="hover">
              <td>{clientePedido.nombre}</td>
              <td>{clientePedido.total_pedidos}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
  
  
  