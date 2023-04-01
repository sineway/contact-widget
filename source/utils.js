/**
 * @param {string} target
 * @return {string}
 */
const escapeHtml = (target) => {
  return target.replace(/[<>&"']/g, (char) => {
    const code = char.charCodeAt(0);

    return `#&${code};`;
  });
};

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @return {string}
 */
const html = (strings, ...values) => {
  return strings.reduce((before, after, index) => {
    const value = values[index - 1];

    return before + escapeHtml(String(value)) + after;
  });
};

export {
  escapeHtml,
  html,
};
