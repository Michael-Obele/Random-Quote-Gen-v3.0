<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
  console.log(data);

  $: ({ articles } = data);
</script>

<div class="container mx-auto px-4 py-8">
  <h2 class="mb-4 text-2xl font-bold">Articles:</h2>
  {#each articles as article}
    <article class="mb-8 rounded-md bg-slate-400 p-4 shadow-md">
      <header class="mb-2 text-xl font-semibold">{article.title}</header>
      <p class="text-gray-700">
        {article.content}
      </p>
      <form action="?/deleteArticle&id={article.id}" method="POST" class="mt-4">
        <button
          type="submit"
          class="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >Delete Article</button
        >
      </form>
      <a
        href="/{article.id}"
        role="button"
        class="mt-4 block w-full rounded bg-blue-500 px-4 py-2 text-center font-bold text-white hover:bg-blue-700"
        >Edit Article</a
      >
    </article>
  {/each}
</div>

<div class="flex min-h-screen flex-col items-center justify-center">
  <form
    action="?/createArticle"
    method="POST"
    class="mb-4 rounded bg-gray-500 px-8 pb-8 pt-6 shadow-md"
  >
    <h3 class="mb-4 text-center text-2xl font-bold">New Article</h3>
    <div class="mb-4">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="title">
        Title
      </label>
      <input
        class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        type="text"
        id="title"
        name="title"
      />
    </div>
    <div class="mb-6">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="content">
        Content
      </label>
      <textarea
        class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id="content"
        name="content"
        rows="5"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Add Article
      </button>
    </div>
  </form>
</div>
