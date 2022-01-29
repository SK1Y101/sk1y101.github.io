// fetch the animation frame
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60); };
  window.requestAnimationFrame = requestAnimationFrame;
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
  this.speed = Math.random() * .05;
  this.x = options.x;
  this.y = options.y;
}

// function to reset stars that go off screen
Star.prototype.reset = function() {
  this.size = Math.random() * 2;
  this.speed = Math.random() * .05;
  this.x = width;
  this.y = Math.random() * height;
}

// update the star positions
Star.prototype.update = function() {
  this.x -= this.speed;
  if (this.x <0) {
    this.reset();
  } else {
    bgCtx.fillRect(this.x, this.y, this.size, this.size);
  }
}

// create shooting stars
function ShootingStar() {
  this.reset();
}

// function to reset the shooting stars
ShootingStar.prototype.reset = function() {
  this.x = Math.random() * width;
  this.y = 0;
  this.len = (Math.random() * 80) + 10;
  this.speed = (Math.random * 10) + 6;
  this.size = (Math.random() * 1) + .1;
  this.waitTime = new Date().getTime() + (Math.round() * 3000) + 500;
  this.active = false;
}

// function to update the shooting stars
ShootingStar.prototype.update = function() {
  if (this.active) {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.x < 0 || this.y >= height) {
      this.reset();
    } else {
      bgCtx.linewidth = this.size;
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
  entities.push(new Star({
    x: Math.random() * width,
    y: Math.random() * height
  }));
}

// add a shooting star
entities.push(new ShootingStar());

// animate the background
function animate() {
  bgCtx.fillStyle = '#110E19';
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  var entLen = entities.length;

  while (entLen--) {
    entities[entLen].update();
  }
  window.requestAnimationFrame(animate);
}
animate();
