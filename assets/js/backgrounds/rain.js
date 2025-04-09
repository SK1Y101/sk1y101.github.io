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
  this.timer = 4 + Math.floor(Math.random() * 3);
  this.opacity = 0.15 + Math.random() * 0.1;
};
LightningFlash.prototype.update = function () {
  if (Math.random() < 0.001 && this.timer <= 0) {
    this.trigger();
    this.forkX = Math.random() * width;
    this.forkY = Math.random() * height * 0.5;
  }
  if (this.timer > 0) {
    this.draw();
    drawLightningFork(this.forkX, this.forkY);
    this.timer--;
    this.opacity *= 0.5 + Math.random() * 0.2;
  }
};
LightningFlash.prototype.draw = function () {
  let grad = bgCtx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
  grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.1})`);
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, width, height);
};
function drawLightningFork(startX, startY, segments = 10) {
  let x = startX;
  let y = startY;
  bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  bgCtx.lineWidth = 2;
  bgCtx.beginPath();
  bgCtx.moveTo(x, y);
  for (let i = 0; i < segments; i++) {
    x += (Math.random() - 0.5) * 40; // horizontal variance
    y += 20 + Math.random() * 20;    // downward stroke
    bgCtx.lineTo(x, y);
    // chance to fork
    if (Math.random() < 0.2 && segments > 4) {
      drawLightningFork(x, y, Math.floor(segments / 2));
    }
  }
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
let entities = []; // your rain drops here
let reflections = []; // optional visual flares
let fogOffset = 0;

for (let i = 0; i < 5; i++) {
  reflections.push({
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    radius: 40 + Math.random() * 60,
    opacity: 0.03 + Math.random() * 0.05,
  });
}
for (var i = 0; i < 300; i++) { entities.push(new RainDrop()); }
for (var i = 0; i < 100; i++) { entities.push(new DripDrop()); }


// === ANIMATION LOOP ===
function animate() {
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
    pools.push(new RainPool(Math.random() * width, height - 15));
  }
  pools.forEach(p => p.update());
  pools = pools.filter(p => p.opacity > 0);

  // Reflections
  for (let ref of reflections) {
    ref.x += Math.sin(ref.x * 0.01) * 0.5; // Slight horizontal fluctuation
    ref.y += Math.cos(ref.y * 0.01) * 0.5; // Slight vertical fluctuation

    let gradient = bgCtx.createRadialGradient(ref.x, ref.y, 0, ref.x, ref.y, ref.radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${ref.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
    bgCtx.fillStyle = gradient;
    bgCtx.beginPath();
    bgCtx.arc(ref.x, ref.y, ref.radius, 0, 2 * Math.PI);
    bgCtx.fill();
  }


  requestAnimFrame(animate);
}

animate();