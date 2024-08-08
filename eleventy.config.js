const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

const md = require("markdown-it")();
const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("pageDate", (date) =>
    DateTime.fromJSDate(date)
      .setLocale("en-gb")
      .toLocaleString({ month: "long", day: "2-digit", year: "numeric" }),
  );

  eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed.xml",
		collection: {
			name: "post", // iterate over `collections.post`
			limit: 10,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "compti.me",
			subtitle: "A blog from a consultant in the UK about software development, technology, and other random things like my veggie garden",
			base: "https://compti.me/",
			author: {
				name: "Matthew Murray"
			}
		}
	});

  eleventyConfig.setLibrary("md", md);
};

md.renderer.rules.image = function(tokens, idx, options, env, self) {
  const token = tokens[idx];
  let imgSrc = token.attrGet("src");
  const imgAlt = token.content;

  // you can modify the default sizes, or omit
  const imgSize = token.attrGet("title") || "(max-width: 750px)";

  const widths = [250, 426, 580, 768]; // choose your own widths, or [null] to disable resize
  const imgOpts = {
    widths,
    formats: ["webp", "jpeg"], // choose your own formats (see docs)
    urlPath: "/assets/img/", // src path in HTML output
    outputDir: "./_site/assets/img/", // where the generated images will go
  };

  // generate the images
  // see https://www.11ty.dev/docs/plugins/image/#synchronous-usage
  Image(imgSrc, imgOpts);

  const metadata = Image.statsSync(imgSrc, imgOpts);

  return Image.generateHTML(metadata, {
    alt: imgAlt,
    sizes: imgSize,
    loading: "lazy",
    decoding: "async",
  });
};
