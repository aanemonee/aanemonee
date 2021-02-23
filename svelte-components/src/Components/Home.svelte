<script>

</script>


<button class="secondary-font" on:click|preventDefault data-role="pages" data-way="tryPage">Try it!</button>

<style>
  
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
  button:hover {
    color: rgba(44,62,80,0.8);
    background-color: white;
    border: 3px solid rgb(172 188 178);
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
	}
</style>
