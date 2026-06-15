const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const rs = fs.createReadStream('index.html');

    rs.pipe(res);
}).listen(3000);

console.log('Server running on port 3000');