const URL = require('url');
const HTTP = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var calculator = Calculator();

const server = HTTP.createServer(mainRequestListener);

server.listen(port, hostname, () => {
  console.log(`Robot-Server running at http://${hostname}:${port}/`);
});

// ------------------------------------------------------------------

function Calculator() {
  var memory = 0;

  function add(param) {
    memory += param;

    console.log("Robot memory after add by " + param + " = " + memory);
    return memory;
  }

  function mul(param) {
    memory *= param;

    console.log("Robot memory after mul by " + param + " = " + memory);
    return memory;
  }

  function calculate(command, param) {
    if (command == 'add') {
      return add(param);
    }
    if (command == 'mul') {
      return mul(param);
    }

    return ("Invalid command");
  }

  return {
    'calculate': calculate
  }
}

function parseRequest(req) {
    var url = URL.parse(req.url, true);
    var pathName = url.pathname; // '/add'
    var query = url.query; // {num: '10'}

    var command = (pathName.startsWith('/')) ? pathName.substr(1) : pathName;
    var param = 0;

    if (query && query.num) {
      param = parseInt(query.num);
    }

    return [command, param];
}

function mainRequestListener(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  var calculatorRequest = parseRequest(req);
  var command = calculatorRequest[0];
  var param = calculatorRequest[1];

  if (command == "restart") {
    calculator = Calculator();
    res.end("Calculator restarted");
  }
  else {
    res.end("" + calculator.calculate(command, param));
  }
}

