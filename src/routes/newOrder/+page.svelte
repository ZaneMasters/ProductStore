<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    
    let clientes = [];
    let productos = [];
    let cliente_id = '';
    let productosSeleccionados = [];
    
    onMount(async () => {
      let { data: clientesData } = await supabase.from('cliente').select('*');
      let { data: productosData } = await supabase.from('producto').select('*');
      if (clientesData) clientes = clientesData;
      if (productosData) productos = productosData;
    });
  
    const crearPedido = async () => {
      const { data: pedido, error } = await supabase.from('pedido').insert([
        { cliente_id: parseInt(cliente_id) }
      ]).select();
      
      if (error) {
        console.error(error);
        return;
      }
    
      for (let producto of productosSeleccionados) {
        if (producto.cantidad > 0) {
          await supabase.from('pedido_producto').insert([
            { pedido_id: pedido[0].id, producto_id: producto.id, cantidad: producto.cantidad }
          ]);
        }
      }
    
      alert('Pedido creado exitosamente');
    };

    function updateProductoSeleccionado(producto, index) {
      if (producto.cantidad > 0) {
        const productoIndex = productosSeleccionados.findIndex(p => p.id === producto.id);
        if (productoIndex === -1) {
          productosSeleccionados.push({...producto, cantidad: producto.cantidad});
        } else {
          productosSeleccionados[productoIndex].cantidad = producto.cantidad;
        }
      } else {
        productosSeleccionados = productosSeleccionados.filter(p => p.id !== producto.id);
      }
    }
  </script>
    
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <form class="max-w-lg w-full bg-base-100 p-6 rounded-lg shadow-md" on:submit|preventDefault={crearPedido}>
          <div class="mb-4">
            <label for="cliente" class="block text-sm font-medium mb-2">Cliente:</label>
            <select id="cliente" bind:value={cliente_id} required class="select select-bordered w-full">
              <option value="" disabled>Seleccione un cliente</option>
              {#each clientes as cliente}
                <option value={cliente.id}>{cliente.nombre}</option>
              {/each}
            </select>
          </div>
      
          <div class="mb-4">
            <label class="block text-sm font-medium mb-2">Productos:</label>
            {#each productos as producto, index}
              <div class="flex items-center mb-2">
                <span class="flex-1">{producto.nombre}</span>
                <input type="number" min="0" bind:value={producto.cantidad} on:change={() => updateProductoSeleccionado(producto, index)} class="input input-bordered w-24 ml-2" />
              </div>
            {/each}
          </div>
      
          <button type="submit" class="btn btn-neutral w-full">Crear Pedido</button>
        </form>
      </div>
  
  
  