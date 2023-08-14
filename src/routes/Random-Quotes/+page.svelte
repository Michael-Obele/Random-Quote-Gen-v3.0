<script>
	let number = 3;
	$: number;

	let promise = getRandomQuote(number);

	async function getRandomQuote(num) {
		let url = 'https://api.quotable.io/quotes/random?limit=' + num;
		const res = await fetch(url);
		const text = await res.json();
		console.log(url);
		return text;
	}

	function handleClick() {
		promise = getRandomQuote(number);
	}
</script>

<!-- Html Part -->
<button class="bg-slate-600 rounded-md text-white" on:click={handleClick}>
	generate random quote
</button>
<input
	class=" bg-slate-400 text-white"
	type="number"
	name="quoteLimit"
	min="1"
	max="20"
	bind:value={number}
/>

{#await promise}
	<p>...waiting</p>
{:then texts}
	{#each texts as text}
		<p>Author: {text.author}</p>
		<p>Quote: {text.content}</p>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
