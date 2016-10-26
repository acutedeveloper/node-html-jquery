var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// Get the file contents
//var body = fs.readFileSync('index.html', 'utf8');

// Get webpage
request({
  uri: "http://www.onlinecasinodeutschland.com/blackjack-wie-man-nicht-spielen-soll.html",
}, function(error, response, body) {
  var $ = cheerio.load(body, {
    decodeEntities: false
  });

fs.writeFile('newfile.html', $('article.main-article'), 'utf8');
  //console.log($('article.main-article').html());
});


// // Load into the dom
// $ = cheerio.load(body, {
//     withDomLvl1: true,
//     normalizeWhitespace: false,
//     xmlMode: false,
//     decodeEntities: false
// });
//
// $('a').addClass('boobs');
//
// console.dir(fs.readdirSync('./'));
//
// fs.writeFile('newfile.html', $.html(), 'utf8');
