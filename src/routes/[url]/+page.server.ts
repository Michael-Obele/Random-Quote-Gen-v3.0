import { error } from '@sveltejs/kit';

export async function load({ params }) {
  let url = params.url;
  let Url = `https://api.quotable.io/search/authors?query=${url}`;
  const res = await fetch(Url);
  const result = await res.json();
  if (result.count === 0) {
    throw error(404, {
      message: 'No Author found',
    });
  }

  return { url, result };
}
