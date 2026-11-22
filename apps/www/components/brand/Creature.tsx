"use client";

/**
 * <Creature> — the canonical Echo as a lit, glossy object, with the composed
 * behaviour vocabulary from the first Echo's EchoGlossy: breathe,
 * wander + sway, look (tracks the cursor, glances around when idle), blink,
 * and rest (sleepy, drooped lids). Small amplitudes, slow springs — a
 * companion, not a bouncy mascot. The silhouette, eye shapes and colours never
 * change.
 *
 * The motion is ./rig: built once, so a change of mood carries on from
 * wherever Echo is — lids droop over most of a second and the breath slows
 * into rest; waking is a perk and a double blink (a mood change used
 * to snap Echo back to centre).
 *
 * Differences from the original, all deliberate:
 * - gradient ids come from useId. The original hardcoded `id="echoBody"`, so
 *   two creatures on one page shared (or lost) each other's gloss;
 * - reduced motion is one composed frame: eyes at their mood, nothing looping,
 *   no cursor chase;
 * - it is decorative by default (aria-hidden). Where it carries meaning — the
 *   device screen's state — the text beside it says so;
 * - once the script runs it's painted on a canvas (creature-canvas.ts), from
 *   its own SVG: the rig moves the SVG's groups, now hidden, and the canvas
 *   paints them, in the colours the page's CSS gives them. A moved SVG group
 *   made the browser rebuild the whole page's layers every frame Echo
 *   breathed; a painted canvas costs the page nothing past its own pixels.
 *   Before the script, and without a canvas, the SVG is what you see.
 */
