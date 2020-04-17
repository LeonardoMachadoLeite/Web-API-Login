var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;

  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
     if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      if (req["usuario"] == "aluno" && req["senha"] == "unit") {
        return res.end("Login sucedido");
      } else {
        return res.end("Login Inválido")
      }
      
   });

  res.end('Today\'s date and time is ' + dt.myDateTime());

}).listen(8082);
