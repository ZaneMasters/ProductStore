<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';
  import Swal from 'sweetalert2';
  import 'sweetalert2/dist/sweetalert2.min.css';

  let nombre = '';
  let descripcion = '';
  let precio = 0;
  let categoria_id;
  let categorias = [];

  onMount(async () => {
    const { data } = await supabase.from('categoria').select('*');
    categorias = data;
  });

  async function addProduct() {
    const { data, error } = await supabase.from('producto').insert([
      { nombre, descripcion, precio, categoria_id }
    ]);

    if (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al agregar el producto: ' + error.message
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Producto agregado con éxito'
      });
    }
  }
</script>

<main class="flex justify-center items-center min-h-screen bg-base-200">
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h1 class="card-title">Agregar Producto</h1>
      <form on:submit|preventDefault={addProduct}>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Nombre:</span>
          </label>
          <input bind:value={nombre} type="text" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Descripción:</span>
          </label>
          <input bind:value={descripcion} type="text" class="input input-bordered" />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Precio:</span>
          </label>
          <input bind:value={precio} type="number" class="input input-bordered" required />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Categoría:</span>
          </label>
          <select bind:value={categoria_id} class="select select-bordered" required>
            <option value="">Selecciona una categoría</option>
            {#each categorias as categoria}
              <option value={categoria.id}>{categoria.nombre}</option>
            {/each}
          </select>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-neutral" type="submit">Agregar</button>
        </div>
      </form>
    </div>
  </div>
</main>

  