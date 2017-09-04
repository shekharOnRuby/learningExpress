var http = require('http')
var port = 8080;
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/plain'})
    response.end('Hello World\n')
}).listen(port);

console.log('Server running on Port: ' + port);