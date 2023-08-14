<script>
	let url = 'https://api.quotable.io/quotes?page=1&limit=100';

	let promise = getQuotes();

	async function getQuotes() {
		const res = await fetch(url);
		const text = await res.json();
		console.log(text.results);
		return text.results;
	}
</script>

<!-- Html Part -->

{#await promise}
	<p>...waiting</p>
{:then texts}
	{#each texts as text}
		<div class="quote">
			<p class="content">
				"{text.content}"
			</p>
			<p class="author">- {text.author}</p>
		</div>
	{/each}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	/* Quote styles */

	.quote {
		margin: 0 0 20px 0;
		padding: 10px;
		border: 1px solid #ccc;
		background-color: #f9f9f9;
	}

	.quote .content {
		font-size: 18px;
		line-height: 1.5;
	}

	.quote .author {
		font-size: 14px;
		color: #999;
	}
</style>
