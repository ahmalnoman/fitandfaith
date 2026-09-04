# Remotion + react-three-fiber bridge (`@remotion/three`)

`@remotion/three` lets a react-three-fiber scene render as a deterministic, frame-accurate Remotion
layer. It gives you `<ThreeCanvas>` (a Remotion-aware replacement for R3F's `<Canvas>`) and
`useVideoTexture` (maps footage onto a 3D surface, synced to the timeline).

## Golden rule: frame time, not realtime

Remotion renders each frame in isolation, sometimes out of order, across parallel workers. Anything
based on a realtime clock (`useFrame`, `Date.now()`, `requestAnimationFrame`, `THREE.Clock`) produces
stutter or nondeterministic output.

**Drive every transform from `useCurrentFrame()`** and Remotion's `interpolate`/`spring`.

```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const Muscle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame: frame - 30, fps, config: { damping: 200 } }); // 0→1 reveal
  const spin = interpolate(frame, [0, 300], [0, Math.PI * 2]);                 // one rotation
  return (
    <mesh rotation-y={spin} scale={reveal}>
      <capsuleGeometry args={[0.5, 1.6, 8, 24]} />
      <meshStandardMaterial color="#b03028" transparent opacity={reveal} />
    </mesh>
  );
};
```

If you truly need per-frame Three.js logic, use `@remotion/three`'s frame-aware access rather than
`useFrame`. In practice `useCurrentFrame()` + `interpolate`/`spring` covers everything for anatomy shots.

## `<ThreeCanvas>`

```tsx
import { ThreeCanvas } from '@remotion/three';
import { useVideoConfig, AbsoluteFill } from 'remotion';

export const Scene3D: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill>
      <ThreeCanvas
        width={width}
        height={height}
        orthographic                       // linear screen-space; easier to place on footage
        camera={{ position: [0, 0, 10], zoom: 1, near: -1000, far: 1000 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        style={{ backgroundColor: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 8]} intensity={1.1} />
        {/* footage backplate + tracked muscle go here */}
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
```

Notes:
- Pass `width`/`height` explicitly (from `useVideoConfig`) — `ThreeCanvas` is not auto-sized like R3F's.
- `alpha: true` + transparent background lets you stack the 3D layer over other Remotion layers (or put
  the footage inside as a texture — see below).
- `preserveDrawingBuffer: true` avoids blank frames in headless captures.
- `orthographic` with a wide near/far and `zoom` makes 1 world unit ≈ a fixed number of pixels, so
  placing a model at a tracked screen coordinate is simple arithmetic (see `anatomy-pipeline.md`).

## Footage as a 3D backplate: `useVideoTexture`

Two ways to combine footage with the model:

1. **Footage as a normal Remotion layer, 3D on top** — put `<OffthreadVideo>` in a sibling layer and
   render `<ThreeCanvas>` above it with a transparent background. Simplest; the muscle floats over the
   video. Good when the muscle sits *on* the skin (X-ray shell in front).

2. **Footage inside the 3D scene via `useVideoTexture`** — map the video onto a full-screen plane at
   the back of the scene, so the model can be occluded by / interact with it in depth. Needed for a
   true "muscle behind translucent skin" where parts of the model should be hidden by the body.

```tsx
import { useVideoTexture, ThreeCanvas } from '@remotion/three';
import { staticFile } from 'remotion';

const Backplate: React.FC = () => {
  const texture = useVideoTexture(staticFile('base.mp4'));
  return texture ? (
    <mesh position={[0, 0, -50]}>
      <planeGeometry args={[720, 1280]} />   {/* match composition px in ortho world units */}
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  ) : null;
};
```

`useVideoTexture` returns `null` until the frame is ready — always guard it. It stays in sync with the
Remotion timeline automatically; do not seek it yourself.

## Rendering

- Register the composition normally in `Root.tsx`; the `<ThreeCanvas>` layer is invisible to the
  registration.
- Render with the same headless browser the reels use:
  `npx remotion render src/index.ts Reel out/x.mp4 --codec h264 --crf 15 --browser-executable=<headless_shell> --concurrency=4`.
- WebGL in that browser runs on **SwiftShader** (software). It works but is slower than the 2D reels,
  and high `concurrency` multiplies memory. If you hit crashes/timeouts, lower `--concurrency`, reduce
  poly counts, and drop antialias to FXAA or a post pass.
- Verify with `npx remotion still ...` at the reveal frame before the full render — same workflow as
  the 2D reels.

## Common failures

- **Black / empty 3D layer** — usually no light, camera facing the wrong way, or `preserveDrawingBuffer`
  off. Add lights, check camera position/zoom, confirm the mesh is within the frustum.
- **Stutter or "jumpy" animation** — a realtime clock leaked in (`useFrame`, `Clock`, `Date.now`).
  Replace with `useCurrentFrame()`.
- **Model invisible behind footage** — z-ordering; move the backplate further back (`-50`/`-100`) and
  keep the model near `z=0`, or the transparent material has `depthWrite` wrong.
- **Version errors** — align `three`, `@react-three/fiber`, `@remotion/three` to the project's React
  version before anything else.
