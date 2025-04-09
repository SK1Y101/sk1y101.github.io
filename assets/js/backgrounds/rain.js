// Let the browser handle the animation cycles
var requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Canvas setup
const background = document.getElementById("bgCanvas"),
  bgCtx = background.getContext("2d"),
  // width = window.innerWidth,
  width = 1920,
  // height = Math.max(400, document.body.offsetHeight);
  height = 1080;

background.width = width;
background.height = height;

// === ENTITIES ===


// Raindrop object
function RainDrop() {
  this.reset();
}
RainDrop.prototype.reset = function () {
  const xoffset = 0.2;
  const yoffset = 0.5;
  this.x = width * (Math.random() * (xoffset + 1) - xoffset);
  this.y = height * (Math.random() * (yoffset + 1) - yoffset);
  this.length = 20 + Math.random() * 20;
  this.speed = 4 + Math.random() * 4;
  this.opacity = 0.1 + Math.random() * 0.2;
};
RainDrop.prototype.update = function () {
  const windEffect = baseWind + gust;
  this.y += this.speed;
  this.x += this.speed * 0.3 + windEffect * 0.2;  // Stronger horizontal sway
  if (this.y > height) this.reset();
  this.draw();
};
RainDrop.prototype.draw = function () {
  bgCtx.beginPath();
  let angleOffset = gust * 0.3;
  bgCtx.moveTo(this.x, this.y);
  bgCtx.lineTo(this.x - 2 + angleOffset, this.y - this.length);
  bgCtx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
  bgCtx.lineWidth = 1;
  bgCtx.stroke();
};

// Slow drops
function DripDrop() {
  this.reset();
}
DripDrop.prototype.reset = function () {
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  this.length = 8 + Math.random() * 15;
  this.speed = 0.5 + Math.random() * 1.5;
  this.opacity = 0.1 + Math.random() * 0.15;
};

DripDrop.prototype.update = function () {
  this.y += this.speed;
  if (this.y > height) this.reset();
  this.draw();
};
DripDrop.prototype.draw = function () {
  bgCtx.beginPath();
  bgCtx.moveTo(this.x, this.y);
  bgCtx.lineTo(this.x, this.y - this.length);
  bgCtx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
  bgCtx.lineWidth = 1;
  bgCtx.stroke();
};

// Rain Pooling
function RainPool(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 0;
  this.opacity = 0.4;
}
RainPool.prototype.update = function () {
  this.radius += 0.2;
  this.opacity -= 0.002;
  this.draw();
};
RainPool.prototype.draw = function () {
  let maxRings = 3;
  for (let i = 0; i < maxRings; i++) {
    let ringRadius = this.radius * (0.6 + 0.2 * i);
    let ringOpacity = this.opacity * (1 - i / maxRings);
    let offset = Math.sin(i * 0.5 + this.radius * 0.1) * 3; // Slight distortion on each ring

    bgCtx.beginPath();
    bgCtx.ellipse(this.x + offset, this.y, ringRadius * 1.3, ringRadius * 0.7, 0, 0, Math.PI * 2);
    bgCtx.strokeStyle = `rgba(255, 255, 255, ${ringOpacity})`;
    bgCtx.lineWidth = 1;
    bgCtx.stroke();
  }
};

// Lightning Flash
function LightningFlash() {
  this.timer = 0;
  this.opacity = 0;
}
LightningFlash.prototype.trigger = function () {
  this.timer = 3 + Math.floor(Math.random() * 3); // flicker duration
  this.opacity = 1.0;

  this.hasBolt = Math.random() < 0.75;
  this.bolt = this.hasBolt ? generateLightningPath() : null;
};
LightningFlash.prototype.update = function () {
  if (Math.random() < 0.01 && this.timer <= 0) this.trigger();
  if (this.timer > 0) {
    this.drawGlow(); // soft flash
    if (this.hasBolt && this.bolt) drawLightningBolt(this.bolt);
    this.timer--;
  }
};
LightningFlash.prototype.drawGlow = function () {
  const grad = bgCtx.createLinearGradient(0, 0, 0, height);
  grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
  grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, width, height);
};
function generateLightningPath(segments = 10 + Math.floor(Math.random() * 5)) {
  const points = [];
  let x = width * 0.3 + Math.random() * width * 0.4;
  let y = -10;
  const maxHeight = height * 0.5 + Math.random() ** 2 * height * 0.4;
  const stepY = maxHeight / segments;

  for (let i = 0; i <= segments; i++) {
    x += (Math.random() - 0.5) * 80;
    y = i * stepY + Math.random() * 5;
    points.push({ x, y });
  }

  return points;
}
function drawLightningBolt(path) {
  bgCtx.beginPath();
  bgCtx.moveTo(path[0].x, path[0].y);

  for (let i = 1; i < path.length - 2; i++) {
    const cpX = (path[i].x + path[i + 1].x) / 2;
    const cpY = (path[i].y + path[i + 1].y) / 2;
    bgCtx.quadraticCurveTo(path[i].x, path[i].y, cpX, cpY);
  }

  const grad = bgCtx.createLinearGradient(
    path[0].x, path[0].y,
    path[path.length - 1].x, path[path.length - 1].y
  );
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)');
  grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.3)');
  grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');

  bgCtx.strokeStyle = grad;
  bgCtx.lineWidth = 2;
  bgCtx.stroke();

  // forks
  for (let i = 2; i < path.length - 2; i++) {
    if (Math.random() < 0.3) drawLightningFork(path[i], i);
  }
}
function drawLightningFork(start, index) {
  const segments = 3 + Math.floor(Math.random() * 3);
  let x = start.x;
  let y = start.y;

  bgCtx.beginPath();
  bgCtx.moveTo(x, y);

  for (let i = 0; i < segments; i++) {
    x += (Math.random() - 0.5) * 100;
    y += 10 + Math.random() * 30;
    bgCtx.lineTo(x, y);
  }

  bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  bgCtx.lineWidth = 1;
  bgCtx.stroke();
}

