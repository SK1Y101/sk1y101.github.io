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
  sunGradient.addColorStop(0.6, 'rgba(252, 252, 210, 0.7)'); // fade to pale yellow
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
  this.y = height * 0.35 + (Math.random() ** 1.6 - 0.5) * height * 0.35;
  this.size = Math.random() * 40 + 20;
  this.speed = Math.random() * 0.1 + 0.05;
  this.opacity = 0.4;
  this.puffs = [];

  const puffCount = Math.floor(Math.random() * 25) + 16; // 16–40 puffs
  const bufferSize = this.size * 2;

  // Create offscreen canvas for compositing
  this.buffer = document.createElement('canvas');
  this.buffer.width = bufferSize;
  this.buffer.height = bufferSize;
  const bctx = this.buffer.getContext('2d');

  // Generate clustered ellipses with warm bottom tint
  for (let i = 0; i < puffCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * (this.size / 2);
    const px = this.size + Math.cos(angle) * radius;
    const py = this.size + Math.sin(angle) * radius;
    const rx = this.size / 2.5 + Math.random() * 5;
    const ry = this.size / 3 + Math.random() * 5;

    const verticalRatio = py / bufferSize; // 0 (top) to 1 (bottom)
    const r = 255;
    const g = 255 - verticalRatio * 25; // warmer at bottom
    const b = 255 - verticalRatio * 60;

    bctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
    bctx.beginPath();
    bctx.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
    bctx.fill();

    this.puffs.push({ x: px, y: py, rx, ry });
  }
}

Cloud.prototype.update = function () {
  this.x -= this.speed;
  if (this.x < -this.buffer.width) {
    this.x = width + this.buffer.width;
    this.y = height * 0.35 + (Math.random() ** 2 - 0.5) * height * 0.2;
  }

  bgCtx.globalAlpha = 1; // Ensure consistent composite alpha
  bgCtx.drawImage(this.buffer, this.x, this.y - this.buffer.height / 2);
};




// Bubble entity
function Bubble() {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.radius = Math.random() * 10 + 5;
  this.speedX = -(Math.random() * 0.5 + 0.1); // drift left
  this.offset = Math.random() * 1000; // for jitter phase
  this.hueShift = Math.random() * 360; // different hues per bubble
}
Bubble.prototype.update = function (time) {
  // Jitter and drift
  this.y += Math.sin((time + this.offset) * 0.002) * 0.3;
  this.x += this.speedX;

  if (this.x < -this.radius) {
    this.x = width + this.radius;
    this.y = Math.random() * height;
  }

  const grd = bgCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
  grd.addColorStop(0, 'rgba(255, 255, 255, 0.05)'); // subtle core
  grd.addColorStop(0.4, `hsla(${this.hueShift}, 80%, 85%, 0.12)`); // shifting inner tint
  grd.addColorStop(0.7, `hsla(${(this.hueShift + 120) % 360}, 90%, 75%, 0.18)`); // more variation
  grd.addColorStop(1, `hsla(${(this.hueShift + 240) % 360}, 100%, 80%, 0.4)`); // edge glow

  // Glow effect on overlap
  bgCtx.save();
  bgCtx.globalCompositeOperation = 'lighter';
  bgCtx.fillStyle = grd;
  bgCtx.beginPath();
  bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  bgCtx.fill();
  bgCtx.restore();

  // Add highlight reflection
  bgCtx.fillStyle = 'rgba(255,255,255,0.25)';
  bgCtx.beginPath();
  bgCtx.arc(this.x + this.radius / 3, this.y - this.radius / 3, this.radius / 6, 0, Math.PI * 2);
  bgCtx.fill();
};


// Shooting star entity
function ShootingStar() {
  this.reset(-200);
}
ShootingStar.prototype.update = function () {

  bottom = height * 0.6

  if (this.active) {
    // update position
    this.x -= this.speed;
    this.y += this.speed;

    // reset if out of bounds
    if (this.x < -this.len || this.y >= height + this.len) {
      this.speed = 0;
      this.reset();
    } else {
      const x1 = this.x;
      const y1 = this.y;
      const x2 = this.x + this.len;
      const y2 = this.y - this.len;

      // only draw if part of the line is visible above the bottom
      if (y1 < bottom || y2 < bottom) {
        // find intersection point at `bottom`, if needed
        let drawX1 = x1, drawY1 = y1;
        let drawX2 = x2, drawY2 = y2;

        if (y1 > bottom) {
          const t = (bottom - y2) / (y1 - y2); // interpolate intersection
          drawX1 = x2 + (x1 - x2) * t;
          drawY1 = bottom;
        }

        if (y2 > bottom) {
          const t = (bottom - y1) / (y2 - y1);
          drawX2 = x1 + (x2 - x1) * t;
          drawY2 = bottom;
        }

        // draw the clipped line
        bgCtx.strokeStyle = this.colour;
        bgCtx.lineWidth = this.size;
        bgCtx.beginPath();
        bgCtx.moveTo(drawX1, drawY1);
        bgCtx.lineTo(drawX2, drawY2);
        bgCtx.stroke();
      }
    }
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
for (var i = 10; i > 0; i--) { entities.push(new ShootingStar()); }


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
