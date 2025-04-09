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
  width = window.innerWidth,
  height = Math.max(400, document.body.offsetHeight);

background.width = width;
background.height = height;

// === ENTITIES ===


// Raindrop object
function RainDrop() {
  this.reset();
}
RainDrop.prototype.reset = function () {
  const xoffset = 0.2
  const yoffset = 0.5
  this.x = width * (Math.random() * (xoffset + 1) - xoffset);
  this.y = height * (Math.random() * (yoffset + 1) - yoffset);
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
  if (Math.random() < 0.001 && this.timer <= 0) this.trigger();
  if (this.timer > 0) {
    this.draw();
    this.timer--;
    this.opacity *= 0.5;
  }
};
LightningFlash.prototype.draw = function () {
  let grad = bgCtx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
  grad.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.1})`);
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, width, height);
};

// Candle Flicker
function CandleFlicker(x, y) {
  this.x = x;
  this.y = y;
  this.baseRadius = 40;
  this.flicker = 0;
}
CandleFlicker.prototype.update = function () {
  this.flicker = (Math.random() - 0.5) * 5;
  this.draw();
};
CandleFlicker.prototype.draw = function () {
  let radius = this.baseRadius + this.flicker;
  let gradient = bgCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, radius);
  gradient.addColorStop(0, "rgba(255, 220, 180, 0.1)");
  gradient.addColorStop(1, "rgba(255, 220, 180, 0)");
  bgCtx.fillStyle = gradient;
  bgCtx.beginPath();
  bgCtx.arc(this.x, this.y, radius, 0, Math.PI * 2);
  bgCtx.fill();
};

// Tree Shadows
function TreeShadow(x, y, scale) {
  this.x = x;
  this.y = y;
  this.scale = scale;
  this.offset = 0;
}
TreeShadow.prototype.update = function () {
  this.offset += 0.002 + Math.random() * 0.001;
  this.draw();
};
TreeShadow.prototype.draw = function () {
  let widthFactor = 50 * this.scale;
  let heightFactor = 150 * this.scale;
  let x = this.x + Math.sin(this.offset) * 10;
  bgCtx.beginPath();
  bgCtx.ellipse(x, this.y, widthFactor, heightFactor, 0, 0, Math.PI * 2);
  bgCtx.fillStyle = "rgba(0, 0, 0, 0.08)";
  bgCtx.fill();
};

// Rain Pooling
function RainPool(x, y) {
  this.x = x;
  this.y = y;
  this.radius = 0;
  this.opacity = 0.3;
}
RainPool.prototype.update = function () {
  this.radius += 0.2;
  this.opacity -= 0.003;
  this.draw();
};
RainPool.prototype.draw = function () {
  bgCtx.beginPath();
  bgCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  bgCtx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
  bgCtx.fill();
};

// Book and Candle Silhouette
function drawSilhouette() {
  // Book
  bgCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
  bgCtx.fillRect(width * 0.15, height - 120, 60, 80);

  // Candle
  bgCtx.fillRect(width * 0.22, height - 100, 20, 40);
  bgCtx.beginPath();
  bgCtx.arc(width * 0.232, height - 100, 5, 0, Math.PI * 2);
  bgCtx.fill();
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
let candle = new CandleFlicker(width * 0.25, height - 80);
let treeShadows = [
  new TreeShadow(width * 0.3, height * 0.6, 1),
  new TreeShadow(width * 0.6, height * 0.65, 0.8),
  new TreeShadow(width * 0.8, height * 0.7, 1.2)
];
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
  bgCtx.fillStyle = tintGrad;
  bgCtx.fillRect(0, 0, width, height);

  // Tree shadows
  treeShadows.forEach(shadow => shadow.update());

  // Fog
  fogOffset += 0.05;
  bgCtx.globalAlpha = 0.1;
  bgCtx.drawImage(fogCanvas, fogOffset % width - width, 0);
  bgCtx.drawImage(fogCanvas, fogOffset % width, 0);
  bgCtx.globalAlpha = 1.0;

  // Rain drops
  for (let entity of entities) entity.update();

  // Rain pooling
  if (Math.random() < 0.03) {
    pools.push(new RainPool(Math.random() * width, height - 10));
  }
  pools.forEach(p => p.update());
  pools = pools.filter(p => p.opacity > 0);

  // Reflections
  reflections.forEach(ref => {
    let gradient = bgCtx.createRadialGradient(ref.x, ref.y, 0, ref.x, ref.y, ref.radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${ref.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
    bgCtx.fillStyle = gradient;
    bgCtx.beginPath();
    bgCtx.arc(ref.x, ref.y, ref.radius, 0, 2 * Math.PI);
    bgCtx.fill();
  });

  // Candle flicker
  candle.update();

  // Silhouettes
  drawSilhouette();

  requestAnimFrame(animate);
}

animate();