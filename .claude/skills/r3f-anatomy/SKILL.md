---
name: r3f-anatomy
description: >-
  Build REAL, motion-tracked 3D anatomy and X-ray muscle visualizations for FIT & FAITH
  fitness videos using react-three-fiber (Three.js in React) composited into Remotion.
  Use this skill whenever a video needs a 3D muscle/skeleton/organ shown in its correct
  anatomical position on the body, an X-ray / transparent-skin effect, a rotating 3D
  anatomy model, or any true 3D element tracked to the person's movement and the camera —
  NOT flat 2D PNG overlays, arrows, or circles. Trigger it any time the creator points to
  a muscle and wants it revealed in 3D, asks for "3D anatomy", "X-ray effect", "medical-style
  visualization", a GLTF/GLB model in a Reel, or generally "make the anatomy look real and
  three-dimensional." Also use it for any other 3D motion-graphics element in a Remotion video
  (3D text, product, logo spin). Read this skill BEFORE writing any Three.js or react-three-fiber code.
---

# R3F Anatomy — real 3D muscle visualization for FIT & FAITH videos

## Why this exists

The creator repeatedly asks for **real anatomical 3D muscle visualization** — the skin turning
transparent and the actual muscle (e.g. the four heads of the quadriceps) appearing *inside* the
body, tracking his movement and the camera, like a modern medical 3D app. Flat 2D PNGs warped onto
the leg get us most of the way but read as a "sticker." True depth, self-shadowing, rotation with
the limb, and a believable X-ray look require **3D**.

**react-three-fiber (R3F)** is a React renderer for Three.js: a `<mesh />` in JSX becomes
`new THREE.Mesh()`. Because our whole video stack is Remotion (React), R3F drops straight in via
**`@remotion/three`**, so a 3D scene becomes just another frame-accurate layer next to captions and
B-roll. That is the entire reason to reach for it here.

## When to use vs. when the 2D overlay is enough

- **Use 3D (this skill)** when: the muscle must rotate/foreshorten with the limb, you want real
  depth and an X-ray shell, you're showing a rotating standalone anatomy model, or the 2D warp
  looked flat/sticker-like and the creator rejected it.
- **The existing 2D pipeline is fine** when: the shot is near-static, the muscle is roughly
  frontal, and a warped PNG clipped to the segmentation mask reads convincingly (see
  `references/anatomy-pipeline.md` for how the 2D pipeline works and when to graduate to 3D).

Both share the same pose data, so you can start 2D and upgrade a single shot to 3D without redoing tracking.

## The pipeline (four stages)

Real motion-tracked 3D anatomy is four decoupled stages. Keep them decoupled — it's what makes the
work debuggable and re-runnable.

1. **Track** — run MediaPipe Pose over the footage and export per-frame landmark positions (hips,
   knees, shoulders, etc.) plus the segmentation mask to JSON. Use the bundled
   `scripts/export_pose_landmarks.py`. This is the same tracking the 2D pipeline uses; you're just
   saving the numbers instead of warping a PNG immediately.
2. **Model** — get a 3D muscle/skeleton mesh (GLTF/GLB). Load it in R3F with `useGLTF`. If no model
   is reachable (asset hosts are often blocked in this environment — see Gotchas), build the muscle
   from primitives/lathe geometry procedurally; a few smoothed capsules read surprisingly well as
   quad heads.
3. **Composite** — in a Remotion `<ThreeCanvas>`, draw the footage as the background (video texture),
   place the 3D model at the tracked screen position for the current frame, and give it the X-ray
   material (transparent, fresnel-lit, depth-aware). Everything is driven by
   `useCurrentFrame()`, never by realtime.
4. **Render** — render the Remotion composition to MP4, then encode for delivery (native source
   resolution, 2-pass, under the delivery size cap).

Read the reference for the stage you're working on — don't try to hold all three libraries in your
head at once:

- `references/r3f-core.md` — R3F fundamentals: the JSX↔Three mapping, meshes/geometry/materials,
  lights, camera, `useGLTF`, groups/transforms, and the handful of gotchas that bite first.
- `references/remotion-three.md` — the Remotion bridge: `<ThreeCanvas>`, frame-driven animation
  (why `useFrame` is banned and `useCurrentFrame` replaces it), `useVideoTexture` for the footage
  backplate, and render flags.
- `references/anatomy-pipeline.md` — the anatomy specifics: mapping 2D pose landmarks into the 3D
  scene, positioning/orienting the muscle along a bone, the X-ray shader material, the existing 2D
  fallback pipeline, and where the FIT & FAITH assets live.

## Setup

R3F versions are coupled to React. Match whatever the Remotion project already uses (Remotion 4 → React 18):

```bash
npm install three @types/three @react-three/fiber @remotion/three
```

Pin `@react-three/fiber@8` with `react@18`. If the project is on React 19, use `@react-three/fiber@9`.
Check `package.json` before installing rather than guessing.

## Brand consistency

Anatomy visuals still have to look like FIT & FAITH. Pull the palette from `docs/brand-colors.md`
(gold `#DABE76` family, slate `#48505A` family). Use gold for highlight/rim light and labels;
keep muscle tissue anatomically red but push the rim/fresnel toward gold so it sits in the brand.
Reuse the existing `theme.ts`, fonts, watermark, and caption components from the reel projects.

## Gotchas that will bite first

- **Realtime vs. frame time.** R3F's `useFrame` runs on a realtime clock and will make renders
  non-deterministic and stuttery. In Remotion, drive *everything* off `useCurrentFrame()` /
  `interpolate` / `spring`. This is the single most common mistake — details in
  `references/remotion-three.md`.
- **Blocked asset hosts.** Downloading GLTF models, HDRIs, and textures from the usual CDNs
  (HuggingFace, poly.pizza, sketchfab, most S3/azure) frequently fails here. GitHub releases,
  raw.githubusercontent, and pypi are usually reachable. Prefer a model you can fetch from a GitHub
  release, or generate geometry procedurally. Embed small textures as data URIs.
- **Coordinate systems.** MediaPipe gives normalized 2D image coords (x,y in 0..1, y down). Three.js
  is a right-handed 3D world with y up and an ortho/perspective camera. `references/anatomy-pipeline.md`
  gives the exact conversion so the muscle lands on the limb.
- **Version mismatch** between `three`, `@react-three/fiber`, and `@remotion/three` causes cryptic
  runtime errors. Align them to the project's React version first.
- **Headless rendering** needs the same Chromium/`headless_shell` + GL libs the reels already use
  (`libegl1 libgles2 libgl1`). WebGL runs under SwiftShader in that browser — it works but is slower
  than a GPU, so keep poly counts modest.

## Quick sanity check before a full render

Render one still at the reveal frame (`npx remotion still ...`) and eyeball whether the 3D muscle
lands on the limb and the X-ray material reads, exactly like we verify the 2D reels. Iterate on stills
(seconds) before committing to a multi-minute full render.
