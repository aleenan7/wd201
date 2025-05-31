const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// Parse command line arguments using minimist
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;  // Default to port 3000 if --port is not provided

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Read HTML files
fs.readFile("home.html", (err, data) => {
    if (err) throw err;
    homeContent = data;
});

fs.readFile("project.html", (err, data) => {
    if (err) throw err;
    projectContent = data;
});

fs.readFile("registration.html", (err, data) => {
    if (err) throw err;
    registrationContent = data;
});

// Create HTTP server
http
    .createServer((request, response) => {
        const url = request.url;
        response.writeHead(200, { "Content-Type": "text/html" });

        if (url === "/project") {
            response.write(projectContent);
        } else if (url === "/registration") {
            response.write(registrationContent);
        } else {
            response.write(homeContent);
        }

        response.end();
    })
    .listen(port, () => {
        console.log(`🚀 Server is running at http://localhost:${port}`);
    });
