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

let fogOffset = 0;



// set the canvase size
background.width = width;
background.height = height;

// draw the night sky
bgCtx.fillStyle = "#110E19";
bgCtx.fillRect(0, 0, width, height);

// Lightning
var lightningTimer = 0;
var lightningOpacity = 0;

// create an array of animated entities
var entities = [];
var reflections = [];
for (let i = 0; i < 5; i++) { reflections.push({
    x: Math.random() * width,
    y: Math.random() * height * 0.5,
    radius: 40 + Math.random() * 60,
    opacity: 0.03 + Math.random() * 0.05,
  });
}
for (var i = 0; i < 300; i++) { entities.push(new RainDrop()); }
for (var i = 0; i < 100; i++) { entities.push(new DripDrop()); }

// animate the background
function animate() {
  // fetch the requiredbackground colour
  bgCtx.fillStyle = "#110E19";
  bgCtx.fillRect(0, 0, width, height);
  bgCtx.fillStyle = '#ffffff';
  bgCtx.strokeStyle = '#ffffff';

  // Random lightning strike
  if (Math.random() < 0.002 && lightningTimer <= 0) {
    lightningTimer = 5 + Math.floor(Math.random() * 5);
    lightningOpacity = 0.6 + Math.random() * 0.3;
  }

  if (lightningTimer > 0) {
    bgCtx.fillStyle = `rgba(255, 255, 255, ${lightningOpacity})`;
    bgCtx.fillRect(0, 0, width, height);
    lightningTimer--;
    lightningOpacity *= 0.6; // fade quickly
  }


  // update all entities
  for (let entity of entities) { entity.update(); };

  // Apply fog overlay with slow movement
  fogOffset += 0.05;
  bgCtx.globalAlpha = 0.1;
  bgCtx.drawImage(fogCanvas, fogOffset % width - width, 0);
  bgCtx.drawImage(fogCanvas, fogOffset % width, 0);
  bgCtx.globalAlpha = 1.0;

  // Soft glowing light reflections
  reflections.forEach(ref => {
    let gradient = bgCtx.createRadialGradient(ref.x, ref.y, 0, ref.x, ref.y, ref.radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${ref.opacity})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

    bgCtx.fillStyle = gradient;
    bgCtx.beginPath();
    bgCtx.arc(ref.x, ref.y, ref.radius, 0, 2 * Math.PI);
    bgCtx.fill();
  });

  //schedule the next animation frame
  requestAnimFrame(animate);
}

// call the first animation
animate();
