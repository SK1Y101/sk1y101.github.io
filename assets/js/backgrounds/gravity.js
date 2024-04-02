// Let the browser handle the animation cycles
var requestAnimFrame = (function(){
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function( callback ){
           window.setTimeout(callback, 1000 / 60);
         };
})();

// fetch the background canvas
var background = document.getElementById("bgCanvas"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = document.body.offsetHeight;

// ensure we have a minimum height
(height < 400) ? height = 400 : height;
height = 1080;
width = 1920;

const dt = 0.01;
const G = 1;
const drag = 0.999;

function Star(i=0) {
  this.r = 1+1*Math.random();;
  this.x = width * Math.random();
  this.y = height * Math.random();
  this.m = 500*this.r;
  this.vx = 2*Math.random()-1;
  this.vy = 2*Math.random()-1;
  // hidden variables
  this.ax = 0;
  this.ay = 0;
  // select it's colour
  this.colour = "white";
}

Star.prototype.gravitate = function(other) {
  var dx = this.x - other.x;
  var dy = this.y - other.y;
  var absdistanceCubed = Math.abs(dx*dx*dx)+Math.abs(dy*dy*dy) + 0.01;
  var F = - G * other.m / absdistanceCubed;
  this.ax += F*dx;
  this.ay += F*dy;
}

Star.prototype.update = function() {
  this.vx += this.ax * dt;
  this.vy += this.ay * dt;
  this.x += this.vx * dt;
  this.y += this.vy * dt;
  this.ax = 0;
  this.ay = 0;
  // draw new position
  bgCtx.fillStyle = this.colour;
  bgCtx.fillRect(this.x, this.y, this.r, this.r);

  if (this.x < -10) { this.vx *= -1; this.x += 1; };
  if (this.x > width+10) { this.vx *= -1; this.x -= 1; };
  if (this.y < -10) { this.vy *= -1; this.y += 1; };
  if (this.y > height+10) { this.vy *= -1; this.y -=1; };

  // drag
  this.vx *= drag;
  this.vy *= drag;
}

// set the canvase size
background.width = width;
background.height = height;

// draw the night sky
bgCtx.fillStyle = "#110E19";
bgCtx.fillRect(0, 0, width, height);

// create an array of animated entities
var entities = [];
for (var i = height; i > 0; i--) { entities.push(new Star(i-1)); };

// animate the background
function animate() {
  bgCtx.fillStyle = "#110E19";
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  // euler aproximation
  var starA = entities.length;
  while (starA--) {
    var StarB = entities.length;
    while (StarB--) {
      if (starA == StarB) {
        continue;
      }
      entities[starA].gravitate(entities[StarB]);
    }
  }

  var entLen = entities.length;
  while (entLen--) {
    entities[entLen].update();
  }

  //schedule the next animation frame
  requestAnimFrame(animate);
}

// call the first animation
animate();
