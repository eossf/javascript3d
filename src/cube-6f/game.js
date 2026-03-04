import { vs, fs } from './data.js';

// canvas setup
const canvas = document.getElementById('game');
canvas.width = 800;
canvas.height = 800;
const ctx = canvas.getContext('2d');

const FPS = 30;

function clear() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function screen(p) {
    // center of screen plus scaled coordinates
    const scale = 600; // half of cube size (400x400)
    return {
        x: canvas.width / 2 + p.x * scale,
        y: canvas.height / 2 - p.y * scale,
    };
}

function project({ x, y, z }) {
    // simple perspective projection
    const f = 3; // focal distance
    return { x: x / (z + f), y: y / (z + f) };
}

function translateZ(p, dz) {
    return { x: p.x, y: p.y, z: p.z + dz };
}

function rotateX(p, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return {
        x: p.x,
        y: p.y * c - p.z * s,
        z: p.y * s + p.z * c,
    };
}

function rotateY(p, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return {
        x: p.x * c + p.z * s,
        y: p.y,
        z: -p.x * s + p.z * c,
    };
}

function rotateZ(p, a) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    return {
        x: p.x * c - p.y * s,
        y: p.x * s + p.y * c,
        z: p.z,
    };
}

let angle = 0;

function frame() {
    clear();

    // compute depth for each face to sort back-to-front
    const facesWithDepth = fs.map(f => {
        const pts = f.map(i => vs[i])
            .map(v => rotateX(v, angle))
            .map(v => rotateY(v, angle))
            .map(v => rotateZ(v, angle))
            .map(v => translateZ(v, 5));
        const avgZ = pts.reduce((sum, p) => sum + p.z, 0) / pts.length;
        return { indices: f, pts, avgZ };
    });

    facesWithDepth.sort((a, b) => a.avgZ - b.avgZ);

    for (const face of facesWithDepth) {
        const pts2d = face.pts
            .map(project)
            .map(screen);

        ctx.beginPath();
        ctx.moveTo(pts2d[0].x, pts2d[0].y);
        for (let k = 1; k < pts2d.length; ++k) {
            ctx.lineTo(pts2d[k].x, pts2d[k].y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(80,200,240,0.3)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.stroke();
    }

    angle += 0.01; // low uniform speed
    setTimeout(frame, 1000 / FPS);
}

frame();
