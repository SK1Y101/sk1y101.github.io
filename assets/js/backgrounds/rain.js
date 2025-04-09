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

// Raindrop object
function RainDrop() {
  this.reset();
}
RainDrop.prototype.reset = function () {
  this.x = Math.random() * width;
  this.y = Math.random() * -height; // start off-screen
  this.length = 20 + Math.random() * 20;
  this.speed = 4 + Math.random() * 4;
  this.opacity = 0.1 + Math.random() * 0.3;
};
RainDrop.prototype.update = function () {
  this.y += this.speed;
  this.x += this.speed * 0.3; // slight diagonal
  if (this.y > height) this.reset();
  this.draw();
};
RainDrop.prototype.draw = function () {
  bgCtx.beginPath();
  bgCtx.moveTo(this.x, this.y);
  bgCtx.lineTo(this.x - 2, this.y - this.length);
  bgCtx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
  bgCtx.lineWidth = 1;
  bgCtx.stroke();
};


// set the canvase size
background.width = width;
background.height = height;

// draw the night sky
bgCtx.fillStyle = "#110E19";
bgCtx.fillRect(0, 0, width, height);

// create an array of animated entities
var entities = [];
// for (var i = height; i > 0; i--) { entities.push(new Object()); }
// Populate the rain
for (var i = 0; i < 300; i++) { entities.push(new RainDrop()); }

// animate the background
function animate() {
  // fetch the requiredbackground colour
  bgCtx.fillStyle = "#110E19";
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  // update all entities
  for (let entity of entities) { entity.update(); };

  //schedule the next animation frame
  requestAnimFrame(animate);
}

// call the first animation
animate();
