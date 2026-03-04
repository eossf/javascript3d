<!-- Copilot instructions for the Starfield demo project -->
# Starfield — AI assistant guidance

This small single-page project renders an animated starfield to a canvas. The goal of this file is to give AI coding agents immediate, actionable knowledge to be productive here.

Short summary
- Single-page, no bundler: open `index.html` (file:// works) which includes `starsfield.js` via a plain `<script>` tag.
- Rendering happens in the `#stars` canvas; the main logic lives in `starsfield.js`.

How to run & debug locally
- No build step: open `index.html` in a browser or serve the folder with a static server.
- For quick checks use the browser DevTools: inspect the `canvas#stars` element and the Console.
- To change density or visuals, edit the `STAR_COUNT` constant and star properties inside `starsfield.js`.

Architecture & key files
- `index.html` — page structure and minimal CSS (container `#stage`, `canvas#stars`).
- `starsfield.js` — entire application: resize logic, star generation (`initStars()`), and `animate()` loop using `requestAnimationFrame`.
- Patterns to note:
  - Canvas sizing uses `devicePixelRatio` with `ctx.setTransform(dpr,0,0,dpr,0,0)`.
  - Stars are plain objects with `{x,y,r,z,twinkleOffset,speed}` and updated per-frame.
  - No module system is used; code runs as a normal script and boots itself at load.

Project-specific conventions
- Keep things simple: single-file JS, no package.json, no test harness present.
- Use small, obvious numeric constants at top of `starsfield.js` (`STAR_COUNT`) for quick experimentation.
- Visual/debug changes should be done directly in `starsfield.js` and reloaded in the browser.

Common edit patterns / examples
- Increase star density: change `STAR_COUNT` near top of `starsfield.js` and call `initStars()` if necessary.
- Adjust size/speed distribution: change the `rand(0.2,1.2)` depth mapping and ranges for `r` and `speed` in `initStars()`.
- Fix canvas sharpness issues: check `resize()` for `devicePixelRatio` handling and `ctx.setTransform`.

Integration points & external dependencies
- None. No external libraries or networked components.

What not to assume
- There is no build/test system; do not add tooling without explicit request.
- The app is intentionally tiny — prefer minimal, targeted changes rather than introducing heavy abstractions.

If you update this file
- Merge strategy: preserve any existing human-authored guidance and add or clarify runtime, debug, and file-level examples.

Next steps for humans or agents
- If asked to extend the project, suggest adding a small README or a `package.json` only if a build/test workflow is required.

Questions for the author
- Would you like a short `README.md` with run/debug commands, or should AI agents keep changes contained to `starsfield.js`?
