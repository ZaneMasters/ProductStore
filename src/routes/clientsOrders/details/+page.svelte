<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
  
    let pedidosDetalles = [];
  
    onMount(async () => {
      const { data, error } = await supabase.rpc('get_orders_details');
      if (error) {
        console.error(error);
      } else {
        pedidosDetalles = data;
      }
    });
  </script>
  
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-6xl w-full bg-base-100 p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Detalles de Pedidos</h1>
      <table class="table w-full">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {#each pedidosDetalles as pedidoDetalle}
            <tr class="hover">
              <td>{pedidoDetalle.pedido_id}</td>
              <td>{pedidoDetalle.cliente_nombre}</td>
              <td>{pedidoDetalle.producto_nombre}</td>
              <td>{pedidoDetalle.cantidad}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
  