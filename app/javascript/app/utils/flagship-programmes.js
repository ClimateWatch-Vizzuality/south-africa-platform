export const parseMarkdown = (d, field) => {
  const parsedField = d[field] &&
    d[field].split('*').map(s => s.replace(/"/g, '').trim());
  return parsedField && parsedField.splice(1, parsedField.length);
};
