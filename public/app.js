async function loadData() {
  return await fetch("/data").then(r => r.json());
}

function getHighlights(menu) {
  let highlights = menu.filter(i => i.highlight);
  if (!highlights.length) {
    highlights = menu.slice(0, 4);
  }
  return highlights;
}
