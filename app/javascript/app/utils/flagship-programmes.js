export const parseMarkdownField = (d, field) => {
  const parsedField = d[field] && parseMarkdown(d[field]);
  return parsedField && parsedField.splice(1, parsedField.length);
};

export const parseMarkdown = text =>
  text.split('*').map(s => s.replace(/"/g, '').trim());

export const parseMarkdownToHtml = text => {
  const parsedText = parseMarkdown(text);
  return parsedText
    .splice(1, parsedText.length)
    .map(t => `<li>${t}</li>`)
    .join('');
};
