<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
  
    let categoria_id;
    let categorias = [];
    let productos = [];
  
    onMount(async () => {
      const { data: categoriasData } = await supabase.from('categoria').select('*');
      categorias = categoriasData;
    });
  
    async function loadProducts() {
      const { data: productosData } = await supabase
        .from('producto')
        .select('*')
        .eq('categoria_id', categoria_id);
  
      productos = productosData;
    }
  </script>
  
  <main class="min-h-screen flex justify-center items-center bg-gray-100 p-4 md:p-8">
    <div class="bg-white rounded-lg shadow-lg px-6 py-8 w-full max-w-4xl">
      <h1 class="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Productos</h1>
      <div class="flex justify-center mb-4 md:mb-6">
        <label class="flex flex-col md:flex-row items-center">
          <span class="mb-2 md:mb-0 md:mr-2">Filtrar por categoría:</span>
          <select class="border border-gray-300 rounded-md px-3 py-1" bind:value={categoria_id} on:change={loadProducts}>
            <option value="">Seleccione la categoría</option>
            {#each categorias as categoria}
            <option value={categoria.id}>{categoria.nombre}</option>
            {/each}
          </select>
        </label>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full bg-white rounded-lg overflow-hidden">
          <thead class="bg-gray-200">
            <tr>
              <th class="px-3 md:px-6 py-3 text-left text-sm md:text-base">Nombre</th>
              <th class="px-3 md:px-6 py-3 text-left text-sm md:text-base">Descripción</th>
              <th class="px-3 md:px-6 py-3 text-left text-sm md:text-base">Precio</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {#each productos as producto}
            <tr class="hover:bg-gray-100">
              <td class="px-3 md:px-6 py-4 text-sm md:text-base">{producto.nombre}</td>
              <td class="px-3 md:px-6 py-4 text-sm md:text-base">{producto.descripcion}</td>
              <td class="px-3 md:px-6 py-4 text-sm md:text-base">${producto.precio}</td>
            </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </main>