// Add some fog
var fogCanvas = document.createElement('canvas');
fogCanvas.width = width;
fogCanvas.height = height;
var fogCtx = fogCanvas.getContext('2d');

// Generate fog texture
for (let i = 0; i < 200; i++) {
  let x = Math.random() * width;
  let y = Math.random() * height;
  let radius = 100 + Math.random() * 100;
  let opacity = 0.01 + Math.random() * 0.03;

  fogCtx.beginPath();
  fogCtx.arc(x, y, radius, 0, 2 * Math.PI);
  fogCtx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  fogCtx.fill();
}

// === INIT ENTITIES ===
let lightning = new LightningFlash();

let pools = [];
let entities = [];
// let reflections = [];
let fogOffset = 0;

let windTime = 0;
let baseWind = 0;
let gust = 0;
let gustTarget = 0;
let gustSpeed = 0.02;

// for (let i = 0; i < 5; i++) {
//   reflections.push({
//     x: Math.random() * width,
//     y: Math.random() * height * 0.5,
//     radius: 40 + Math.random() * 60,
//     opacity: 0.03 + Math.random() * 0.05,
//   });
// }
for (var i = 0; i < 300; i++) { entities.push(new RainDrop()); }
for (var i = 0; i < 100; i++) { entities.push(new DripDrop()); }


// === ANIMATION LOOP ===
function animate() {
  // Wind simulation
  windTime += 0.01;
  baseWind = Math.sin(windTime * 0.3) * 1.5;
  if (Math.random() < 0.005) {
    gustTarget = (Math.random() - 0.5) * 4;  // gust can be -2 to +2
    gustSpeed = 0.01 + Math.random() * 0.02; // how quickly it ramps
  }
  gust += (gustTarget - gust) * gustSpeed;

  // background
  bgCtx.fillStyle = "#110E19";
  bgCtx.fillRect(0, 0, width, height);

  // Lightning glow
  lightning.update();

  // Color grading
  let tintGrad = bgCtx.createLinearGradient(0, 0, 0, height);
  tintGrad.addColorStop(0, "rgba(100, 80, 150, 0.1)");
  tintGrad.addColorStop(1, "rgba(30, 20, 60, 0.3)");
  bgCtx.fillRect(0, 0, width, height);

  // Fog
  fogOffset += 0.05;
  bgCtx.globalAlpha = 0.05;
  bgCtx.drawImage(fogCanvas, fogOffset % width - width, 0);
  bgCtx.drawImage(fogCanvas, fogOffset % width, 0);
  bgCtx.globalAlpha = 1.0;
  bgCtx.filter = 'none';  // Reset filter


  // Rain drops
  for (let entity of entities) entity.update();

  // Rain pooling
  if (Math.random() < 0.03) {
    pools.push(new RainPool(Math.random() * width, height - 10));
  }
  pools.forEach(p => p.update());
  pools = pools.filter(p => p.opacity > 0);

  // Reflections
  // for (let ref of reflections) {
  //   ref.x += Math.sin(ref.x * 0.01) * 0.5; // Slight horizontal fluctuation
  //   ref.y += Math.cos(ref.y * 0.01) * 0.5; // Slight vertical fluctuation

  //   let gradient = bgCtx.createRadialGradient(ref.x, ref.y, 0, ref.x, ref.y, ref.radius);
  //   gradient.addColorStop(0, `rgba(255, 255, 255, ${ref.opacity})`);
  //   gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
  //   bgCtx.fillStyle = gradient;
  //   bgCtx.beginPath();
  //   bgCtx.arc(ref.x, ref.y, ref.radius, 0, 2 * Math.PI);
  //   bgCtx.fill();
  // }


  requestAnimFrame(animate);
}

animate();