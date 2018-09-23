const API = require('./robot_api');

const robotAPI = API.RobotAPI("127.0.0.1", "3000");

robotAPI.add(1);
robotAPI.add(2);
robotAPI.add(3);
robotAPI.mul(2);
robotAPI.mul(3);
robotAPI.add(-10);
robotAPI.mul(2);