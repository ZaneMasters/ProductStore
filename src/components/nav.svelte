<script>
  let menuOpen = false;
</script>

<div class="navbar bg-base-300 p-4 flex justify-between items-center">
  <a class="btn btn-ghost normal-case text-xl">Products Store</a>
  <button class="md:hidden btn btn-ghost" on:click={() => menuOpen = !menuOpen}>
    ☰
  </button>
  <ul class={`menu menu-horizontal p-0 ${menuOpen ? 'block' : 'hidden'} md:flex`}>
    <li><a href="/addProduct">Crear Producto</a></li>
    <li><a href="/products">Lista de Productos</a></li>
    <li><a href="/newOrder">Pedidos</a></li>
    <li>
      <details class="relative">
        <summary class="cursor-pointer">Otras Consultas</summary>
        <ul class="absolute left-0 top-full mt-1 p-2 bg-base-100 shadow-lg rounded-md">
          <li><a href="/clientsOrders">Lista de pedidos Clientes</a></li>
          <li><a href="/clientsOrders/details">Pedidos</a></li>
        </ul>
      </details>
    </li>
  </ul>
</div>





