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
  const gradient = bgCtx.createLinearGradient(0, 0, 0, height*0.7);
  gradient.addColorStop(0, '#0b0033');  // Top: deep night blue
  gradient.addColorStop(0.3, '#2e1a47');  // Twilight purple
  gradient.addColorStop(0.6, '#ff758c');  // Pink glow
  gradient.addColorStop(0.75, '#ffd580');  // Sunset orange
  gradient.addColorStop(0.9, '#fff1a8');  // Yellow near horizon
  gradient.addColorStop(1, '#ffe4b5');  // Horizon glow

  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, width, height*0.7);
}

// the sea
function drawSea() {
  const top = height * 0.3;

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

  const sunRadius = height * 0.1;

  // Smooth gradient from warm white to golden yellow
  const sunGradient = bgCtx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius * 2.5);
  sunGradient.addColorStop(0, 'rgba(255, 255, 220, 0.9)');  // soft warm white
  sunGradient.addColorStop(0.6, 'rgba(255, 255, 150, 0.6)'); // fade to pale yellow
  sunGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');       // transparent golden edge

  bgCtx.fillStyle = sunGradient;
  bgCtx.beginPath();
  bgCtx.arc(sunX, sunY, sunRadius * 2.5, 0, Math.PI * 2);
  bgCtx.fill();
}

// sun reflection on the water
function drawSunReflection(time) {
  const sunX = width / 2;
  const sunY = height * 0.75;
  const shimmerHeight = height * 0.25;
  const shimmerWidth = width * 0.1;

  const shimmerGradient = bgCtx.createLinearGradient(sunX, sunY, sunX, sunY + shimmerHeight);
  shimmerGradient.addColorStop(0, 'rgba(255, 255, 180, 0.4)');
  shimmerGradient.addColorStop(0.5, 'rgba(255, 215, 100, 0.2)');
  shimmerGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

  bgCtx.fillStyle = shimmerGradient;

  // Optional shimmer flicker using time
  const flicker = Math.sin(time * 0.005) * 10;

  bgCtx.beginPath();
  bgCtx.ellipse(sunX, sunY + shimmerHeight / 2, shimmerWidth + flicker, shimmerHeight, 0, 0, Math.PI * 2);
  bgCtx.fill();
}


// The beach
function drawBeach(time) {
  const beachHeight = height * 0.25;
  const beachTop = height - beachHeight;

  // --- Dry sand ---
  const sandGradient = bgCtx.createLinearGradient(0, beachTop, 0, height);
  sandGradient.addColorStop(0, '#f9e4b7'); // light sand
  sandGradient.addColorStop(1, '#d9c08b'); // deeper sand
  bgCtx.fillStyle = sandGradient;
  bgCtx.beginPath();
  bgCtx.moveTo(0, beachTop);

  // Curved shoreline
  const cp1x = width * 0.25, cp1y = beachTop - 20;
  const cp2x = width * 0.75, cp2y = beachTop + 20;
  bgCtx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, width, beachTop);
  bgCtx.lineTo(width, height);
  bgCtx.lineTo(0, height);
  bgCtx.closePath();
  bgCtx.fill();

  // --- Wet sand band ---
  const wetHeight = 20;
  const wetTop = beachTop - wetHeight;
  const wetGradient = bgCtx.createLinearGradient(0, wetTop, 0, beachTop);
  wetGradient.addColorStop(0, '#e0c48e');
  wetGradient.addColorStop(1, '#bba074');
  bgCtx.fillStyle = wetGradient;
  bgCtx.fillRect(0, wetTop, width, wetHeight);

  // --- Water shimmer ---
  const shimmerCount = 30;
  for (let i = 0; i < shimmerCount; i++) {
    const x = Math.random() * width;
    const y = wetTop - Math.random() * 10;
    const alpha = Math.random() * 0.2 + 0.05;
    bgCtx.fillStyle = `rgba(255,255,255,${alpha})`;
    bgCtx.fillRect(x, y, 2, 1);
  }

  // --- Waves (animated lines) ---
  const waveCount = 3;
  for (let i = 0; i < waveCount; i++) {
    const waveY = wetTop - i * 6;
    const waveOffset = Math.sin(time * 0.002 + i) * 5;
    drawWaveLine(waveY, waveOffset);
  }
}

// Helper to draw a squiggly wave line
function drawWaveLine(y, offset) {
  bgCtx.beginPath();
  bgCtx.moveTo(0, y);
  for (let x = 0; x <= width; x += 20) {
    const sine = Math.sin((x + offset) * 0.05) * 3;
    bgCtx.lineTo(x, y + sine);
  }
  bgCtx.strokeStyle = 'rgba(255,255,255,0.3)';
  bgCtx.lineWidth = 1;
  bgCtx.stroke();
}


// Beach waves
let waveOffset = 0;
function drawWaves() {
  waveOffset += 0.01;
  bgCtx.fillStyle = '#1e90ff';
  bgCtx.beginPath();
  const amplitude = 20;
  const frequency = 0.02;
  bgCtx.moveTo(0, canvas.height * 0.8);
  for (let x = 0; x < canvas.width; x++) {
    const y = Math.sin(x * frequency + waveOffset) * amplitude + canvas.height * 0.8;
    bgCtx.lineTo(x, y);
  }
  bgCtx.lineTo(canvas.width, canvas.height);
  bgCtx.lineTo(0, canvas.height);
  bgCtx.closePath();
  bgCtx.fill();
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
  const time = performance.now(); // Use high-resolution timer

  drawSky();
  drawSea();
  drawSunReflection(time);
  drawSun();       // If sun animates with time
  
  drawBeach(time);     // Beach shimmer/waves
  drawWaves();     // Any wave movement with time

  // Update all entities
  var entLen = entities.length;
  while (entLen--) {
    entities[entLen].update(time); // Pass time if needed
  }

  requestAnimFrame(animate);
}


// call the first animation
animate();
