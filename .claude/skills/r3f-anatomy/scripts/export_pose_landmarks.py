#!/usr/bin/env python3
"""Export per-frame MediaPipe Pose landmarks (and optional segmentation) to JSON.

This is stage 1 of the r3f-anatomy pipeline: track once, then let either the 2D
warp compositor or the 3D react-three-fiber scene consume the same landmarks.json.

Usage:
    python export_pose_landmarks.py INPUT.mp4 OUT.json \
        --model /path/to/pose_landmarker.task \
        [--seg-dir seg_frames]      # also dump segmentation masks as PNGs
        [--fps 30]

Output JSON shape:
    {
      "width": 720, "height": 1280, "fps": 30, "frames": 1503,
      "landmarks": [
         { "f": 0,
           "pts": { "23": [px, py, visibility], "24": [...], "25": [...],
                    "26": [...], "27": [...], "28": [...], "11": [...], "12": [...] } },
         ...
      ]
    }
Pixel coordinates (origin top-left, y down). Convert to the Three.js world in the
3D scene with:  worldX = px - W/2 ;  worldY = -(py - H/2).

Landmark indices (MediaPipe Pose, 33-pt): 11/12 shoulders, 23/24 hips,
25/26 knees, 27/28 ankles. Left/right are the subject's own sides.

Environment: needs mediapipe + opencv. Headless GL libs (libegl1 libgles2 libgl1)
must be present. The .task model is fetchable from storage.googleapis.com when the
usual model CDNs are blocked.
"""
import argparse, json, os, sys
import numpy as np

WANT = [11, 12, 23, 24, 25, 26, 27, 28]  # shoulders, hips, knees, ankles

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("out")
    ap.add_argument("--model", default="pose_landmarker.task")
    ap.add_argument("--seg-dir", default=None, help="if set, write segmentation PNG per frame here")
    ap.add_argument("--fps", type=float, default=30.0)
    ap.add_argument("--ema", type=float, default=0.5,
                    help="EMA smoothing factor for landmarks (0=no smoothing, 0.5=default)")
    args = ap.parse_args()

    import cv2, mediapipe as mp
    from mediapipe.tasks import python
    from mediapipe.tasks.python import vision

    want_seg = args.seg_dir is not None
    if want_seg:
        os.makedirs(args.seg_dir, exist_ok=True)

    base = python.BaseOptions(model_asset_path=args.model)
    opts = vision.PoseLandmarkerOptions(
        base_options=base, running_mode=vision.RunningMode.VIDEO,
        num_poses=1, output_segmentation_masks=want_seg)
    lm = vision.PoseLandmarker.create_from_options(opts)

    cap = cv2.VideoCapture(args.input)
    W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    N = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = args.fps or cap.get(cv2.CAP_PROP_FPS) or 30.0

    ema = {}
    def smooth(k, v):
        if args.ema <= 0:
            return v
        ema[k] = v if k not in ema else (args.ema * v + (1 - args.ema) * ema[k])
        return ema[k]

    frames_out = []
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        ts_ms = int(idx * 1000 / fps)
        mpimg = mp.Image(image_format=mp.ImageFormat.SRGB,
                         data=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        res = lm.detect_for_video(mpimg, ts_ms)
        pts = {}
        if res.pose_landmarks:
            P = res.pose_landmarks[0]
            for i in WANT:
                v = np.array([P[i].x * W, P[i].y * H])
                v = smooth(i, v)
                pts[str(i)] = [round(float(v[0]), 2), round(float(v[1]), 2),
                               round(float(P[i].visibility), 3)]
            if want_seg and res.segmentation_masks:
                seg = np.squeeze(res.segmentation_masks[0].numpy_view())
                cv2.imwrite(os.path.join(args.seg_dir, f"{idx:05d}.png"),
                            (np.clip(seg, 0, 1) * 255).astype(np.uint8))
        frames_out.append({"f": idx, "pts": pts})
        idx += 1
        if idx % 150 == 0:
            print(f"frame {idx}/{N}", file=sys.stderr, flush=True)

    cap.release()
    json.dump({"width": W, "height": H, "fps": fps, "frames": idx,
               "landmarks": frames_out},
              open(args.out, "w"))
    print(f"DONE {args.out}  ({idx} frames, {W}x{H})")

if __name__ == "__main__":
    main()
