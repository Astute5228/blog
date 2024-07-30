const html = String.raw;

exports.data = {
  layout: "base",
};

exports.render = ({title, content, draft}) => {
  return html`<article>
      <h1>${title}</h1>

    ${content}
  </article>`;
};
