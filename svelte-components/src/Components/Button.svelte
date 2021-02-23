
<script>
  export let currentPage = '';
</script>

<button on:click|preventDefault data-link="{currentPage}">Click me</button>


<style>
  button {
    width: 50%;
    height: 50px;
  }
</style>