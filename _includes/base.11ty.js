const html = String.raw;

exports.render = function(data) {
  return html`<!doctype html>
    <html lang="en">
      <head>
        <title>${data.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1/new.min.css"
        />
        <link rel="stylesheet" href="https://fonts.xz.style/serve/inter.css" />
        <link
          href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <nav style="display:flex;justify-content:space-between;align-items:center;">
            <a href="/"><h3>compti.me</h3></a>
            <span>
              <a href="https://github.com/mattmurr">GitHub</a>
              <a href="https://x.com/mattmurr001">X</a>
              <a href="/feed.xml">RSS</a>
            </span>
          </nav>
        </header>

        <main>${data.content}</main>
        <footer style="text-align:right;"><small>Last build: ${new Date().toUTCString()}</small></footer>
      </body>
    </html>`;
};
