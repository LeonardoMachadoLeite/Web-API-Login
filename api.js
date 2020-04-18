var express = require("express")
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');


class HandlerGenerator {

  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let mockedUsername = 'aluno';
    let mockedPassword = 'unit';

    if (username && password) {

      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign(
          {username:username},
          config.secret,
          {expiresIn:'1h'}
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Autenticação sucedida!',
          token:token
        });

      } else {
        res.send(403).json({
          success: false,
          message: 'Incorreto nome de usuário ou senha'
        });

      }

    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }

  }

  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }

}


function main() {

  var app = express();
  let handlers = new HandlerGenerator();
  const port = 8082;

  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());

  // Routes & Handlers
  app.post('/login', handlers.login);
  app.get('/', middleware.checkToken, handlers.index);
  app.listen(port, () => console.log('Server is listening on port: ' + port));

}

main()