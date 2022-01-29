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

// function to get todays date
function today(d) {
  var day = d.getDate(),
      mon = d.getMonth()+1;
  (day < 10) ? day = "0"+day : day;
  (mon < 10) ? mon = "0"+mon : mon;
  return day+"/"+mon;
}

// list of special dates
var specialDates = ["26/10", "29/01"];

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
function ShootingStar(special = false) {
  this.special = special;
  // set position outside of the screen so the reset will occur
  this.speed=0; this.x=-1; this.y=0; this.active=true;
}

// function to draw satellites
function Satellite() {
  this.y = Math.random() * height;
  this.x = Math.random() * width;
  this.speed = (Math.random() * .5) + .1;
  this.size = (Math.random() * 2) + 0.1;
  this.colour = "white";
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

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
      this.speed = 0;
      // if the shooting star is special, and it's the right time
      if (this.special) {
        if (isSpecialDate) { this.reset(); }
      // otherwise, just reset it
      } else { this.reset(); }
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
    if (this.x < 0) {
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
  // select the starting position, along the two screen axes
  var pos = Math.random() * (width + height);
  this.y = Math.max(0, pos - width);
  this.x = Math.min(width, pos);
  // the other bits
  this.len = (Math.random() * 80) + 10;
  this.size = (Math.random() * 1) + 0.1;
  this.speed = (Math.random() * 10) + 5;
  this.colour = starColour[Math.floor(Math.random() * starColour.length)];
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// function to reset the satellites
Satellite.prototype.reset = function() {
  this.y = Math.random() * height;
  this.x = width;
  this.speed = (Math.random() * .5) + .1;
  this.size = (Math.random() * 2) + 0.1;
  this.colour = "white";
  this.waitTime = new Date().getTime() + (Math.random() * 3000) + 500;
  this.active = false;
}

// boolean for if this date is special
var isSpecialDate = false;

// create an array of animated entities
var entities = [];

// initialise the star field
for (var i = height; i > 0; i--) { entities.push(new Star()); }

// add a few satellites
for (var i = 20; i > 0; i--) { entities.push(new Satellite()); }

// add a shooting star
for (var i = 2; i > 0; i--) { entities.push(new ShootingStar()); }

// add the special shooting stars
for (var i = 40; i > 0; i--) { entities.push(new ShootingStar(true)); }

// animate the background
function animate() {
  // check if something is a special date
  isSpecialDate = specialDates.includes(today(new Date()));
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