import { useEffect, useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { RELIGHT_EVENT } from "@/components/home/journey/wear";
import { useSiteSeed } from "@/components/site/theme-store";
import { creatureCanvas, type CreatureCanvas } from "./creature-canvas";
import { EYE_CY, VIEWBOX } from "./paths";
import { createRig, stillPose, type Rig, type RigMood } from "./rig";

/** Sway / breath pivot, near the body's low centre. */
const ORIGIN = [129, 38] as const;
const EYE = [129, EYE_CY] as const;
/** How far past its box the canvas reaches, as a share of its size: the widest wander, lean and jolt, a hop, and a drawn look's line. */
const REACH = 0.15;

export type Mood = "watching" | "resting";

function moodFor(mood: Mood, interactive: boolean, breathe: boolean): RigMood {
  const resting = mood === "resting";
  // Logo mode: facing forward, still but for the breath.
  if (!interactive) {
    return {
      drift: 0,
      sway: 0,
      pace: 1,
      lean: 0,
      breath: breathe ? (resting ? 0.05 : 0.03) : 0,
      breathPeriod: resting ? 12 : 8,
      lids: resting ? 0.52 : 1,
      look: "rest",
      blink: null,
    };
  }
  return resting
    ? {
        drift: 1,
        sway: 0.7,
        pace: 0.55,
        lean: 0.8,
        breath: breathe ? 0.05 : 0,
        breathPeriod: 12,
        lids: 0.52,
        // Resting eyes are lazy: they don't chase, they settle a little low.
        look: "rest",
        rest: [0, 0.3],
        blink: [4, 8],
      }
    : {
        drift: 2.2,
        sway: 1.8,
        pace: 1,
        lean: 2,
        breath: breathe ? 0.03 : 0,
        breathPeriod: 8,
        lids: 1,
        look: "follow",
        blink: [2.6, 6.5],
      };
}

export function Creature({
  size = 220,
  mood = "watching",
  interactive = true,
  breathe = true,
  gloss = true,
  paused = false,
  className,
}: {
  size?: number;
  mood?: Mood;
  /** false = logo mode: static, facing forward, no behaviours. */
  interactive?: boolean;
  breathe?: boolean;
  gloss?: boolean;
  /** Out of sight (the device's screen says Echo is away): nothing is painted till it's back. */
  paused?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const wrap = useRef<HTMLDivElement>(null);
  const drift = useRef<SVGGElement>(null);
  const breath = useRef<SVGGElement>(null);
  const lids = useRef<SVGGElement>(null);
  const pupils = useRef<SVGGElement>(null);
  const rig = useRef<Rig | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const painter = useRef<CreatureCanvas | null>(null);
  const pausedNow = useRef(paused);
  const [seed] = useSiteSeed();

  // The rig lives as long as the creature does.
  useEffect(
    () => () => {
      rig.current?.destroy();
      rig.current = null;
    },
    [],
  );

  // The first mood builds it; every later one is a new direction, never a restart.
  useEffect(() => {
    const next = moodFor(mood, interactive, breathe);
    if (rig.current) {
      rig.current.set(next);
      return;
    }
    const els = { wrap: wrap.current, drift: drift.current, breath: breath.current, lids: lids.current, pupils: pupils.current };
    if (!els.wrap || !els.drift || !els.breath || !els.lids || !els.pupils) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      stillPose({ drift: els.drift, breath: els.breath, lids: els.lids, pupils: els.pupils }, { eye: EYE, mood: next });
      painter.current?.paint();
      return;
    }
    rig.current = createRig(
      { wrap: els.wrap, drift: els.drift, breath: els.breath, lids: els.lids, pupils: els.pupils },
      { origin: ORIGIN, eye: EYE, mood: next },
    );
  }, [mood, interactive, breathe]);

  // After the rig's, so each frame the canvas paints where the rig has just put Echo.
  useEffect(() => {
    const c = canvas.current;
    const s = svg.current;
    if (!c || !s) return;
    const p = creatureCanvas(c, s, size, Math.ceil(size * REACH));
    if (!p) return;
    painter.current = p;
    const frame = () => {
      if (!pausedNow.current) p.paint();
    };
    // The first paint waits for a frame, where the rig measures the page anyway; under reduced motion, only it.
    const first = requestAnimationFrame(() => p.paint(true));
    if (rig.current) gsap.ticker.add(frame);
    const relight = () => p.relight();
    // The page put a style on for a while, or took it off (journey/wear.ts).
    window.addEventListener(RELIGHT_EVENT, relight);
    return () => {
      cancelAnimationFrame(first);
      gsap.ticker.remove(frame);
      window.removeEventListener(RELIGHT_EVENT, relight);
      painter.current = null;
      // A new canvas measures the SVG again, which it can only do while it's drawn.
      s.style.display = "";
    };
  }, [size]);

  // The site's colour changed: the parts have new ones.
  useEffect(() => {
    painter.current?.relight();
  }, [seed]);

  // Back in sight: painted where the rig has it now, before the screen shows the last pose it painted.
  useLayoutEffect(() => {
    pausedNow.current = paused;
    if (!paused) painter.current?.paint();
  }, [paused]);

  const reach = Math.ceil(size * REACH);
  return (
    <div
      ref={wrap}
      className={className}
      // The canvas hangs past the box on purpose, for whatever holds Echo to clip.
      style={{ width: size, height: size, position: "relative", ["--echo-clip" as string]: "decorative" }}
      aria-hidden="true"
    >
      <canvas
        ref={canvas}
        style={{ position: "absolute", left: -reach, top: -reach, width: size + reach * 2, height: size + reach * 2, pointerEvents: "none" }}
      />
      <svg ref={svg} viewBox={VIEWBOX} width={size} height={size} style={{ overflow: "visible", display: "block" }}>
        <defs>
          <radialGradient id={`${uid}-body`} cx="36%" cy="28%" r="74%">
            <stop offset="0%" stopColor="#ffd1e8" />
            <stop offset="45%" stopColor="#ff85bf" />
            <stop offset="100%" stopColor="#e2498d" />
          </radialGradient>
          <radialGradient id={`${uid}-foot`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ff4c7b" />
            <stop offset="55%" stopColor="#d91b4c" />
            <stop offset="100%" stopColor="#990d35" />
          </radialGradient>
          <linearGradient id={`${uid}-iris`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="52%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <radialGradient id={`${uid}-spec`} cx="34%" cy="24%" r="42%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <g ref={drift}>
          <g ref={breath}>
            {/* Kirby's iconic big crimson feet */}
            <ellipse
              className="brand-creature__foot"
              cx="118.5"
              cy="52.5"
              rx="10.2"
              ry="6.1"
              transform="rotate(-14 118.5 52.5)"
              fill={`url(#${uid}-foot)`}
              stroke="#7a0a29"
              strokeWidth="0.7"
            />
            <ellipse
              className="brand-creature__foot"
              cx="141.5"
              cy="52.5"
              rx="10.2"
              ry="6.1"
              transform="rotate(14 141.5 52.5)"
              fill={`url(#${uid}-foot)`}
              stroke="#7a0a29"
              strokeWidth="0.7"
            />
            {/* Kirby's stubby pink arms */}
            <ellipse
              className="brand-creature__arm"
              cx="107.8"
              cy="34.8"
              rx="7.2"
              ry="5.2"
              transform="rotate(-26 107.8 34.8)"
              fill={`url(#${uid}-body)`}
              stroke="#cf3d7f"
              strokeWidth="0.65"
            />
            <ellipse
              className="brand-creature__arm"
              cx="152.2"
              cy="34.8"
              rx="7.2"
              ry="5.2"
              transform="rotate(26 152.2 34.8)"
              fill={`url(#${uid}-body)`}
              stroke="#cf3d7f"
              strokeWidth="0.65"
            />
            {/* Kirby's round pink body */}
            <circle
              className="brand-creature__body"
              cx="130"
              cy="33.5"
              r="21.5"
              fill={gloss ? `url(#${uid}-body)` : "#ff85bf"}
              stroke="#d43f82"
              strokeWidth="0.75"
            />
            {gloss && (
              <ellipse
                className="brand-creature__shine"
                cx="122"
                cy="21.5"
                rx="7.2"
                ry="4.2"
                fill={`url(#${uid}-spec)`}
                transform="rotate(-22 122 21.5)"
              />
            )}
            {/* Rosy blush cheeks */}
            <ellipse className="brand-creature__blush" cx="116.5" cy="36.2" rx="4.2" ry="2.2" fill="#ff3b82" opacity="0.68" />
            <ellipse className="brand-creature__blush" cx="143.5" cy="36.2" rx="4.2" ry="2.2" fill="#ff3b82" opacity="0.68" />
            {/* Iconic tall oval Kirby eyes */}
            <g ref={lids}>
              <ellipse className="brand-creature__eye" cx="123.4" cy="29.8" rx="3.1" ry="6.2" fill="#0b0d17" />
              <ellipse className="brand-creature__eye" cx="136.6" cy="29.8" rx="3.1" ry="6.2" fill="#0b0d17" />
              <g ref={pupils}>
                <ellipse className="brand-creature__pupil" cx="123.4" cy="32.1" rx="2.1" ry="3.2" fill={`url(#${uid}-iris)`} />
                <ellipse className="brand-creature__pupil" cx="136.6" cy="32.1" rx="2.1" ry="3.2" fill={`url(#${uid}-iris)`} />
                <ellipse className="brand-creature__shine" cx="123.4" cy="26.8" rx="1.65" ry="2.55" fill="#ffffff" />
                <ellipse className="brand-creature__shine" cx="136.6" cy="26.8" rx="1.65" ry="2.55" fill="#ffffff" />
              </g>
            </g>
            {/* Happy Kirby smile */}
            <path
              className="brand-creature__mouth"
              d="M126.8 37.6 Q130 41.2 133.2 37.6"
              fill="none"
              stroke="#7a0a29"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
