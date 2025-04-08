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

const starColour = ["white", "floralWhite", "aliceBlue", "powderBlue", "azure", "moccasin", "sandyBrown", "peachPuff"]
const namedColorRGB = {
  "white": [255, 255, 255],
  "floralWhite": [255, 250, 240],
  "aliceBlue": [240, 248, 255],
  "powderBlue": [176, 224, 230],
  "azure": [240, 255, 255],
  "moccasin": [255, 228, 181],
  "sandyBrown": [244, 164, 96],
  "peachPuff": [255, 218, 185],
};

// the sky
function drawSky() {
  const bottom = height * 0.7;

  const gradient = bgCtx.createLinearGradient(0, 0, 0, bottom);
  gradient.addColorStop(0, '#0b0033');  // Top: deep night blue
  gradient.addColorStop(0.3, '#2e1a47');  // Twilight purple
  gradient.addColorStop(0.6, '#ff758c');  // Pink glow
  gradient.addColorStop(0.75, '#ffd580');  // Sunset orange
  gradient.addColorStop(0.9, '#fff1a8');  // Yellow near horizon
  gradient.addColorStop(1, '#ffe4b5');  // Horizon glow

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, width, bottom);
}

// the sea
function drawSea() {
  const top = height * 0.7;

  const gradient = bgCtx.createLinearGradient(0, top, 0, height);
  gradient.addColorStop(0, '#98f5e1');  // Horizon: soft aqua
  gradient.addColorStop(0.3, '#56cfe1');  // Light turquoise
  gradient.addColorStop(0.6, '#2d6cdf');  // Deeper blue
  gradient.addColorStop(1, '#0b1a40');    // Beach edge: dark ocean blue

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, top, width, height - top);
}


// the sun
function drawSun() {
  const sunX = width / 2;
  const sunY = height * 0.6;

  const sunRadius = 40;

  // Smooth gradient from warm white to golden yellow
  const sunGradient = bgCtx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2.5);
  sunGradient.addColorStop(0, 'rgba(255, 255, 220, 0.9)');  // soft warm white
  sunGradient.addColorStop(0.6, 'rgba(255, 255, 180, 0.7)'); // fade to pale yellow
  sunGradient.addColorStop(0.8, 'rgba(255, 255, 150, 0.6)'); // fade to pale yellow
  sunGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');       // transparent golden edge

  bgCtx.fillStyle = sunGradient;
  bgCtx.beginPath();
  bgCtx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
  bgCtx.fill();
}

// Cloud entity
function Cloud() {
  this.x = Math.random() * width;
  this.y = Math.random() * height * 0.2;
  this.size = Math.random() * 40 + 40;
  this.speed = Math.random() * 0.1 + 0.05;
  this.puffCount = Math.floor(Math.random() * 3) + 3; // 3–5 puffs
}

Cloud.prototype.update = function (time) {
  this.x -= this.speed;
  if (this.x < -this.size * 2) {
    this.x = width + this.size;
    this.y = Math.random() * height * 0.2;
  }

  bgCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  for (let i = 0; i < this.puffCount; i++) {
    const puffX = this.x + i * (this.size / 2);
    const puffY = this.y + Math.sin(time * 0.001 + i) * 2;
    bgCtx.beginPath();
    bgCtx.ellipse(puffX, puffY, this.size / 2, this.size / 3, 0, 0, Math.PI * 2);
    bgCtx.fill();
  }
};


// Bubble entity
function Bubble() {
  this.x = Math.random() * width;
  this.y = height * 0.3 + Math.random() * (height * 0.5); // sea region
  this.size = Math.random() * 8 + 2;
  this.speed = Math.random() * 0.2 + 0.1;
  this.jitterSpeed = Math.random() * 0.001 + 0.0001;
  this.jitterPhase = Math.random() * Math.PI * 2;
}

Bubble.prototype.update = function (time) {
  this.x -= this.speed;
  this.y += Math.sin(time * this.jitterSpeed + this.jitterPhase); // up/down wobble

  if (this.x < -this.size) {
    this.x = width + this.size;
    this.y = height * 0.3 + Math.random() * (height * 0.5);
  }

  bgCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  bgCtx.beginPath();
  bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  bgCtx.fill();
};

// Shooting star entity
function ShootingStar() {
  this.reset(-200);
}
ShootingStar.prototype.update = function () {

  bottom = height * 0.6

  if (this.active) {
    // update it's position
    this.x -= this.speed;
    this.y += this.speed;
    // if it goes out of the window, reset
    if (this.x < -this.len || this.y >= height + this.len) {
      this.speed = 0;
      this.reset();
    } else {
      bgCtx.fillStyle = this.colour;
      bgCtx.strokeStyle = this.colour;
      bgCtx.lineWidth = this.size;
      bgCtx.beginPath();
      bgCtx.moveTo(this.x, max(bottom, this.y));
      bgCtx.lineTo(this.x + this.len, max(bottom, this.y - this.len));
      bgCtx.stroke();
    }
    // wait for it to be active again
  } else {
    if (this.waitTime < new Date().getTime()) {
      this.active = true;
    }
  }
}
ShootingStar.prototype.reset = function (x = "0") {
  // select the starting position, along the two screen axes
  var pos = Math.random() * (width + height);
  this.y = Math.max(0, pos - width);
  (x == "0") ? this.x = Math.min(width, pos) : this.x = x;
  // the other bits
  this.len = (Math.random() * 80) + 10;
  this.size = (Math.random() * 1) + 0.1;
  this.speed = (Math.random() * 10) + 5;
  this.colour = starColour[Math.floor(Math.random() * starColour.length)];
  this.waitTime = new Date().getTime() + (Math.random() * 20000);
  this.active = false;
}

// set the canvase size
background.width = width;
background.height = height;

// create an array of animated entities
var entities = [];
// Add clouds
for (var i = 15; i > 0; i--) { entities.push(new Cloud()); }
// Add bubbles
for (var i = 20; i > 0; i--) { entities.push(new Bubble()); }

// add a shooting star
for (var i = 5; i > 0; i--) { entities.push(new ShootingStar()); }


// animate the background
function animate() {
  const time = performance.now(); // Use high-resolution timer

  drawSky();
  drawSea();
  drawSun();       // If sun animates with time

  // Update all entities
  var entLen = entities.length;
  while (entLen--) {
    entities[entLen].update(time); // Pass time if needed
  }

  requestAnimFrame(animate);
}


// call the first animation
animate();
