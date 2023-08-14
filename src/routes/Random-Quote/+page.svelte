<script>
	let url = 'https://api.quotable.io/random';

	let promise = getRandomQuote();

	async function getRandomQuote() {
		const res = await fetch(url);
		const text = await res.json();
		return text;
	}

	function handleClick() {
		promise = getRandomQuote();
	}
</script>

<!-- Html Part -->
<button on:click={handleClick}> generate random quote </button>

{#await promise}
	<p>...waiting</p>
{:then text}
	<p>{text.author}</p>
	<p>{text.content}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
