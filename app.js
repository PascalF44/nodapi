const http = require("http");
const https = require("https");

const hostname = "127.0.0.1";
const port = 3000;

const server = http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/mesure") {
      const urlsonde =
        "https://cloud.boltiot.com/remote/e08179db-97d0-49fb-82cc-d7f4f42222f1/analogRead?pin=A0&deviceName=BOLT5034218";
      let heure = new Date();
      let valeur = "";

      https.get(urlsonde, rep => {
        rep.setEncoding("utf8");
        let body = "";

        rep.on("data", data => {
          body += data;
        });

        rep.on("end", () => {
          body = JSON.parse(body);
          console.log("success: " + body.success);
          console.log("value: " + body.value);
          valeur = body.value / 10;
          body = {
            timestamp: heure,
            value: valeur
          };

          res.writeHead(200, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify(body));
        });
      });
    } else {
      res.statusCode = 404;
      res.end();
    }
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
