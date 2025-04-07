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
  gradient.addColorStop(0, '#0b0033');     // Night sky top
  gradient.addColorStop(0.3, '#2e1a47');   // Twilight
  gradient.addColorStop(0.6, '#ffb6c1');   // Pinkish
  gradient.addColorStop(1, '#87ceeb');     // Sky blue near beach
  bgCtx.fillStyle = gradient;
  bgCtx.fillRect(0, 0, width, height);
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
