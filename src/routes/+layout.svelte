<script>
	import Header from './Header.svelte';
	import './styles.css';
	import Logo from '../images/bert-logo.svg';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>You just got Svelted by!</p>
		<a href="https://twitter.com/bertbengtson" target="_blank" rel="noopener noreferrer"
			><img src={Logo} alt="Bert" width="250px" /></a
		>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100vh;
	}

	footer {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer a {
		font-weight: bold;
	}
</style>
