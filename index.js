var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// Get the file contents
//var body = fs.readFileSync('index.html', 'utf8');

// Get webpage
request({
    uri: "http://www.gambling.net/mobile-guide.php",
}, function(error, response, body) {

    var $ = cheerio.load(body, {
        decodeEntities: false
    });

    var articleBlock = $('article.main-block');
    var popularPages = articleBlock.find('.block-light-green');

    fs.writeFile('newfile.html', popularPages, 'utf8');
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
// console.dir(fs.readdirSync('./new-content'));
//
// fs.writeFile('newfile.html', $.html(), 'utf8');

var templateFile = fs.readFileSync('./templates/page-template.txt', 'utf8');
var contentFiles = fs.readdirSync('./new-content');

for(x in contentFiles)
{
  var page = fs.readFileSync('./new-content/' + contentFiles[x], 'utf8');
  $ = cheerio.load(page, {
      withDomLvl1: true,
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: false
  });

  var newPage = templateFile.replace(/%%REPLACE%%/g, $('body').html());
  var pageTitle = $("p:contains('Title:')").text();
  var pageMeta = $("p:contains('Meta:')").text();
  newPage = newPage.replace(/%%TITLE%%/g, pageTitle.replace('Title:', ''));
  newPage = newPage.replace(/%%META%%/g, pageMeta.replace('Meta:', ''));

  fs.writeFile('./new-files/' + contentFiles[x].replace('.html', '.php'), newPage, 'utf8');
  console.log('Complete: ' + contentFiles[x]);

}

// fs.readFile('./templates/page-template.txt', {'encoding': 'utf-8'}, (err, data) => {
//   if (err) throw err;
//
//   var $ = cheerio.load(data, {
//       decodeEntities: false
//   });
//
//   var articleBlock = $('article.main-block');
//   var popularPages = articleBlock.find('.block-light-green');
//
//
//   var newData = data.replace(/%%REPLACE%%/g, "W3Schools");
//   console.log(newData);
//
//   fs.writeFile('newfile.html', popularPages, 'utf8');
//
// });
//
// const testFolder = './new-content/';
// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     console.log(file);
//   });
// })

// Get the converted word doc html

//Extract the page from the html <body>

// Extract the title and meta


//dump the new data into templates

//save template as a new file in folder
