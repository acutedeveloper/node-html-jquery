var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var jsdom = require('jsdom').jsdom;

function convertPages(pageType, callback){

  var templateFile = fs.readFileSync('./templates/template-'+ pageType +'.txt', 'utf8');
  var contentFiles = fs.readdirSync('./new-content/'+ pageType +'/');

  for(x in contentFiles)
  {
    var page = fs.readFileSync('./new-content/'+ pageType +'/' + contentFiles[x], 'utf8');
    // $ = cheerio.load(page, {
    //     withDomLvl1: true,
    //     normalizeWhitespace: false,
    //     xmlMode: false,
    //     decodeEntities: false
    // });

    var document = jsdom(page, {});
    var window = document.defaultView;
    var $ = require('jquery')(window);

    var pageTitle = $("p:contains('Title:')");
    var pageMeta = $("p:contains('Meta:')");
    $('body').find(pageMeta).remove();
    $('body').find(pageTitle).remove();

    //console.log(pageTitle.text());

    $('h1').nextUntil( "h2" ).addBack().wrapAll( "<div class='best-block' />");
    var cornerImage = '<img class="alignright" src="http://placehold.it/350x150" alt="Corner Image" />';
    $('.best-block').prepend(cornerImage);
    $('<code>Function</code>').insertAfter('.best-block');

    //console.log($('h2 + h3').html());

    newPage = templateFile.replace(/%%REPLACE%%/g, $('body').html());
    newPage = newPage.replace(/%%TITLE%%/g, pageTitle.text()
    .replace('Title: ', '')
    .replace(' 2016 ', ' ".date(\'Y\')." ')
    .concat('"')
    .replace(' 2016"', ' ".date(\'Y\')')
  );
    newPage = newPage.replace(/%%META%%/g, pageMeta.text()
    .replace('Meta: ', '')
    .replace(' 2016 ', ' ".date(\'Y\')." ')
    .concat('"')
    .replace(' 2016"', ' ".date(\'Y\')')
  );
    newPage = newPage.replace('<code>Function</code>', '<?php $override = false; display_top_five(\'index\', $code, $override,\'toplists\',$mobile); ?>')

    fs.writeFile('./new-files/'+ pageType +'/' + contentFiles[x].replace('.html', '.php'), newPage, 'utf8');
    console.log('Complete: ' + contentFiles[x]);


  }

}

//convertPages('non-commercial', nonCommercial);
convertPages('commercial', commercial);

function moveMetaData(){

}

function nonCommercial(){
  //console.log('boobs');
}

function commercial(newPage){

  //Find untill first h2 heading
  console.log(newPage);
  newPage = newPage('.main-block').nextUntil( "h2" ).wrapAll( "<div class='best-block' />");
  // Wrap the first paras in tag
  console.log('Wrap Text');

  return newPage;
}
