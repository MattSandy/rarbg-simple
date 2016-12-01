var express = require('express');
var router = express.Router();

let http = require('http');
let https = require('https');
let cheerio = require('cheerio')
let zlib = require('zlib');
var request = require("request");

/* GET users listing. */
router.get('/:torrent', function(req, res, next) {
  var url = "https://rarbg.to/torrent/" + req.params.torrent;
  console.log(url);
  try {
    request({
      method: 'GET', uri: url, gzip: true, jar: true,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch, br',
        'Accept-Language': 'en-US,en;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': 'skt=NC4PW0pb9a; skt=NC4PW0pb9a; wQnP98Kj=wZkvrmuL; rarbg=1%7CThu%2C%2001%20Dec%202016%2005%3A18%3A49%20GMT; LastVisit=1480563891; wQnP98Kj=wZkvrmuL; tcc; aby=1',
        'Host': 'rarbg.to',
        'Referer': 'https://rarbg.to/index8.php',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
      }
    }, function (error, response, body) {
      if (!error) {
        $ = cheerio.load(body);
        res.redirect(302, $('a[href^="magnet:"]').attr("href"));

      } else {
        //console.log("We’ve encountered an error: " + error);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
