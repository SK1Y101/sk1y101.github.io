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
  // the star has a 50% chance of being a variable star
  this.variable = Math.random() >= .50;
  // select it's colour
  this.colour = starColour[Math.floor(Math.random() * starColour.length)]
}

// function to draw shooting stars
function ShootingStar() { this.reset(); }

// function to draw satellites
function Satellite() { this.reset(); }

// update the star positions
Star.prototype.update = function() {
  // if this star is a variable star, change it's size
  if (this.variable) {
    // the variable star cannot be larger than 2 or smaller than 1, and will grow or shrink by .1
    this.size = Math.max(.1, Math.min(2, this.size + 0.2 * Math.random() - 0.1));
  }
  bgCtx.fillStyle = this.colour;
  bgCtx.fillRect(this.x, this.y, this.size, this.size);
}

// and a function to update the shooting star position
ShootingStar.prototype.update = function() {
  if (this.active) {
    // update it's position
    this.x -= this.speed;
    this.y += this.speed;
    // if it goes out of the window, reset
    if (this.x < -this.len || this.y >= height+this.len) {
      this.reset();
    } else {
      // set the shooting star colour
      bgCtx.fillStyle = this.colour;
      bgCtx.strokeStyle = this.colour;
      bgCtx.lineWidth = this.size;
      // and draw it
      bgCtx.beginPath();
      bgCtx.moveTo(this.x, this.y);
      bgCtx.lineTo(this.x + this.len, this.y - this.len);
      bgCtx.stroke();
    }
  // wait for it to be active again
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}

// a function to update the satellite star position
Satellite.prototype.update = function() {
  if (this.active) {
    // update it's position
    this.x -= this.speed;
    // if it goes out of the window, reset
    if (this.x < 0 || this.y >= height) {
      this.reset();
    } else {
      // set the colour
      bgCtx.fillStyle = this.colour;
      bgCtx.fillRect(this.x, this.y, this.size, this.size);
    }
  // wait for it to be active again
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}

// function to reset the shooting stars
ShootingStar.prototype.reset = function() {
  this.y = 0;
  this.x = Math.random() * width;
  this.len = (Math.random() * 80) + 10;
  this.speed = (Math.random() * 10) + 5;
  this.size = (Math.random() * 1) + 0.1;
  this.colour = starColour[Math.floor(Math.random() * starColour.length)];
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// function to reset the satellites
Satellite.prototype.reset = function() {
  this.y = Math.random() * height;
  this.x = width;
  this.speed = (Math.random() * 2) + 1;
  this.size = (Math.random() * 1) + 0.1;
  this.colour = "white";
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// create an array of animated entities
var entities = [];

// initialise the star field
for (var i = height; i >= 0; i--) { entities.push(new Star()); }

// add a few satellites
for (var i = 10; i >= 0; i--) { entities.push(new Satellite()); }

// add a shooting star
for (var i = 1; i >= 0; i--) { entities.push(new ShootingStar()); }

// animate the background
function animate() {
  // fetch the requiredbackground colour
  bgCtx.fillStyle = "#110E19";
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

//setInterval(animate, 1000 / 60);
