# javascript3d

Small demo repository that renders a 3D models

## Launch

```bash
micromamba create -n js3d python=3.13 -y
micromamba activate js3d
```

If `micromamba` shell activation isn't initialized for your shell, run:

```powershell
micromamba shell init -s powershell
# restart shell
```

Requirements
- A modern browser that supports ES modules.
- Internet access (Three.js is loaded from a CDN in `game.js`).

Serve and view locally

Exemple Penguin

1. Change into the `penguin` folder and start a simple HTTP server:

```bash
cd penguin
python -m http.server 8000
```

2. Open your browser to:

```
http://localhost:8000
```


