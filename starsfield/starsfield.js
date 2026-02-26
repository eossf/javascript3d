// Starfield (100 stars) — draws animated stars into the #stars canvas
const STAR_COUNT = 10500;
// run duration in milliseconds (10s)
const STAR_DURATION_MS = 15000;
const SPEED_MIN = 0.8;
const SPEED_MAX = 1;

// slow rotation in radians per second
const ROTATION_SPEED = 0.2;
let rotationAngle = 0;

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;
let stars = [];

function rand(min, max){ return Math.random() * (max - min) + min }

function resize(){
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  width = canvas.clientWidth || window.innerWidth;
  height = canvas.clientHeight+500 || window.innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function createStar(){
  const z = rand(0.2, 1.2);
  const cx = width / 2;
  const cy = height / 2;
  // place stars in a circle (radius = half diagonal) around canvas center
  const maxRadius = Math.hypot(width, height) / 2;
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * maxRadius;
  return {
    x: cx + Math.cos(angle) * distance,
    y: cy + Math.sin(angle) * distance,
    r: rand(0.5, 0.5) * (1 / z),
    z,
    twinkleOffset: Math.random()*Math.PI*2,
    color: `${Math.floor(rand(100,255))},${Math.floor(rand(100,255))},${Math.floor(rand(100,255))}`,
    speed: rand(SPEED_MIN, SPEED_MAX) * (1/z)
  };
}

function initStars(){
  stars = [];
  for(let i=0;i<STAR_COUNT;i++){
    stars.push(createStar());
  }
}

let t0 = performance.now();
let startTime = null;
function animate(t){
  if (startTime === null) startTime = t;
  const dt = (t - t0) / 1000;
  t0 = t;

  ctx.clearRect(0,0,width,height);

  // rotate around the center slowly
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.rotate(rotationAngle);

  for(const s of stars){
    s.y += s.speed * dt * 60; // scale movement
    if(s.y > height + 5) s.y = -5;

    // regenerate star if it drifts too far from center
    const cx = width / 2;
    const cy = height / 2;
    const d = Math.hypot(s.x - cx, s.y - cy);
    const maxDist = Math.hypot(width, height) / 2 + 50; // slight buffer
    if (d > maxDist) {
      Object.assign(s, createStar());
    }

    const a = 0.5 + 0.5 * Math.sin((t/500) + s.twinkleOffset);
    ctx.beginPath();
    ctx.fillStyle = `rgba(${s.color},${a})`;
    // draw relative to rotated origin (center)
    ctx.arc(s.x - (width/2), s.y - (height/2), s.r, 0, Math.PI*2);
    ctx.fill();
  }

  ctx.restore();

  // update rotation
  rotationAngle += ROTATION_SPEED * dt;

  // continue animating only while under the duration limit
  if (t - startTime < STAR_DURATION_MS) {
    requestAnimationFrame(animate);
  }
}

function onResize(){
  resize();
  initStars();
}

window.addEventListener('resize', onResize);

// ensure canvas fills stage
function ensureSize(){
  const stage = document.getElementById('stage');
  if(stage){
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }
}

ensureSize();
resize();
initStars();
requestAnimationFrame(animate);

// export nothing; this module just kicks off the starfield