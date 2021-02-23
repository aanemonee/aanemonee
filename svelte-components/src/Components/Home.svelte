<script>

</script>
<div>
  <button class="secondary-font" on:click|preventDefault data-role="pages" data-way="tryPage">Try it!</button>
  <figure><img src="../../../build/images/Svelte.webp" alt="Svelte logo"></figure>
</div>
<style>
  div {
    height: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
  }
  button {
    font-size: 23px;
    display: inline-block;
    color: white;
    outline: none;
    background-color: rgba(44,62,80,0.8);
    padding: 0 10px;
    border: 3px solid white;
    border-radius: 15px;
    cursor: pointer;
    transition: ease-in-out
      color 0.3s,
      background-color 0.3s,
      border 0.3s;
  }
  figure {
    height: 300px;
    width: 300px;
  }
  img {
    width: 100%;
    height: 100%;  
  }
  button:hover {
    color: rgba(44,62,80,0.8);
    background-color: white;
    border: 3px solid rgb(172 188 178);
  }
  
  @media  only screen and (min-width: 1031px) and (max-width: 1199px) { 
    figure {
      width: 170px;
      height: 170px;
    }
  }
  @media  only screen and (min-width: 992px) and (max-width: 1030px) {
    figure {
      width: 100px;
      height: 100px;
    }
  }
  @media  only screen and (min-width: 700px) and (max-width: 991px) {
    figure {
      width: 350px;
      height: 350px;
    }
  }
  @media  only screen and (min-width: 479px) and (max-width: 699px) { 
    figure {
      width: 240px;
      height: 240px;
    }
  }
  @media  only screen and (min-width: 300px) and (max-width: 479px) { 
    button {
      background-color: #acbcb2;
      color: white;
    }
    button:hover {
    color: #566573;
    background-color: #acbcb2;
    border: 3px solid #566573;
    }
    figure {
      width: 120px;
      height: 120px;
    }
	}
</style>
