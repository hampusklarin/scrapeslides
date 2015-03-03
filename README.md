Scrape Slides
=============

Simple Node.js screen scraper that puts several results into a slide interface.

sources.json
------------
Screen scraping sources should be put in the `sources.json` file. An example can be found in the `lunchmenus` branch.

The data should be an array called `sources`, where for each source there is a
* `name` (becomes heading of slide)
* `url` (screen scraping destination)
* one of the following "techniques":
  1. `dom` (DOM selector to scrape HTML, for example "#content")
  2. `pdf` (link straight to a PDF file)
  3. `filter` (JSON for creating a simple HTML &lt;object&gt; by getting an url from "element", where "attribute" contains the supplied "contains" text)
* `css` (optional, gets injected as inline styles to prettify the retrieved HTML)
