var express = require('express');
var router = express.Router();

var cheerio = require('cheerio')
var zlib = require('zlib');
var request = require("request");

/* GET torrents. */
router.get('/:search', function (req, res, next) {
    var list = [];
    var url = "https://rarbg.to/torrents.php?search=" + req.params.search + "&order=seeders&by=DESC";
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
                console.log(body);
                $('table.lista2t tr.lista2').each(function (i, elem) {
                    var title = $(this).find('td:nth-child(2) a').text();
                    var href = $(this).find('td:nth-child(2) a').attr("href");
                    var seeders = $(this).find('td:nth-child(5) font').text();
                    var info = $(this).find('td:nth-child(2) span:last-child').text();
                    list.push({'title':title,'href':href,'seeders':seeders,'info':info});
                });
                console.log(list);
                res.render('torrents', {"list": list,"title": req.params.search});
            } else {
                //console.log("We’ve encountered an error: " + error);
            }
        });
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;