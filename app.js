const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/mesure') {
        let heure = new Date();
        let valeur = Math.random() * 100;

        let body = {
            "timestamp": heure,
            "value": valeur
        };
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(body));
    } else {
        res.statusCode = 404;
        res.end();
    }
}).listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});