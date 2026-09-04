# react-three-fiber core

R3F is **a React renderer for Three.js**. You write JSX; R3F reconstructs the Three.js object graph.
Everything Three.js exports is usable — R3F "merely expresses Three.js in JSX," so new Three.js
features are available immediately with no wrapper. It has no meaningful overhead and actually scales
better than hand-written Three.js because it rides React's scheduler.

## The one rule that explains all the JSX

A JSX tag maps to a Three.js constructor by name (camelCased):

- `<mesh />` → `new THREE.Mesh()`
- `<boxGeometry />` → `new THREE.BoxGeometry()`
- `<meshStandardMaterial />` → `new THREE.MeshStandardMaterial()`
- `<pointLight />` → `new THREE.PointLight()`

Two attribute conventions follow from that:

- **`args`** is the constructor's argument list: `<boxGeometry args={[1, 1, 1]} />` is
  `new THREE.BoxGeometry(1, 1, 1)`. `args` is set once at construction; changing it rebuilds the object.
- **Any other prop sets a property** on the instance, and you can reach into nested props with dashes:
  `position={[0, 1, 0]}` sets `.position`, and `position-y={1}` sets `.position.y`. Same for
  `rotation`, `scale`, `material-opacity`, `material-color`, etc.

Nesting mirrors `.add()` / assignment: geometry and material placed inside a `<mesh>` become its
`.geometry` and `.material`.

```jsx
<mesh ref={meshRef} scale={active ? 1.5 : 1} position={[0, 0, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
</mesh>
```

Because it's React, meshes are reusable components, react to state, and take event handlers
(`onPointerOver`, `onClick`) — though for a rendered video we drive state from the frame, not pointer
events.

## Scene essentials

A useful scene needs a camera, light, and something to look at.

- **Camera.** R3F's `<Canvas>` creates a default `PerspectiveCamera`. Override via the `camera` prop
  (`<Canvas camera={{ fov: 40, position: [0, 0, 5] }}>`). For compositing a model onto flat footage,
  an **orthographic** camera is often easier because screen-space math stays linear (no perspective
  divide) — see `anatomy-pipeline.md`.
- **Lights.** `MeshStandardMaterial`/`MeshPhysicalMaterial` need light. Start with an
  `<ambientLight intensity={0.6} />` plus one or two `<directionalLight>`/`<pointLight>`. For an
  X-ray look, rim/fresnel lighting matters more than key light.
- **Groups & transforms.** Wrap related meshes in `<group>` and transform the group; this is how you
  move/rotate a whole muscle (its heads as children) as one unit along a bone.

## Loading 3D models (GLTF/GLB)

Use the loader hook from drei-less core or `@react-three/drei`'s `useGLTF`:

```jsx
import { useGLTF } from '@react-three/drei';
function Quad(props) {
  const { scene } = useGLTF('/models/quadriceps.glb'); // staticFile() in Remotion
  return <primitive object={scene} {...props} />;
}
useGLTF.preload('/models/quadriceps.glb');
```

- `<primitive object={...} />` drops an existing Three.js object into the tree — the way to place a
  loaded model or a procedurally built `THREE.Group`.
- If `@react-three/drei` isn't installed, use `GLTFLoader` from `three/examples/jsm/loaders/GLTFLoader`
  directly and `suspend` on the promise, or load once in Node and pass the object down.
- **Asset hosts are often blocked here.** If you can't fetch a `.glb`, build the muscle from
  primitives instead (next section).

## Procedural muscle geometry (when no model is reachable)

A convincing muscle belly is a tapered, slightly curved capsule. Good building blocks:

- `CapsuleGeometry(radius, length, capSegments, radialSegments)` — one muscle head.
- `LatheGeometry(points)` — revolve a silhouette profile for a more organic teardrop belly
  (e.g. vastus medialis).
- `TubeGeometry(curve, ...)` along a `CatmullRomCurve3` — a head that follows a curved path.

Compose three-to-four of these in a `<group>`, scale each non-uniformly to get the fusiform shape,
and give them the X-ray material. Add faint fiber striations with a normal/emissive detail or a few
thin `TubeGeometry` lines. This is the reliable path in a locked-down environment and still reads as
real 3D because it has genuine depth and self-occlusion.

## Materials for anatomy

- **`MeshStandardMaterial`** — physically based; good default for lit muscle tissue.
- **`MeshPhysicalMaterial`** — adds transmission/clearcoat; `transmission` + `thickness` gives a
  translucent, wet, sub-surface look that sells "inside the body."
- **X-ray / transparent-skin** — a custom fresnel material: opaque at grazing angles (the silhouette
  rim glows), transparent facing the camera, so you see through the shell to the muscle. The exact
  `onBeforeCompile`/`ShaderMaterial` recipe is in `anatomy-pipeline.md`.

Set `transparent`, `opacity`, `depthWrite={false}` for see-through layering, and `side={THREE.DoubleSide}`
so the inside of the shell is visible.

## Animation

In a normal R3F app you animate in `useFrame((state, delta) => …)`, which ticks on a realtime clock.
**Do not use `useFrame` in Remotion** — it makes renders non-deterministic. Drive transforms from
`useCurrentFrame()` and Remotion's `interpolate`/`spring` instead. Full explanation and the correct
pattern are in `remotion-three.md`.

## Minimal standalone R3F component (reference shape)

```jsx
import { Canvas } from '@react-three/fiber';

export default function Scene() {
  return (
    <Canvas camera={{ fov: 40, position: [0, 0, 6] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.2} />
      <mesh rotation={[0.3, 0.4, 0]}>
        <capsuleGeometry args={[0.5, 1.6, 8, 24]} />
        <meshStandardMaterial color="#b03028" />
      </mesh>
    </Canvas>
  );
}
```

In Remotion you swap `<Canvas>` for `<ThreeCanvas>` and the realtime loop for frame-driven props —
see `remotion-three.md`.
