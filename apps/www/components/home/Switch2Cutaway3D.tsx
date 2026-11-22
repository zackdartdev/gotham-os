"use client";

/**
 * <Switch2Cutaway3D> — Physically Solid 3D Nintendo Switch 2:
 *   - Closed 6-faced 3D prisms for the center tablet and both Joy-Con 2 controllers
 *     (solid top/bottom/left/right anodized walls, real ports, vents, SL/SR rail buttons, ZL/ZR triggers)
 *   - Detachable magnetic Joy-Con 2 controllers (click each Joy-Con or use the toggle button)
 *   - Cutaway 3D exploded hardware view (Glass Display → Tegra T239 PCB + Vapor Fan → Rear Kickstand)
 *   - Kirby Rosa living on the 7.9" display (steps out into 3D on scroll via data-guide-home)
 */
import { useEffect, useRef, useState } from "react";
import { Creature } from "@/components/brand/Creature";
import "./switch2.css";

export function Switch2Cutaway3D({ away = false }: { away?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const rig = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);

  const [leftDetached, setLeftDetached] = useState(false);
  const [rightDetached, setRightDetached] = useState(false);
  const [cutaway, setCutaway] = useState(false);
  const [awake, setAwake] = useState(true);

  const bothDetached = leftDetached && rightDetached;

  const toggleBothJoyCons = () => {
    const next = !(leftDetached && rightDetached);
    setLeftDetached(next);
    setRightDetached(next);
  };

  useEffect(() => {
    const el = host.current;
    const body = rig.current;
    const ground = shadow.current;
    if (!el || !body) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restYaw = cutaway ? -24 : -8;
    const restPitch = cutaway ? 12 : 5;

    let yaw = restYaw;
    let pitch = restPitch;
    let yawV = 0;
    let pitchV = 0;
    let leanX = 0;
    let leanY = 0;
    let drag: { id: number; x: number; y: number; t: number } | null = null;
    let releasedAt = -Infinity;
    let pointer: { x: number; y: number } | null = null;
    let last = performance.now();
    let raf = 0;
    let still = 0;

    const apply = () => {
      body.style.transform = `rotateX(${(pitch + leanX).toFixed(2)}deg) rotateY(${(yaw + leanY).toFixed(2)}deg)`;
      if (ground) {
        const yRad = ((yaw + leanY) * Math.PI) / 180;
        const scaleX = Math.max(0.42, Math.abs(Math.cos(yRad)));
        ground.style.transform = `translateX(-50%) scaleX(${scaleX.toFixed(3)})`;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!drag && !reduced) {
        yaw += yawV * dt;
        pitch = Math.max(-48, Math.min(48, pitch + pitchV * dt));
        const damp = Math.exp(-dt * 2.4);
        yawV *= damp;
        pitchV *= damp;
        if (now - releasedAt > 2600) {
          const home = restYaw + Math.round((yaw - restYaw) / 360) * 360;
          const k = 1 - Math.exp(-dt * 2.8);
          yaw += (home - yaw) * k;
          pitch += (restPitch - pitch) * k;
        }
        let tx = 0;
        let ty = 0;
        if (pointer) {
          const r = el.getBoundingClientRect();
          const nx = (pointer.x - (r.left + r.width / 2)) / Math.max(1, r.width);
          const ny = (pointer.y - (r.top + r.height / 2)) / Math.max(1, r.height);
          if (Math.abs(nx) < 1.5 && Math.abs(ny) < 1.5) {
            ty = Math.max(-1, Math.min(1, nx)) * 10;
            tx = Math.max(-1, Math.min(1, -ny)) * 7;
          }
        }
        const k = 1 - Math.exp(-dt * 6);
        leanX += (tx - leanX) * k;
        leanY += (ty - leanY) * k;
      }
      apply();
      const moving =
        Boolean(drag) ||
        Math.abs(yawV) > 0.4 ||
        Math.abs(pitchV) > 0.4 ||
        Math.abs(yaw - restYaw) > 0.25 ||
        Math.abs(pitch - restPitch) > 0.25 ||
        Boolean(pointer);
      still = moving ? 0 : still + dt;
      raf = still > 0.35 ? 0 : requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) {
        last = performance.now();
        still = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target instanceof Element && e.target.closest("button, a"))) return;
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now() };
      el.setPointerCapture(e.pointerId);
      el.dataset.grabbing = "";
      yawV = pitchV = 0;
      wake();
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!drag || e.pointerId !== drag.id) {
        if (!reduced) wake();
        return;
      }
      const now = performance.now();
      const dt = Math.max(1, now - drag.t) / 1000;
      const dy = (e.clientX - drag.x) * 0.5;
      const dx = -(e.clientY - drag.y) * 0.36;
      yaw += dy;
      pitch = Math.max(-48, Math.min(48, pitch + dx));
      yawV = dy / dt;
      pitchV = dx / dt;
      drag = { ...drag, x: e.clientX, y: e.clientY, t: now };
      apply();
    };

    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      delete el.dataset.grabbing;
      releasedAt = performance.now();
      if (reduced) yawV = pitchV = 0;
      wake();
    };

    const onLeave = () => {
      pointer = null;
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    apply();
    wake();

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [cutaway]);

  return (
    <div
      ref={host}
      className="sw2-stage"
      data-cutaway={cutaway ? "true" : "false"}
      data-detached={leftDetached || rightDetached ? "true" : "false"}
      data-left-detached={leftDetached ? "true" : "false"}
      data-right-detached={rightDetached ? "true" : "false"}
      data-away={away ? "true" : "false"}
    >
      <div className="sw2-viewport" aria-label="Console tátil GothamOS interativo em 3D. Arraste para girar ou clique nos módulos laterais para destacar.">
        <div className="sw2-float">
          <div ref={rig} className="sw2-rig">
            {/* SOLID 3D LEFT MAGNETIC MODULE (Cyan) */}
            <button
              type="button"
              className="sw2-joycon sw2-joycon--left"
              data-detached={leftDetached ? "true" : "false"}
              onClick={() => setLeftDetached((v) => !v)}
              aria-pressed={leftDetached}
              aria-label={leftDetached ? "Encaixar módulo esquerdo" : "Destacar módulo esquerdo"}
              title="Clique para destacar/encaixar módulo esquerdo"
            >
              {/* Solid 3D Walls */}
              <span className="sw2-jc-wall sw2-jc-wall--outer" aria-hidden="true" />
              <span className="sw2-jc-wall sw2-jc-wall--inner" aria-hidden="true">
                <span className="sw2-sl-sr" />
                <span className="sw2-mag-strip sw2-mag-strip--cyan" />
                <span className="sw2-sl-sr" />
              </span>
              <span className="sw2-jc-wall sw2-jc-wall--top" aria-hidden="true">
                L
              </span>
              <span className="sw2-jc-wall sw2-jc-wall--bottom" aria-hidden="true" />

              {/* Solid Back Grip with ZL Trigger */}
              <span className="sw2-jc-back" aria-hidden="true">
                <span className="sw2-zl-zr">ZL</span>
                <span className="sw2-release-btn" />
              </span>

              {/* Front Face */}
              <span className="sw2-joycon__body">
                <span className="sw2-minus" aria-hidden="true" />
                <span className="sw2-stick sw2-stick--cyan" aria-hidden="true">
                  <span className="sw2-stick__cap" />
                </span>
                <span className="sw2-diamond" aria-hidden="true">
                  <span className="sw2-btn sw2-btn--n">▲</span>
                  <span className="sw2-btn sw2-btn--w">◀</span>
                  <span className="sw2-btn sw2-btn--e">▶</span>
                  <span className="sw2-btn sw2-btn--s">▼</span>
                </span>
                <span className="sw2-capture" aria-hidden="true" />
              </span>
            </button>

            {/* SOLID 3D CENTER TABLET WITH CUTAWAY LAYERS */}
            <div className="sw2-tablet">
              {/* Solid Top Edge Wall (Power, Volume, Vents, Audio Jack, USB-C) */}
              <div className="sw2-wall sw2-wall--top" aria-hidden="true">
                <span className="sw2-edge-group">
                  <span className="sw2-edge-btn" />
                  <span className="sw2-edge-btn sw2-edge-btn--vol" />
                </span>
                <span className="sw2-edge-group">
                  <span className="sw2-edge-vent" />
                  <span className="sw2-edge-vent" />
                  <span className="sw2-edge-vent" />
                  <span className="sw2-edge-vent" />
                  <span className="sw2-edge-vent" />
                </span>
                <span className="sw2-edge-group">
                  <span className="sw2-edge-jack" />
                  <span className="sw2-edge-usbc" />
                </span>
              </div>

              {/* Solid Bottom Edge Wall (Stereo Speakers + Bottom USB-C) */}
              <div className="sw2-wall sw2-wall--bottom" aria-hidden="true">
                <span className="sw2-edge-speaker" />
                <span className="sw2-edge-usbc" />
                <span className="sw2-edge-speaker" />
              </div>

              {/* Solid Left Magnetic Bay Wall */}
              <div className="sw2-wall sw2-wall--left" aria-hidden="true">
                <span className="sw2-mag-strip sw2-mag-strip--cyan" />
                <span className="sw2-pogo-row">
                  <span className="sw2-pogo-pin" />
                  <span className="sw2-pogo-pin" />
                  <span className="sw2-pogo-pin" />
                </span>
                <span className="sw2-mag-strip sw2-mag-strip--cyan" />
              </div>

              {/* Solid Right Magnetic Bay Wall */}
              <div className="sw2-wall sw2-wall--right" aria-hidden="true">
                <span className="sw2-mag-strip sw2-mag-strip--coral" />
                <span className="sw2-pogo-row">
                  <span className="sw2-pogo-pin" />
                  <span className="sw2-pogo-pin" />
                  <span className="sw2-pogo-pin" />
                </span>
                <span className="sw2-mag-strip sw2-mag-strip--coral" />
              </div>

              {/* Layer 3: Solid Rear Graphite Shell & U-Kickstand */}
              <div className="sw2-tablet__back" aria-hidden="true">
                <span className="sw2-back-logo">GOTHAM CORE</span>
                <span className="sw2-back-sub">MÓDULO TÁTIL · CUTAWAY 3D</span>
                <span className="sw2-kickstand" />
              </div>

              {/* Layer 2: Cutaway Internal Motherboard (Tegra T239 + Vapor Fan + Battery) */}
              <div className="sw2-pcb" aria-hidden="true">
                <svg viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="348" height="208" rx="10" fill="#0b1320" stroke="#8b6fe8" strokeOpacity="0.45" />
                  <path d="M22 44 H92 L112 64 H158" stroke="#00d4ff" strokeOpacity="0.45" strokeWidth="1.5" />
                  <path d="M22 178 H84 L106 154 H164" stroke="#8b6fe8" strokeOpacity="0.5" strokeWidth="1.5" />
                  <path d="M338 56 H286 L268 74" stroke="#ff5a5f" strokeOpacity="0.45" strokeWidth="1.5" />
                  <path d="M338 164 H276 L252 140" stroke="#00d4ff" strokeOpacity="0.4" strokeWidth="1.5" />

                  <rect x="24" y="64" width="114" height="106" rx="8" fill="#172033" stroke="#334155" strokeWidth="1.4" />
                  <text x="81" y="108" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace" fontWeight="700">
                    LI-ION 5220mAh
                  </text>
                  <text x="81" y="124" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="monospace">
                    CELL-A / B
                  </text>

                  <rect x="150" y="72" width="54" height="54" rx="6" fill="#1e1b2e" stroke="#8b6fe8" strokeWidth="1.8" />
                  <rect x="160" y="82" width="34" height="34" rx="4" fill="#8b6fe8" fillOpacity="0.25" stroke="#c4b5fd" strokeWidth="1" />
                  <text x="177" y="101" textAnchor="middle" fill="#efe9ff" fontSize="8.5" fontFamily="monospace" fontWeight="700">
                    T239
                  </text>
                  <text x="177" y="142" textAnchor="middle" fill="#00d4ff" fontSize="7.5" fontFamily="monospace">
                    ARM + AMPERE
                  </text>

                  <path d="M196 92 C214 92 216 70 242 70" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.85" />
                  <path d="M196 92 C214 92 216 70 242 70" stroke="#fde68a" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />

                  <circle cx="242" cy="96" r="34" fill="#0f172a" stroke="#475569" strokeWidth="1.6" />
                  <g className="sw2-fan-blades">
                    <circle cx="242" cy="96" r="10" fill="#8b6fe8" fillOpacity="0.9" />
                    <path d="M242 66 L248 86 L236 86 Z" fill="#94a3b8" />
                    <path d="M242 126 L236 106 L248 106 Z" fill="#94a3b8" />
                    <path d="M212 96 L232 90 L232 102 Z" fill="#94a3b8" />
                    <path d="M272 96 L252 102 L252 90 Z" fill="#94a3b8" />
                    <path d="M221 75 L238 87 L230 95 Z" fill="#64748b" />
                    <path d="M263 117 L246 105 L254 97 Z" fill="#64748b" />
                    <path d="M263 75 L254 95 L246 87 Z" fill="#64748b" />
                    <path d="M221 117 L230 97 L238 105 Z" fill="#64748b" />
                  </g>

                  <rect x="10" y="76" width="8" height="68" rx="3" fill="#00d4ff" fillOpacity="0.5" />
                  <rect x="342" y="76" width="8" height="68" rx="3" fill="#ff5a5f" fillOpacity="0.5" />

                  <rect x="292" y="78" width="40" height="32" rx="4" fill="#172033" stroke="#00d4ff" strokeOpacity="0.55" />
                  <text x="312" y="97" textAnchor="middle" fill="#cbd5e1" fontSize="7" fontFamily="monospace">
                    256GB
                  </text>
                  <rect x="150" y="156" width="182" height="34" rx="5" fill="#131c2e" stroke="#334155" />
                  <text x="241" y="176" textAnchor="middle" fill="#c4b5fd" fontSize="8" fontFamily="monospace">
                    MAGNETIC RAIL BUS · PCIe NVMe
                  </text>
                </svg>
              </div>

              {/* Layer 1: Solid Front Glass & 7.9" Display */}
              <div className="sw2-front">
                <div className="sw2-screen" aria-live="polite">
                  <div className="sw2-screen__stars" aria-hidden="true" />
                  <div className="sw2-screen__aura" aria-hidden="true" />

                  <div className="sw2-hud-top" aria-hidden="true">
                    <span className="sw2-hud-pill">
                      <span className="sw2-hud-dot" />
                      GOTHAM OS
                    </span>
                    <span>{cutaway ? "CUTAWAY 3D" : bothDetached ? "MÓDULOS SOLTOS" : "CORE · 120Hz"}</span>
                  </div>

                  <div className="sw2-screen__creature">
                    <span className="sw2-screen__home" data-guide-stop="" data-guide-home="" aria-hidden="true">
                      <Creature size={156} mood={awake ? "watching" : "resting"} paused={away} />
                    </span>
                  </div>

                  <div className="sw2-screen__brb" aria-hidden="true">
                    SENTINEL EM CAMPO
                  </div>

                  <div className="sw2-hud-bot" aria-hidden="true">
                    <span>L: {leftDetached ? "MAG-FREE" : "LOCKED"}</span>
                    <span>R: {rightDetached ? "MAG-FREE" : "LOCKED"}</span>
                  </div>

                  <div className="sw2-glass" aria-hidden="true" />
                </div>

                <span className="sw2-callout sw2-callout--screen" aria-hidden="true">
                  01 · 7.9&quot; 120Hz GLASS DISPLAY
                </span>
                <span className="sw2-callout sw2-callout--soc" aria-hidden="true">
                  02 · TEGRA T239 PCB · VAPOR FAN · MAG-RAILS
                </span>
              </div>
            </div>

            {/* SOLID 3D RIGHT MAGNETIC MODULE (Coral) */}
            <button
              type="button"
              className="sw2-joycon sw2-joycon--right"
              data-detached={rightDetached ? "true" : "false"}
              onClick={() => setRightDetached((v) => !v)}
              aria-pressed={rightDetached}
              aria-label={rightDetached ? "Encaixar módulo direito" : "Destacar módulo direito"}
              title="Clique para destacar/encaixar módulo direito"
            >
              {/* Solid 3D Walls */}
              <span className="sw2-jc-wall sw2-jc-wall--outer" aria-hidden="true" />
              <span className="sw2-jc-wall sw2-jc-wall--inner" aria-hidden="true">
                <span className="sw2-sl-sr" />
                <span className="sw2-mag-strip sw2-mag-strip--coral" />
                <span className="sw2-sl-sr" />
              </span>
              <span className="sw2-jc-wall sw2-jc-wall--top" aria-hidden="true">
                R
              </span>
              <span className="sw2-jc-wall sw2-jc-wall--bottom" aria-hidden="true" />

              {/* Solid Back Grip with ZR Trigger */}
              <span className="sw2-jc-back" aria-hidden="true">
                <span className="sw2-zl-zr">ZR</span>
                <span className="sw2-release-btn" />
              </span>

              {/* Front Face */}
              <span className="sw2-joycon__body">
                <span className="sw2-plus" aria-hidden="true" />
                <span className="sw2-diamond" aria-hidden="true">
                  <span className="sw2-btn sw2-btn--n">X</span>
                  <span className="sw2-btn sw2-btn--w">Y</span>
                  <span className="sw2-btn sw2-btn--e">A</span>
                  <span className="sw2-btn sw2-btn--s">B</span>
                </span>
                <span className="sw2-stick sw2-stick--coral" aria-hidden="true">
                  <span className="sw2-stick__cap" />
                </span>
                <span className="sw2-sub-btns" aria-hidden="true">
                  <span className="sw2-home-btn">⌂</span>
                  <span className="sw2-c-btn">C</span>
                </span>
              </span>
            </button>
          </div>
        </div>

        <div ref={shadow} className="sw2-shadow" aria-hidden="true" />
      </div>

      {/* Interactive Cutaway 3D & Magnetic Module Controls */}
      <div className="sw2-controls" role="group" aria-label="Controles do console 3D GothamOS">
        <button type="button" className="sw2-ctrl" aria-pressed={bothDetached} onClick={toggleBothJoyCons}>
          <span className="sw2-ctrl__dot sw2-ctrl__dot--cyan" aria-hidden="true" />
          {bothDetached ? "Encaixar Módulos" : "Destacar Módulos"}
        </button>
        <button type="button" className="sw2-ctrl" aria-pressed={cutaway} onClick={() => setCutaway((v) => !v)}>
          <span className="sw2-ctrl__dot" aria-hidden="true" />
          {cutaway ? "Fechar Cutaway 3D" : "Abrir Cutaway 3D"}
        </button>
        <button type="button" className="sw2-ctrl" aria-pressed={!awake} onClick={() => setAwake((v) => !v)}>
          {awake ? "Sentinel: Ativo" : "Sentinel: Standby"}
        </button>
      </div>
    </div>
  );
}
