<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabase';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';

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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el pedido: ' + error.message
      });
      return;
    }

    for (let producto of productosSeleccionados) {
      if (producto.cantidad > 0) {
        await supabase.from('pedido_producto').insert([
          { pedido_id: pedido[0].id, producto_id: producto.id, cantidad: producto.cantidad }
        ]);
      }
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Pedido generado con éxito'
    });

    cliente_id = '';
    productosSeleccionados = [];
    productos.forEach(producto => producto.cantidad = 0);
  };

  function addProducto(producto) {
  const existingProductIndex = productosSeleccionados.findIndex(p => p.id === producto.id);

  if (existingProductIndex !== -1) {
    productosSeleccionados = productosSeleccionados.map((p, index) => {
      if (index === existingProductIndex) {
        return { ...p, cantidad: p.cantidad + 1 };
      }
      return p;
    });
  } else {
    productosSeleccionados = [...productosSeleccionados, { ...producto, cantidad: 1 }];
  }

}



  function removeProducto(producto) {
  const existingProductIndex = productosSeleccionados.findIndex(p => p.id === producto.id);

  if (existingProductIndex !== -1) {
    productosSeleccionados = productosSeleccionados.map((p, index) => {
      if (index === existingProductIndex) {
        const newCantidad = p.cantidad - 1;
        if (newCantidad > 0) {
          return { ...p, cantidad: newCantidad };
        }
        return null;
      }
      return p;
    }).filter(p => p !== null);
  }

  }
</script>

<div class="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100 p-4 space-y-8 lg:space-y-0 lg:space-x-8">
  <div class="bg-base-100 w-full lg:w-1/2 p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-4">Productos</h2>
    <div>
      {#each productos as producto, index}
        <div class="flex flex-col mb-4">
          <div class="flex items-center">
            <span class="flex-1 font-bold">{producto.nombre}</span>
            <div class="flex items-center">
              <button class="btn btn-neutral ml-2" on:click={() => addProducto(producto)}>Agregar</button>
              <label class="ml-2">{(productosSeleccionados.find(p => p.id === producto.id) || {}).cantidad || 0}</label>
              <button class="btn btn-error ml-2" on:click={() => removeProducto(producto)}>Remover</button>
            </div>
          </div>
          <p class="text-sm text-gray-600">{producto.descripcion}</p>
        </div>
      {/each}
    </div>
  </div>

  <div  class="bg-base-100 w-full lg:w-1/2 p-6 rounded-lg shadow-md">
    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2">Pedido</h2>
      {#each productosSeleccionados as producto}
        
          <div class="flex items-center mb-2">
            <span class="flex-1">{producto.nombre} - {producto.cantidad} unidades</span>
            <p class="text-sm text-gray-600">{producto.descripcion}</p>
          </div>
        
      {/each}
    </div>
    <form on:submit|preventDefault={crearPedido}>
      <div class="mb-4">
        <label for="cliente" class="block text-sm font-medium mb-2">Cliente:</label>
        <select id="cliente" bind:value={cliente_id} required class="select select-bordered w-full">
          <option value="" disabled>Seleccione un cliente</option>
          {#each clientes as cliente}
            <option value={cliente.id}>{cliente.nombre}</option>
          {/each}
        </select>
      </div>

      <button type="submit" class="btn btn-neutral w-full">Crear Pedido</button>
    </form>
  </div>
</div>
