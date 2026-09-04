# Anatomy tracking pipeline — 2D→3D

This is the FIT & FAITH-specific glue: how pose tracking feeds a 3D muscle, the coordinate math,
the X-ray material, and the existing 2D pipeline you can fall back to or upgrade from.

## Stage 1 — pose tracking (shared by 2D and 3D)

`scripts/export_pose_landmarks.py` runs MediaPipe Pose (`pose_landmarker.task`) over the footage and
writes `landmarks.json`: for every frame, the pixel coordinates of the landmarks we care about (hips
23/24, knees 25/26, ankles 27/28, shoulders 11/12) plus their visibility, and optionally the
segmentation mask as a run-length or PNG sequence.

- Landmark indices follow MediaPipe Pose (33-point). Left/right are the subject's own sides, so on a
  mirrored selfie clip the on-screen left leg is landmark set {24,26,28}.
- **Smooth** the landmarks with an EMA (`x = 0.5*new + 0.5*prev`) before use — raw pose jitters and a
  jittering muscle looks fake. The 2D pipeline already does this; keep the same smoothing for 3D.
- Segmentation is what clips the muscle to the body silhouette so it doesn't spill onto the machine
  or background. Essential for the "inside the body" read.

Run it once per clip; both the 2D and 3D stages consume the same JSON.

## Stage 2 — map 2D landmarks into the 3D scene

MediaPipe gives image pixels (origin top-left, y down). Three.js with an **orthographic** camera set
up as in `remotion-three.md` (plane sized to composition pixels, camera at center) lets you place
objects in pixel-like world units. Conversion for a composition `W×H`:

```
worldX =  (px - W/2)
worldY = -(py - H/2)     // flip Y: image y-down → world y-up
worldZ =  0              // muscle sits at the backplate depth; nudge +Z to float above skin
```

Position a muscle head **along a bone** (hip→knee for the thigh):

```
hip   = (worldX, worldY) of landmark 24
knee  = (worldX, worldY) of landmark 26
mid   = (hip + knee) / 2                    // group position
len   = distance(hip, knee)                 // scale along the bone axis
angle = atan2(knee.y - hip.y, knee.x - hip.x)   // rotation-z of the group
```

Set the muscle `<group position={[mid.x, mid.y, z]} rotation-z={angle - Math.PI/2} scale={[width, len, depth]}>`
(subtract 90° because a capsule's long axis is Y by default). Depth (`z` and the `depth` scale) is
your free 3D dimension — this is what the 2D warp can't do. Give the near leg a slightly larger `z`
so it correctly sits in front.

**Foreshortening.** When the thigh points toward the camera (seated leg extension, squat), hip→knee
pixel distance shrinks. In 2D we compensated by scaling from hip *width* instead. In 3D you instead
rotate the muscle group in X toward the camera by an amount inferred from `len / restLen`, so it
recedes in depth like the real limb — the correct, non-hacky fix depth gives you.

## Stage 3 — the X-ray / transparent-skin material

The look: the muscle's silhouette rim glows (gold-tinted), the surface facing the camera is
see-through, and tissue reads anatomically red underneath. That's a **fresnel** term.

Fresnel with a stock material via `onBeforeCompile` (cheap, no full shader):

```js
material.onBeforeCompile = (shader) => {
  shader.uniforms.uRim = { value: new THREE.Color('#DABE76') }; // brand gold rim
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <output_fragment>', `
      float fres = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewPosition))), 2.5);
      vec3 rim = uRim * fres * 1.6;
      gl_FragColor.rgb += rim;
      gl_FragColor.a  *= mix(0.35, 1.0, fres);   // transparent facing, opaque at grazing
      #include <output_fragment>
    `);
};
```

Set on the material: `transparent`, `depthWrite=false`, `side=THREE.DoubleSide`, base color a deep
muscle red (`#8A1A1A`–`#C0432F`). Add a faint `emissive` red so it glows through slightly. Pulse the
opacity/emissive on the "burn" beat during reps with `interpolate(Math.sin(frame/…))`.

For a stronger medical look, `MeshPhysicalMaterial` with `transmission: 0.6, thickness: 20, roughness:
0.35` gives translucent sub-surface tissue; combine with the fresnel rim above.

**Reveal transition** (normal → x-ray → 3D muscle → back): fade the whole 3D layer's opacity and the
skin-darkening backplate tint in over ~0.5 s at the window start and out at the end, driven by a
`spring`/`interpolate` on `frame`. Keep anatomy on screen **only during the relevant beats**, not the
whole video.

## Stage 4 — labels

Keep the 3D scene for the body; render muscle-name labels as normal Remotion HTML/SVG on top (they
stay crisp and bilingual). The labeled quad panel (Rectus Femoris / Vastus Lateralis / Vastus
Medialis / Vastus Intermedius, with Arabic) already exists in the reel `Graphics.tsx` — reuse it.

## The existing 2D pipeline (fallback / starting point)

Before 3D, the working approach (see the reel projects in scratchpad) is:

1. Build a semi-realistic muscle PNG (RGBA) with PIL — bellies as blurred ellipses, fiber striations,
   feathered thigh-silhouette alpha. (`make_quad_asset.py` produced `quad_right.png` / `quad_left.png`.)
2. Per frame, `cv2.getAffineTransform` maps the PNG onto hip→knee→perpendicular, `warpAffine` into
   place, multiply alpha by the segmentation mask, and alpha-composite. Add a darkened/desaturated
   "transparent skin" treatment under the muscle region and a dilated rim glow. (`process_muscle*.py`.)
3. Two modes: a steady gold-red "reveal" and a redder pulsing "burn" during reps.

This reads well for near-frontal, near-static shots and is fast (no WebGL). **Graduate a shot to 3D**
when the limb rotates/foreshortens enough that a flat warp looks like a sticker, or when the creator
explicitly wants real 3D. The pose JSON is identical, so upgrading is localized to the composite step.

## Assets & environment notes

- Pose model `pose_landmarker.task`, muscle PNGs, and the reel Remotion projects live in the session
  scratchpad from prior work; the brand palette is `docs/brand-colors.md` in the repo.
- Headless rendering needs `libegl1 libgles2 libgl1 libglib2.0-0` (already used by the reels).
- Model/texture CDNs are often blocked; GitHub releases + raw.githubusercontent + pypi are reachable.
  Prefer procedural geometry or a GitHub-release-hosted `.glb`; embed small textures as data URIs.
