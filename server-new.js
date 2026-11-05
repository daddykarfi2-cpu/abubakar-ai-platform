
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, "public");

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json"
};

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    return res.end(JSON.stringify({
      status: "online",
      company: "ABUBAKAR AI TECHNOLOGY COMPANY"
    }));
  }

  if (req.method === "POST" && req.url === "/api/chat") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10000) {
        req.destroy();
      }
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.message || typeof data.message !== "string") {
          res.writeHead(400);
          return res.end(JSON.stringify({
            error: "Message is required"
          }));
        }

        res.writeHead(200, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          reply: "Welcome to ABUBAKAR AI! Our real AI engine is coming soon."
        }));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({
          error: "Invalid request"
        }));
      }
    });
    return;
  }

  const pathname = decodeURIComponent(
    new URL(req.url, "http://localhost").pathname
  );

  const file = pathname === "/"
    ? "index.html"
    : pathname.slice(1);

  const fullPath = path.resolve(PUBLIC, file);

  if (!fullPath.startsWith(PUBLIC + path.sep) &&
      fullPath !== path.join(PUBLIC, "index.html")) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404);
      return res.end("File not found");
    }

    const type = mime[path.extname(fullPath)] ||
      "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": type + "; charset=utf-8"
    });

    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("ABUBAKAR AI is running on port " + PORT);
});
