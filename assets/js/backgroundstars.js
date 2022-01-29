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
bgCtx.fillStyle = "#110E19";
bgCtx.fillRect(0, 0, width, height);

// determine which star colours are allowed
const starColour = ["white", "floralWhite", "aliceBlue", "powderBlue", "azure", "moccasin", "sandyBrown", "peachPuff"]

// function to draw background stars
function Star() {
  this.size = Math.random() * 2 + .1;
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  // select a random star colour
  bgCtx.fillStyle = Math.floor(Math.random() * starColour.length);
  bgCtx.fillRect(this.x, this.y, this.size, this.size);
}

// function to draw stars that vary slightly
//function VariableStar() {
//  this.size = Math.random() * 2 + .1;
//  this.x = Math.random() * width;
//  this.y = Math.random() * height;
//}

// and a function to change their size for the twinkle effect
//VariableStar.prototype.update = function() {
//  this.size = Math.random() * 2 + .1;
//  bgCtx.fillRect(this.x, this.y, this.size, this.size);
//}

// function to draw satellites
//function Satellite() {
//  this.x = options.x;
//  this.y = options.y;
//  this.speed = Math.random() + .1;
//  this.size = (Math.random() * 1) + 0.1;
//  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
//  this.active = false;
//}

// function to reset the shooting stars
//Satellite.prototype.reset = function() {
//  this.x = Math.random() * width;
//  this.y = 0;
//  this.size = (Math.random() * 1) + 0.1;
//  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
//  this.active = false;
//}

// and a function to update their positions
//Satellite.prototype.update = function() {
//  if (this.active) {
//    this.x -= this.speed;
//    if (this.x < 0) {
//      this.reset();
//    } else {
//      bgCtx.fillRect(this.x, this.y, this.size, this.size);
//    }
//  } else {
//    if (this.waitTime < new Date().getTime()) {
//      this.active = true;
//    }
//  }
//}

// function to draw shooting stars
//function ShootingStar() {
//  this.reset();
//}

// function to reset the shooting stars
//ShootingStar.prototype.reset = function() {
//  this.x = Math.random() * width;
//  this.y = 0;
//  this.len = (Math.random() * 80) + 10;
//  this.xspeed = (Math.random() * 10) + 5;
//  this.yspeed = (Math.random() * 10) + 5;
//  this.size = (Math.random() * 1) + 0.1;
//  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
//  this.active = false;
//}

// and a function to update their positions
//ShootingStar.prototype.update = function() {
//  if (this.active) {
//    this.x -= this.xspeed;
//    this.y += this.yspeed;
//    if (this.x < -this.len || this.y >= height+this.len) {
//      this.reset();
//    } else {
//      bgCtx.lineWidth = this.size;
//      bgCtx.beginPath();
//      bgCtx.moveTo(this.x, this.y);
//      bgCtx.lineTo(this.x + this.len, this.y - this.len);
//      bgCtx.stroke();
//    }
//  } else {
//    if (this.waitTime < new Date().getTime()) {
//      this.active = true;
//    }
//  }
//}

// create an array of animated entities
var entities = [];

// initialise the star field
for (var i = height; i >= 0; i--) { new Star() }

// add some variable stars
//for (var i = Math.floor(height / 4); i >= 0; i--) { entities.push(new VariableStar()); }

// add a few satellites
//for (var i = 4; i >= 0; i--) { entities.push(new Satellite()); }

// add two shooting stars
//for (var i = 2; i >= 0; i--) { entities.push(new ShootingStar()); }

// animate the background
function animate() {
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
