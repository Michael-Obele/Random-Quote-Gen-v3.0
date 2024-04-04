<script lang="ts">
  import { page } from '$app/stores';
</script>

<h1 class="my-10 text-center text-2xl text-red-400">
  {$page.status}: {$page.error?.message}
</h1>
<p class="my-10 text-center text-2xl text-red-400">Sorry, No Author Found!</p>
