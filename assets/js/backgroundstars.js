// fetch the animation frame
(function () {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
  };
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
  this.speed = Math.random * .05;
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
