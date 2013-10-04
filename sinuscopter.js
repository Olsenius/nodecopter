var arDrone = require('ar-drone');
var client = arDrone.createClient();
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  if (key && key.name == 'space') {
    console.log("landing...");
    client.land();
  }

  if (key && key.ctrl && key.name == 'c') {
    client.land();
    process.exit(1);
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();

var currentYPos = 0;

client.takeoff();
client
  .after(5000, function() {
    setInterval( sine, 100, this);

  });


function sine(drone) {
    var position = Math.sin( currentYPos ) / 2 + 0.5;
    console.log("Pos: " + position);

    if (position >= 0.5) {
      drone.up(0.8);
    } else {
      drone.down(0.8);
    }
    currentYPos += 0.10;
}