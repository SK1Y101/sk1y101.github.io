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

// set the canvase size
background.width = width;
background.height = height;

// draw the night sky
bgCtx.fillStyle = "#10101A";
bgCtx.fillRect(0, 0, width, height);

// function to draw background stars
function Star(options) {
  this.size = Math.random() * 2;
  this.x = options.x;
  this.y = options.y;
}

// function to draw stars that vary slightly
function VariableStar(options) {
  this.size = Math.random() * 2;
  this.x = options.x;
  this.y = options.y;
}

// and a function to change their size for the twinkle effect
VariableStar.prototype.update = function() {
  this.size = Math.min(2, Math.max(0, this.size + Math.random() * .2 - .1));
  bgCtx.fillRect(this.x, this.y, this.size, this.size);
}

// function to draw satellites
function Satellite(options) {
  this.x = options.x;
  this.y = options.y;
  this.speed = Math.random() + .1;
  this.size = (Math.random() * 1) + 0.1;
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// function to reset the shooting stars
Satellite.prototype.reset = function() {
  this.x = Math.random() * width;
  this.y = 0;
  this.size = (Math.random() * 1) + 0.1;
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// and a function to update their positions
Satellite.prototype.update = function() {
  if (this.active) {
    this.x -= this.speed;
    if (this.x < 0) {
      this.reset();
    } else {
      bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}

// function to draw shooting stars
function ShootingStar() {
  this.reset();
}

// function to reset the shooting stars
ShootingStar.prototype.reset = function() {
  this.x = Math.random() * width;
  this.y = 0;
  this.len = (Math.random() * 80) + 10;
  this.xspeed = (Math.random() * 10) + 5;
  this.yspeed = (Math.random() * 10) + 5;
  this.size = (Math.random() * 1) + 0.1;
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// and a function to update their positions
ShootingStar.prototype.update = function() {
  if (this.active) {
    this.x -= this.xspeed;
    this.y += this.yspeed;
    if (this.x < 0 || this.y >= height) {
      this.reset();
    } else {
      bgCtx.lineWidth = this.size;
      bgCtx.beginPath();
      bgCtx.moveTo(this.x, this.y);
      bgCtx.lineTo(this.x + this.len, this.y - this.len);
      bgCtx.stroke();
    }
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}

// create an array of animated entities
var entities = [];

// initialise the star field
for (var i = 0; i < height; i++) {
  new Star({
    x: Math.random() * width,
    y: Math.random() * height
  })
}

// add some variable stars
for (var i = 0; i < Math.floor(height / 10); i++) {
  entities.push(new VariableStar({
    x: Math.random() * width,
    y: Math.random() * height
  }));
}

// add two shooting satellites
entities.push(new Satellite());
entities.push(new Satellite());

// add two shooting stars
entities.push(new ShootingStar());
entities.push(new ShootingStar());

// animate the background
function animate() {
  bgCtx.fillStyle = '#110E19';
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  // update all entities
  var entLen = entities.length;
  while (entLen--) {
    entities[entLen].update();
  }

  //schedule the next animation frame
  requestAnimFrame(animate);
}

// call the first animation
animate();
