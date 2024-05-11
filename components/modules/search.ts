export default function search(input: string) {
    const searchEngine = localStorage.getItem('searchEngine');
    const template = searchEngine || 'https://www.google.com/search?q=%s';
    try {
      return new URL(input).toString();
    } catch (err) {
        console.error('Cant encode')
    }
    try {
      const url = new URL(`http://${input}`);
      if (url.hostname.includes(".")) return url.toString();
    } catch (err) {
    }
    return template.replace("%s", encodeURIComponent(input));
}