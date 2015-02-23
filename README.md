Scrape Slides
=============

Simple Node.js screen scraper that puts several results into a slide interface

sources.json
------------
Screen scraping sources should be put in the sources.json file.

They should be an array called "sources", where for each source you have a
* "name" (becomes heading of slide)
* "url" (screen scraping destination)
* pick a technique:
  1."dom" (DOM selector to scrape HTML, for example "#content")
  2."pdf" (link straight to a PDF file)
  3."filter", which is a JSON object that tries to extract a PDF from the "element", where "attribute" contains the supplied "contains" text
* "css" (optional, gets injected as inline styles to prettify the retrieved HTML)
