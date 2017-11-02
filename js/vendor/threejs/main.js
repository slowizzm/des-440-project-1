var particles = [];
var NUM_PARTICLES = 333;


function setup() {
  var myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  myCanvas.parent('myCanvas');

  for (var i = 0; i < NUM_PARTICLES; i++) {
    var p  = new Particle(random(-cos(random(9000))));
    particles.push(p);
  }
}

function draw() {
  background(255);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
    particles[i].edges();
  }
}
