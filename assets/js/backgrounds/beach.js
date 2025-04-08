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

const starColour = ["white", "floralWhite", "aliceBlue", "powderBlue", "azure", "moccasin", "sandyBrown", "peachPuff"];

// the sky
function drawSky() {
  const bottom = height * 0.7;

  const gradient = bgCtx.createLinearGradient(0, 0, 0, bottom);
  gradient.addColorStop(0, '#0b0033');  // Top: deep night blue
  gradient.addColorStop(0.1, '#2e1a47');  // Twilight purple
  gradient.addColorStop(0.4, '#ff758c');  // Pink glow
  gradient.addColorStop(0.7, '#ffd580');  // Sunset orange
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
function drawWaves() {
  const waveCount = 5;  // Number of waves
  const waveHeight = 10;  // Height of the waves
  const waveFrequency = 0.05;  // Frequency of waves
  const waveSpeed = 0.02;  // Speed of wave movement

  bgCtx.save();
  bgCtx.globalAlpha = 0.7;  // Semi-transparent for waves

  // Loop to draw multiple waves
  for (let i = 0; i < waveCount; i++) {
    bgCtx.beginPath();
    for (let x = 0; x < width; x++) {
      // Calculate the y-position based on sine wave function
      const y = height * 0.7 + Math.sin((x + waveSpeed * i) * waveFrequency) * waveHeight;
      if (x === 0) {
        bgCtx.moveTo(x, y);  // Move to the start point
      } else {
        bgCtx.lineTo(x, y);  // Draw the wave line
      }
    }

    bgCtx.lineWidth = 2;  // Set the thickness of the wave line
    bgCtx.strokeStyle = "rgba(255, 255, 255, 0.3)";  // Wave color (light blue/white)
    bgCtx.stroke();
  }

  bgCtx.restore();
}
function drawShimmer() {
  const shimmerCount = 50;  // Number of shimmer spots
  const shimmerMaxSize = 5;  // Maximum size of shimmer spots
  const shimmerSpeed = 0.2;  // Speed at which the shimmer moves

  // Set up shimmer-specific parameters
  const shimmerYPosition = height * 0.6;  // Position of shimmer below the sun (just above the sea surface)

  bgCtx.save();
  bgCtx.globalAlpha = 0.8;  // Set shimmer transparency

  for (let i = 0; i < shimmerCount; i++) {
    const x = (Math.random() * width);  // Random x position
    const y = shimmerYPosition + Math.random() * 10;  // Random small variation in y position

    // Random size for each shimmer spot
    const size = Math.random() * shimmerMaxSize + 1;

    // Use a radial gradient for the shimmer effect
    const gradient = bgCtx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");  // Bright white center
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.6)");  // Slightly transparent white
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");  // Transparent outer edge

    bgCtx.fillStyle = gradient;

    // Draw the shimmer spot
    bgCtx.beginPath();
    bgCtx.arc(x + shimmerSpeed * Math.sin(i), y, size, 0, 2 * Math.PI);  // Slight horizontal movement
    bgCtx.fill();
  }

  bgCtx.restore();
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
  this.y = 0.35 * height + (Math.random() ** 1.6 - 0.5) * height * 0.35;
  this.size = 40 * Math.random() + 40;
  this.speed = 0.1 * Math.random() + 0.05;
  this.puffs = [];

  const puffCount = Math.floor(30 * Math.random()) + 30;
  const bufferSize = 2.5 * this.size;

  // Create offscreen canvas for compositing
  this.buffer = document.createElement("canvas");
  this.buffer.width = bufferSize;
  this.buffer.height = bufferSize;
  const o = this.buffer.getContext("2d");

  // Apply soft shadow effect for the cloud puffs
  o.shadowColor = "rgba(255, 255, 255, 0.3)";
  o.shadowBlur = 30;

  // Apply a gradient for smoother edges
  for (let i = 0; i < puffCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * (this.size / 2);
    const px = bufferSize / 2 + Math.cos(angle) * radius;
    const py = bufferSize / 2 + Math.sin(angle) * radius;

    const rx = this.size / 3 + 6 * Math.random();
    const ry = this.size / 4 + 4 * Math.random();
    const opacity = 0.3 + 0.3 * Math.random();

    // Draw each puff with varying opacity
    o.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    o.beginPath();
    o.ellipse(px, py, rx, ry, 0, 0, Math.PI * 2);
    o.fill();

    this.puffs.push({ x: px, y: py, rx: rx, ry: ry });
  }
}

