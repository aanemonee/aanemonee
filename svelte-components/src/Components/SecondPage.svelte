<script>
</script>


<div class="box">
    <input class="svelte-input-name secondary-font"
           type="text"
           placeholder="Enter your name and press save"
           maxlength="10"/>
    <div class="inner-box">
      <button on:click|preventDefault data-role="setName">Save</button>
      <button on:click|preventDefault data-role="link" data-step="intro-page" >Watch result</button>
      <button on:click|preventDefault data-role="forgotName">Forgot your name</button>
  </div>
  <button on:click|preventDefault data-role="pages" data-way="homePage">Go back</button>
</div>
<style>
.box {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
}
.inner-box {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 15px;
}
.svelte-input-name {
  outline: none;
  border: none;
  border-radius: 15px;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 15px;
}
.svelte-input-name::placeholder {
  text-align: center;
  font:inherit;
}
button {
  font-size: 23px;
  display: inline-block;
  color: white;
  outline: none;
  background-color: #566573;
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
@media  only screen and (min-width: 479px) and (max-width: 699px) {
  button {
        font-size: 15px !important;
        padding: 0 5px;
        margin-bottom: 10px;
      }
  }
@media  only screen and (min-width: 300px) and (max-width: 479px) { 
  button {
        font-size: 15px !important;
        padding: 0 5px;
        margin-bottom: 10px;
        background-color: #acbcb2;
        color: white;
  }   
  button:hover {
        color: #566573;
        background-color: #acbcb2;
        border: 3px solid #566573;
  }
  .inner-box {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>