<script lang="ts">
  import Group from './Group.svelte';
  import { page } from '$app/stores';
  import Author from './Author.svelte';
  import { dynamicColor } from '$lib/store';

  interface Author {
    _id: string;
    name: string;
    link: string;
    bio: string;
    description: string;
    quoteCount: number;
    slug: string;
    dateAdded: string;
    dateModified: string;
  }

  export let data;
  let group: Author[] = [];
  let author: Author[] = [];

  if (data.result.results.length > 1) {
    group = data.result.results;
  } else if (data.result.results.length === 1) {
    author = data.result.results;
  }
</script>

<h1
  class="my-2 w-full rounded-lg border bg-slate-800 py-5 text-center text-3xl text-white"
>
  Welcome to the Search Page for <q
    style="color:{$dynamicColor}"
    class="rounded-md bg-slate-200 p-2 font-bold"
  >
    {data.url}
  </q>
</h1>
<main>
  {#if data.result.count > 1}
    <Group {group} />
  {:else if author.length > 0}
    <Author {author} />
  {/if}
</main>
