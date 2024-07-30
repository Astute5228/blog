const html = String.raw;

exports.data = {
  layout: "base",
};

const li = (collection) => {
  if (collection.len < 1) return [];
  return collection
    .sort((a, b) => b.page.date - a.page.date)
    .filter(({ data }) => data.draft !== true)
    .map(
      ({ page, data, url }) =>
        html`<li>
          ${this.pageDate(page.date)}
          <a href="${this.url(url)}">${data.title || url}</a>
          <!-- Render description underneath entry if exists -->
          ${data.description ? html`</br><small>${data.description}</small>` : ""}
        </li>`,
    )
    .join("\n");
};

exports.render = function({ content, collections }) {
  return html`${content}
    <section>
      <div style="flex:50%;">
        <h3>Posts</h3>
        <ul>
          ${li(collections.post)}
        </ul>
      </div>
    </section>`;
};
