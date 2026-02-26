// Starfield (100 stars) — draws animated stars into the #stars canvas
const STAR_COUNT = 100;

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width = 0;
let height = 0;
let stars = [];

function rand(min, max){ return Math.random() * (max - min) + min }

function resize(){
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  width = canvas.clientWidth || window.innerWidth;
  height = canvas.clientHeight || window.innerHeight;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function initStars(){
  stars = [];
  for(let i=0;i<STAR_COUNT;i++){
    // z is depth (0.2..1.2) controlling size and speed
    const z = rand(0.2,1.2);
    stars.push({
      x: rand(0, width),
      y: rand(0, height),
      r: rand(0.5, 1.8) * (1 / z),
      z,
      twinkleOffset: Math.random()*Math.PI*2,
      speed: rand(0.02, 0.6) * (1/z)
    });
  }
}

let t0 = performance.now();
function animate(t){
  const dt = (t - t0) / 1000;
  t0 = t;

  ctx.clearRect(0,0,width,height);

  for(const s of stars){
    s.y += s.speed * dt * 60; // scale movement
    if(s.y > height + 5) s.y = -5;

    const a = 0.5 + 0.5 * Math.sin((t/500) + s.twinkleOffset);
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
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