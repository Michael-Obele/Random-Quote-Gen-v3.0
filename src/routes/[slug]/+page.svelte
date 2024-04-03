<script lang="ts">
  import Group from './Group.svelte';

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
  console.log(data);
</script>

<h1
  class="my-2 w-full rounded-lg border bg-slate-800 py-5 text-center text-3xl text-white"
>
  Welcome to the Search Page for <q
    style="color:{$dynamicColor}"
    class="font-bold"
  >
    {data.slug}
  </q>
</h1>
<main>
  {#if group.length > 0}
    <Group {group} />
  {:else if author.length > 0}
    <Author {author} />
  {:else}
    <p class="my-2 text-center text-2xl text-white">No Page like this exists</p>
  {/if}
</main>
