
<header>
  <h2>This is simple svelte app which can save your name to local storage</h2>
</header>

<style>
  h2 {
    font-size: 23px;
    padding-bottom: 15px;
    line-height: 1.4;
  }
  @media  only screen and (min-width: 992px) and (max-width: 1030px) { 
    h2{ 
    font-size: 20px;
    padding-bottom: 10px;
    }
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