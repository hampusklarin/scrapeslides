'use strict';

var express = require('express');
var reactViews = require('express-react-views');
var app = express();

app.set('view engine', 'js');
app.engine('js', reactViews.createEngine());

var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var NodeCache = require('node-cache');
var cache = new NodeCache({stdTTL: 3600, checkperiod: 0});
var cacheKey = 'scrapeslides_cache';
var util = require('./util');

var scrapeSites = function(urls, callback) {	
	var scrapeResults = {}, index = urls.length, c = 0,
	handler = function(error, response, body) {
		var url = response.request.uri.href;
		scrapeResults[url] = { error: error, response: response, body: body };
		
		if( ++c === urls.length) {
			callback(scrapeResults);
		}
	};

	while (index--) {
		request(urls[index].url, handler);
	}
};

var renderData = function(response, data) {
	response.writeHeader(200, {"Content-Type": "text/html"});
	swig.renderFile('./index.html', { results: data }, function(error, output) {
		if( error )
		{
			throw error;
		} 
		response.write(output);
	});
	response.end();
};

app.get('/react', function (req, res) {
  var initialState = {
    items: [
      'Express',
	  'Node.js',
	  'React'
    ],
    text: 'hej'
  };
  res.render('Html', { data: initialState });
});

app.get('/', function(req, res) {
	// var cachedData = cache.get(cacheKey);

	// if( !_.isEmpty(cachedData)) {
	// 	renderData(res, cachedData.scrapeslides_cache);
	// }
	// else {
		var sourceFile = require('./sources.json');

		if( sourceFile && sourceFile.sources.length > 0)
		{
			scrapeSites(sourceFile.sources, function(scrapeResults) {		
				var parsedResults = [];

				for(var url in scrapeResults) {
					var response = scrapeResults[url];

					if( response.body ) {
						var $ = cheerio.load(response.body);				
						var source = _.find(sourceFile.sources, function(src) {
							return src.url == url;
						});	
			
						var result = { name: source.name };
						if( source.css )
						{
							result.css = source.css;
						}

						var content = '';

						if( source.dom )
						{
							var markup = $(source.dom).html();
							content = markup;
						}
						else if( source.pdf )
						{
							var pdfObject = util.createObjectTag(source.url+source.pdf);
							content = pdfObject;
						}
						else if( source.filter )
						{
							var links = $(source.filter.element).filter(function(i, el) {
								return $(this).attr(source.filter.attr).indexOf(source.filter.contains) > -1;
							});

							if( links && links[0])
							{
								var object = util.createObjectTag(links[0].attribs.href);
								content = object;
							}
						}

						if( content !== '')
						{
							result.content = content;
							parsedResults.push(result);
						}
					}
				}
				// cache.set(cacheKey, parsedResults, 3600);
				renderData(res, parsedResults);
			});
		}
		else
		{
			res.writeHeader(500, {"Content-Type": "text/html"});
			res.write("Error: no sources found");
			res.end();
		}
	// }
});

app.use('/css', express.static(__dirname+'/css'));
app.use('/js', express.static(__dirname+'/js'));
app.use('/lib', express.static(__dirname+'/lib'));
app.use('/plugin', express.static(__dirname+'/plugin'));
app.use('/public', express.static(__dirname + '/public'));

var port = process.env.PORT || 8081
app.listen(port, function () {
  console.log('listening on port ' + port);
});