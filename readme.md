# javascript3d

Small demo repository that renders a 3D models

## Cube

## Penguin

Key files
- `penguin/penguin.js` — exported vertex (`vs`) and face (`fs`) arrays for the model.
- `penguin/game.js` — ES module that imports the model and uses Three.js to render a rotating mesh.
- `penguin/index.html` — entry page (loads `game.js` as a module).

## Launch

```bash
micromamba create -n js3d python=3.13 -y
micromamba activate js3d
# then run the server from the penguin folder as above
python -m http.server 8000
```

If `micromamba` shell activation isn't initialized for your shell, run:

```powershell
micromamba shell init -s powershell
# restart shell
```

Troubleshooting
- If you still see CORS or module import errors, ensure you opened an `http://` URL (not `file://`) and check the browser console for details.
- The `game.js` module imports Three.js from a CDN; ensure the machine has internet access or replace the CDN import with a local Three.js build.

Enjoy — ask if you want a bundled `package.json` or a tiny Node static server instead.

Requirements
- A modern browser that supports ES modules.
- Internet access (Three.js is loaded from a CDN in `game.js`).

Serve and view locally

1. Change into the `penguin` folder and start a simple HTTP server:

```bash
cd penguin
python -m http.server 8000
```

2. Open your browser to:

```
http://localhost:8000
```


