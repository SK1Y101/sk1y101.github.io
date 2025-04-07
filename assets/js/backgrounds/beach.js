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

// fetch the background canvas
var background = document.getElementById("bgCanvas"),
    bgCtx = background.getContext("2d"),
    width = window.innerWidth,
    height = document.body.offsetHeight;

// ensure we have a minimum height
(height < 400) ? height = 400 : height;
height = 1080;
width = 1920;

// Helper functions
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// the sky
function drawSky() {
  const gradient = bgCtx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#0b0033');  // Top: deep night blue
  gradient.addColorStop(0.3, '#2e1a47');  // Twilight purple
  gradient.addColorStop(0.6, '#ff758c');  // Pink glow
  gradient.addColorStop(0.75, '#ffd580');  // Sunset orange
  gradient.addColorStop(0.9, '#fff1a8');  // Yellow near horizon
  gradient.addColorStop(1, '#ffe4b5');  // Horizon glow

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, width, height);
}

// the sun
function drawSun() {
  const sunX = width / 2;
  const sunY = height * 0.75;
  const sunRadius = 50;

  // Yellow glow (outer halo)
  const sunGradient = bgCtx.createRadialGradient(sunX, sunY, 10, sunX, sunY, sunRadius * 2.5);
  sunGradient.addColorStop(0, 'rgba(255, 255, 200, 0.5)');
  sunGradient.addColorStop(1, 'rgba(255, 255, 100, 0)');

  bgCtx.fillStyle = sunGradient;
  bgCtx.beginPath();
  bgCtx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
  bgCtx.fill();

  // Solid white sun core
  bgCtx.fillStyle = 'white';
  bgCtx.beginPath();
  bgCtx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  bgCtx.fill();
}

// Beach waves
let waveOffset = 0;
function drawWaves() {
  waveOffset += 0.01;
  ctx.fillStyle = '#1e90ff';
  ctx.beginPath();
  const amplitude = 20;
  const frequency = 0.02;
  ctx.moveTo(0, canvas.height * 0.8);
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x * frequency + waveOffset) * amplitude + canvas.height * 0.8;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
}

// Cloud entity
function Cloud() {
  this.x = Math.random() * width;
  this.y = Math.random() * (height * 0.5); // upper half of sky
  this.size = 50 + Math.random() * 100;
  this.speed = 0.1 + Math.random() * 0.3;
  this.opacity = 0.2 + Math.random() * 0.3;
  this.color = 'rgba(255, 255, 255,' + this.opacity + ')';
}

Cloud.prototype.update = function () {
  this.x += this.speed;

  if (this.x - this.size > width) {
    this.x = -this.size;
    this.y = Math.random() * (height * 0.5);
  }

  bgCtx.fillStyle = this.color;
  bgCtx.beginPath();
  bgCtx.ellipse(this.x, this.y, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
  bgCtx.fill();
};

// Bubble entity
function Bubble() {
  this.x = Math.random() * width;
  this.y = height - Math.random() * 100;
  this.radius = 2 + Math.random() * 4;
  this.speed = 0.2 + Math.random() * 0.5;
  this.alpha = 0.2 + Math.random() * 0.3;
}

Bubble.prototype.update = function () {
  this.y -= this.speed;
  this.x += Math.sin(this.y / 20) * 0.2;

  if (this.y + this.radius < 0) {
    this.y = height;
    this.x = Math.random() * width;
  }

  bgCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
  bgCtx.beginPath();
  bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  bgCtx.fill();
};


// set the canvase size
background.width = width;
background.height = height;

// create an array of animated entities
var entities = [];
// Add clouds
for (let i = 0; i < 5; i++) { entities.push(new Cloud()); }
// Add bubbles
for (let i = 0; i < 30; i++) { entities.push(new Bubble()); }


// animate the background
function animate() {
  // fetch the requiredbackground colour
  drawSky();
  drawSun();
  drawWaves();

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
