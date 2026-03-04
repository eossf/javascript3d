import { vs, fs } from './data.js';

const BACKGROUND = "#101010"
const FOREGROUND = "#50FF50"

console.log(game)

const FPS = 20;
game.width = 600
game.height = 600
const ctx = game.getContext("2d")
console.log(ctx)

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, game.width, game.height)
}

function point({x, y}) {
    const s = 20;
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - s/2, y - s/2, s, s)
}

function line(p1, p2) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = FOREGROUND
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function screen(p) {
    // -1..1 => 0..2 => 0..1 => 0..w
    return {
        x: (p.x + 1)/2*game.width,
        y: (1 - (p.y + 1)/2)*game.height,
    }
}

function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
    }
}


function translate_z({x, y, z}, dz) {
    return {x, y, z: z + dz};
}

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c-z*s,
        y,
        z: x*s+z*c,
    };
}

// rotation around Z axis
function rotate_xy({x,y,z}, a) {
    const cosa = Math.cos(a)
    const sina = Math.sin(a)
    return {x: x*cosa - y*sina, y: x*sina + y*cosa, z}
}

let dz = 0;
let max_dz = 5;
let angle = 0;

function frame() {
    const dt = 1/FPS;
    dz = 0.75 +max_dz * (Math.sin(angle)+1)/2;
    angle += Math.PI*dt;
    clear()
    // for (const v of vs) {
    //     point(screen(project(translate_z(rotate_xz(v, angle), dz))))
    // }
    for (const f of fs) {
        for (let i = 0; i < f.length; ++i) {
            const a = vs[f[i]];
            const b = vs[f[(i+1)%f.length]];
            rya=rotate_xz(a, angle)
            rza=rotate_xy(rya, angle/2)
            ryb=rotate_xz(b, angle)
            rzb=rotate_xy(ryb, angle/2)

            // draw lines from matrices
            line(screen(project(translate_z(rza, dz))),
                 screen(project(translate_z(rzb, dz))))
        }
    }
    setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS);
