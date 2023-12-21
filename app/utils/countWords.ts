export function countWords(str: string) {
  return str
    .replace(/(##+|```js|>)+/gi, "")
    .trim()
    .split(/\s+/).length;
}