Cloud.prototype.update = function () {
  this.x -= this.speed;
  if (this.x < -this.buffer.width) {
    this.x = width + this.buffer.width;
    this.y = 0.35 * height + (Math.random() ** 1.6 - 0.5) * height * 0.35;
  }

  // Apply global alpha transparency for smooth blending
  bgCtx.globalAlpha = 0.7;  // Adjust opacity as needed
  bgCtx.drawImage(this.buffer, this.x, this.y - this.buffer.height / 2);
};



// Bubble entity
function Bubble() {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.radius = Math.random() * 20 + 5;
  this.speedX = -(Math.random() * 0.5 + 0.1); // drift left
  this.offset = Math.random() * 1000; // for jitter phase
  this.hueShift = Math.random() * 360; // different hues per bubble
}
Bubble.prototype.update = function (t) {
  // Ensure x, y, and radius are finite numbers
  if (isFinite(this.x) && isFinite(this.y) && isFinite(this.radius)) {
    this.y += 0.3 * Math.sin(0.002 * (t + this.offset));
    this.x += this.speedX;

    // Reset bubble if it goes off the screen
    if (this.x < -this.radius) {
      this.x = width + this.radius;
      this.y = Math.random() * height;
    }

    // Create the radial gradient for the bubble
    const i = bgCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

    i.addColorStop(0, "rgba(255, 255, 255, 0.05)");
    i.addColorStop(0.4, `hsla(${this.hueShift}, 80%, 85%, 0.12)`);
    i.addColorStop(0.7, `hsla(${(this.hueShift + 120) % 360}, 90%, 75%, 0.18)`);
    i.addColorStop(1, `hsla(${(this.hueShift + 240) % 360}, 100%, 80%, 0.4)`);

    // Drawing the bubble with the gradient
    bgCtx.save();
    bgCtx.globalCompositeOperation = "lighter";
    bgCtx.fillStyle = i;
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    bgCtx.fill();
    bgCtx.restore();

    // Inner bubble reflection
    bgCtx.fillStyle = "rgba(255, 255, 255, 0.25)";
    bgCtx.beginPath();
    bgCtx.arc(this.x + this.radius / 3, this.y - this.radius / 3, this.radius / 6, 0, 2 * Math.PI);
    bgCtx.fill();
  } else {
    console.error("Invalid bubble parameters:", this.x, this.y, this.radius);
  }
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

// Star entity, twinkles
function Star(x, y, size, colour, isConstellation = false) {
  this.x = x || Math.random() * width;
  this.y = y || Math.random() * height * 0.3;
  this.size = size || Math.random() * 2 + 0.1;
  this.colour = colour || starColour[Math.floor(Math.random() * starColour.length)];
  this.isConstellation = isConstellation;  // Boolean flag to check if star is in a constellation
}
Star.prototype.update = function () {
  // Adjust the size of the star due to twinkling
  this.size = Math.max(.1, Math.min(2, this.size + 0.1 * Math.random() - 0.05));

  // Draw the star
  bgCtx.fillStyle = this.colour;
  bgCtx.fillRect(this.x, this.y, this.size, this.size);

  // Draw the glow effect if it's part of a constellation
  this.drawGlow();
};
Star.prototype.drawGlow = function () {
  if (this.isConstellation) {
    bgCtx.save();
    bgCtx.globalAlpha = 0.6;  // Glow transparency
    bgCtx.shadowColor = this.colour;
    bgCtx.shadowBlur = 15;  // Glow size
    bgCtx.fillStyle = this.colour;
    bgCtx.beginPath();
    bgCtx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
    bgCtx.fill();
    bgCtx.restore();
  }
};

// Constellations!
function drawConstellationLines(stars, connections) {
  bgCtx.beginPath();
  connections.forEach(connection => {
    const star1 = stars[connection.from];
    const star2 = stars[connection.to];
    bgCtx.moveTo(star1.x, star1.y);
    bgCtx.lineTo(star2.x, star2.y);
  });
  bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';  // Soft white color for lines
  bgCtx.lineWidth = 1.5;  // Line width
  bgCtx.stroke();
};


// set the canvase size
background.width = width;
background.height = height;

// create an array of animated entities
var stars = [];
var shootingstars = [];
var clouds = [];
var bubbles = [];
// Add clouds
for (var i = 15; i > 0; i--) { clouds.push(new Cloud()); }
// Add bubbles
for (var i = 30; i > 0; i--) { bubbles.push(new Bubble()); }
// add shooting stars
for (var i = 10; i > 0; i--) { shootingstars.push(new ShootingStar()); }
// add random stars
for (var i = 400; i > 0; i--) { stars.push(new Star()); }

// we have a list of RA and DEC, we convert to screenspace with awkwardness
const orionX = 1200;
const orionY = 200;
const orionH = -4;
const orionW = orionH;
const orionStars = [
  new Star(orionX + orionW*83.63, orionY + orionH*7.407, 2, 'sandyBrown', true),        // Betelgeuse     0
  new Star(orionX + orionW*81.28, orionY + orionH*6.349, 1.8, 'powderBlue', true),      // Bellatrix      1
  new Star(orionX + orionW*84.05, orionY + orionH*-1.194, 1.5, 'aliceBlue', true),      // Alnilam        2
  new Star(orionX + orionW*83.00, orionY + orionH*-0.299, 1.3, 'aliceBlue', true),      // Mintaka        3
  new Star(orionX + orionW*86.95, orionY + orionH*-9.278, 1.7, 'azure', true),          // Saiph          4
  new Star(orionX + orionW*80.13, orionY + orionH*-8.201, 1.6, 'powderBlue', true),     // Rigel          5
  new Star(orionX + orionW*85.11, orionY + orionH*-1.942, 1.4, 'azure', true),          // Alnitak (belt) 6
  new Star(orionX + orionW*77.33, orionY + orionH*4.817, 1.2, 'white', true),           // Meissa (head)  7
];
const cassX = 200;
const cassY = 200;
const cassH = -8;
const cassW = cassH;
const cassiopeiaStars = [
  new Star(cassX + cassW*0.959, cassY + cassH*56.53, 1.8, 'moccasin', true),      // Schedar  0
  new Star(cassX + cassW*1.597, cassY + cassH*59.12, 1.7, 'aliceBlue', true),     // Caph     1
  new Star(cassX + cassW*1.777, cassY + cassH*56.53, 1.5, 'powderBlue', true),    // Navi     2
  new Star(cassX + cassW*2.296, cassY + cassH*60.72, 1.4, 'floraWhite', true),    // Ruchbah  3
  new Star(cassX + cassW*1.842, cassY + cassH*61.57, 1.6, 'azure', true)          // Segin    4
];

// Create stars for constellations
for (let star of orionStars) { stars.push(star); }
for (let star of cassiopeiaStars) { stars.push(star); }
const orionConnections = [
  { from: 0, to: 1 },
  { from: 0, to: 6 },
  { from: 0, to: 7 },
  { from: 1, to: 3 },
  { from: 1, to: 7 },
  { from: 2, to: 3 },
  { from: 2, to: 6 },
  { from: 3, to: 5 },
  { from: 4, to: 6 },
];
const cassiopeiaConnections = [
  { from: 0, to: 1 },  // Schedar -> Caph
  { from: 0, to: 2 },  // Schedar -> Cassiopeia
  { from: 2, to: 3 },  // Cassiopeia -> Delta Cassiopeiae
  { from: 3, to: 4 },  // Delta Cassiopeiae -> Epsilon Cassiopeiae
];

// animate the background
function animate() {
  const time = performance.now(); // Use high-resolution timer
  // The sky is the background
  drawSky();

  // Draw constellations and stars
  for (let star of stars) {
    star.update();
  };
  drawConstellationLines(orionStars, orionConnections);
  drawConstellationLines(cassiopeiaStars, cassiopeiaConnections); 

  // Sea and sun should layer next
  drawSea();
  drawWaves();
  drawShimmer();
  drawSun();

  // Update all entities
  for (let shooting of shootingstars) {
    shooting.update();
  };
  for (let cloud of clouds) {
    cloud.update();
  };
  for (let bubble of bubbles) {
    bubble.update(time);
  };

  requestAnimFrame(animate);
}


// call the first animation
animate();
