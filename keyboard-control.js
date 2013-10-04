var arDrone = require('ar-drone');
var client = arDrone.createClient();

var keypress = require('keypress');
keypress(process.stdin);

var speed = 0.1;
var lastAction = new Date().getTime();


process.stdin.on('keypress', function(ch, key) {
	try {
		if (key && key.ctrl && key.name == 'c') {
			land();
			process.stdin.pause();
			process.exit(1);
		}

		if (key && key.name === 'up') {
			console.log('going forward');
			client.front(speed);
		} else if (key && key.name === 'down') {
			console.log('backing up');
			client.back(speed);
		} else if (key && key.name === 'left') {
			console.log('turning left');
			client.clockwise(-0.5);
		} else if (key && key.name === 'right') {
			console.log('turning right');
			client.clockwise(0.5);
		} else if (key && key.name === 'space') {
			land();
		} else if (key && key.name === 'g') {
			console.log('takeoff');
			client.takeoff();
		} else if (key && key.name === 'h') {
			console.log('hover');
			client.stop();
		} else if (key && key.name === 'w') {
			console.log('up');
			client.up(speed);
		} else if (key && key.name === 's') {
			console.log('down');
			client.down(speed);
		} else if (key && key.name === 'i') {
			speed += 0.1;
			console.log('speed increased to ' + speed);
		} else if (key && key.name === 'o') {
			speed -= 0.1;
			console.log('speed decreased to ' + speed);
		} else {
			if (key) {
				//console.log(key);
			}
		}
		lastAction = new Date().getTime();
	} catch (e) {
		console.log('Landing hard');
		land();
		console.log(e);
	}


});

function checkForHover() {
	try {
		var test = new Date().getTime() - 500;
		if (lastAction < test) {
			console.log("Hover");
			client.stop();
		}
	} catch (e) {
		console.log(e);
		console.log("Landing");
		client.land();
	}
}

setInterval(checkForHover, 200);

function land() {
	console.log('Landing');
	client.land();
}

process.stdin.setRawMode(true);
process.stdin.resume();