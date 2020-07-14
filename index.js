const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');

async function crawlData(res) {
    const response = await fetch('http://dummy.restapiexample.com/api/v1/employees');
    const data = await response.json();
    fs.writeFile('employees.json', JSON.stringify(data.data), function (err) {
        if (err) res.end('Crawl failed');
        res.end('Crawl successfully');
    })
}

http.createServer((req, res) => {
    if (req.url == '/' && req.method == 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World')
    }
    if (req.url == '/employees/crawl' && req.method === 'POST') {
        crawlData(res)
    }
    if (req.url == '/employees' && req.method === 'GET') {
        fs.readFile('employees.json', function (error, data) {
            res.end(data)
        })
    }
    else {
        res.statusCode = 404;
        res.end('Not found')
    }
}).listen(3000);
