export const vs = [
    {x: 1, y: 1, z: 1},
    {x:-1, y: 1, z: 1},
    {x:-1, y:-1, z: 1},
    {x: 1, y:-1, z: 1},

    {x: 1, y: 1, z:-1},
    {x:-1, y: 1, z:-1},
    {x:-1, y:-1, z:-1},
    {x: 1, y:-1, z:-1},
];

// each face is a list of vertex indices (quad) making one of the six cube faces
export const fs = [
    [0,1,2,3], // front
    [4,5,6,7], // back
    [0,1,5,4], // top
    [3,2,6,7], // bottom
    [0,3,7,4], // right
    [1,2,6,5], // left
];
