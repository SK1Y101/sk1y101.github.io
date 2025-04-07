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

function drawSun() {
  const sunX = width / 2;
  const sunY = height * 0.75;
  const sunRadius = 60;

  // Outer glow
  const sunGradient = bgCtx.createRadialGradient(sunX, sunY, 10, sunX, sunY, sunRadius * 2);
  sunGradient.addColorStop(0, 'rgba(255, 244, 150, 0.8)');
  sunGradient.addColorStop(1, 'rgba(255, 244, 150, 0)');

  bgCtx.fillStyle = sunGradient;
  bgCtx.beginPath();
  bgCtx.arc(sunX, sunY, sunRadius * 2, 0, Math.PI * 2);
  bgCtx.fill();

  // Actual sun core
  bgCtx.fillStyle = 'rgba(255, 244, 150, 1)';
  bgCtx.beginPath();
  bgCtx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  bgCtx.fill();
}


// set the canvase size
background.width = width;
background.height = height;

// create an array of animated entities
var entities = [];

// animate the background
function animate() {
  // fetch the requiredbackground colour
  drawSky();
  drawSun();

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
