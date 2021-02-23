<script>
	import Home from './Components/Home.svelte';
	import SecondPage from './Components/SecondPage.svelte';
	import Header from './Components/Header.svelte';
	let currentPage = 'homePage';
	const pageHandler = (event) => {
		currentPage = event.detail.page.split('/').reverse().slice(0,1).join('');
		console.log(currentPage);
	}
	const pageSwitcher = (event) => {
		const ROLE = event.target.dataset.role;
		if(!ROLE) return false;
		switch (ROLE) {
			case 'pages': {
				currentPage = event.target.dataset.way;
			}
		}
	}
</script>

<div class="main-container">
	<Header on:click={pageHandler}/>
	{#if currentPage === 'homePage'}
			<Home on:click={pageSwitcher}/>
	{/if}
	{#if currentPage === 'tryPage'}
		<SecondPage on:click={pageSwitcher} />
	{/if}

</div>



<style>
	.main-container {
		padding: 15px;
		text-align: center;
		width: 100%;
		height: 100%;
		background-color: #566573;
		overflow: hidden;
		}
	@media  only screen and (min-width: 300px) and (max-width: 479px) { 
		.main-container {
			background-color: #acbcb2;
			border-radius: 10px;
		}
	}
</style>