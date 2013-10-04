var arDrone = require('ar-drone');
var client = arDrone.createClient();

var keypress = require('keypress');
keypress(process.stdin);

var speed = 0.1;

process.stdin.on('keypress', function(ch, key) {
	try {
		if (key && key.name === 'up') {
			console.log('going forward');
			client.front(speed);
		}
		if (key && key.name === 'down') {
			console.log('backing up');
			client.back(speed);
		}
		if (key && key.name === 'left') {
			console.log('turning left');
			client.clockwise(-0.5);
		}
		if (key && key.name === 'right') {
			console.log('turning right');
			client.clockwise(0.5);
		}
		if (key && key.name === 'space') {
			land();
		}
		if (key && key.name === 'g') {
			console.log('takeoff');
			client.takeoff();
		}
		if (key && key.name === 'h') {
			console.log('hover');
			client.stop();
		}
		if (key && key.name === 'w') {
			console.log('up');
			client.up(speed);
		}
		if (key && key.name === 's') {
			console.log('down');
			client.down(speed);
		} else {
			client.stop();
		}
	} catch (e) {
		console.log('Landing hard');
		land();
		console.log(e);
	}

	if (key && key.ctrl && key.name == 'c') {
		land();
		process.stdin.pause();
		process.exit(1);
	}
});

function land() {
	console.log('Landing');
	client.land();
}

process.stdin.setRawMode(true);
process.stdin.resume();