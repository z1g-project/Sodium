export default function search(input: string, searchEngine: string): string {
  const eng = localStorage.getItem('searchEngine') || searchEngine;
  let url: URL;
  try {
    url = new URL(input);
  } catch (err) {
      try {
        url = new URL(`http://${input}`);
      } catch (err) {
        console.error('Invalid URL input');
        return '';
      }
  }
  return url.toString();
}