<script>
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
  const goToPage = (event) => {
    dispatch('pageSwitcher', {
      page: event.target.href,
    });
  };

  
</script>

<header>
  <h2 class="">This is simple svelte app which can save your name to local storage</h2>
</header>

<style>
  h2 {
    padding-bottom: 15px;
    line-height: 1.4;
  }
  a:link, a:visited {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: rgb(171,167,180);
  }
  ul {
    display: flex;
    flex-flow: row-reverse nowrap;
    justify-content: space-between;
  }
  @media  only screen and (min-width: 479px) and (max-width: 699px) {
      h2 {
        font-size: 15px;
      }
    }
  @media  only screen and (min-width: 300px) and (max-width: 479px) { 
    h2 {
        font-size: 15px;
      }
  }
</style>