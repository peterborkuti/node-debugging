const http = require('http');

function RobotAPI(host, port) {
    requester = HttpRequestCreator(host, port);

    function add(num) {
        requester.get('add', num);
    }

    function mul(num) {
        requester.get('mul', num);
    }

    return {
        'add': add,
        'mul': mul
    }
}

function HttpRequestCreator(host, port) {
    function getUrl(command, param) {
        return 'http://' + host + ':' + port + '/' + command + '?num=' + param;
    }

    function readResponse(resp) {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log("Got:" + data);
        });
    }

    function get(command, param) {
        http.get(getUrl(command, param), readResponse)
            .on("error", (err) => {
                console.log("Error: " + err.message);
            });
    }

    return { 'get' : get };
}

exports.RobotAPI = RobotAPI;