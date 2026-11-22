"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check, Copy, Cpu, Bot, Server, CreditCard, BarChart3 } from "lucide-react";
import { Switch2Cutaway3D } from "@/components/home/Switch2Cutaway3D";
import { TechMarquee } from "@/components/home/sections/TechMarquee";
import { useCopy } from "@/components/use-copy";
import { GothamShell } from "./GothamShell";
import {
  IsoStack3D,
  MultiDevicePreview,
  CardShuffleDeck,
  HolographicTicket,
} from "./MotionShowcase";

const INIT_CMD = "gotham-ctl deploy --mode=on-prem|vpc";

const ROTATING_PHRASES = [
  "soberania 100% local (on-premise)",
  "time de agentes autônomos sob medida",
  "nuvem privada (VPC) com zero vazamento",
  "auditoria imutável SHA-256 & LGPD",
  "comando executivo em tempo real",
];

export function HomeV3() {
  const heroRef = useRef<HTMLElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const { copied, copy } = useCopy();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.32]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <GothamShell>
      {/* HERO — Black + Purple + Gold + Pure White + Preserved Interactive 3D Switch */}
      <section ref={heroRef} className="g3-sec g3-sec--hero" aria-labelledby="g3-hero-h">
        <div className="g3-container g3-hero-grid">
          <motion.div className="g3-hero-copy" style={{ y: titleY, opacity: titleOpacity }}>
            <span className="g3-badge g3-badge--gold">
              ● PADRÃO PALANTIR GOTHAM · ZACK STUDIOS
            </span>

            <h1 id="g3-hero-h" className="g3-h1">
              Inteligência <span className="g3-accent-purple">Operacional</span> &amp;{" "}
              <span className="g3-accent-gold">Agentes</span> Corporativos.
            </h1>

            <div style={{ display: "grid", gap: "0.4rem" }} aria-live="polite">
              <span style={{ fontSize: "0.94rem", color: "var(--g3-muted)", fontWeight: 600 }}>
                Operação soberana com:
              </span>
              <span style={{ minHeight: "2.65rem", display: "inline-flex", alignItems: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_PHRASES[phraseIdx]}
                    className="g3-rotator-pill"
                    initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {ROTATING_PHRASES[phraseIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <p className="g3-lede">
              Implantamos o <strong>GothamOS</strong> conectado aos seus ERPs (Protheus, Tasy, Sênior, 4medic) e
              operamos squads de agentes sob medida — com controle total de hardware, custos e privacidade.
            </p>

            <div className="g3-hero-ctas">
              <Link href="/planos" className="g3-btn g3-btn--gold">
                Ver Planos &amp; ROI
                <ArrowUpRight size={17} />
              </Link>
              <Link href="/dashboard" className="g3-btn g3-btn--purple">
                Testar Dashboard Live
              </Link>
              <button type="button" className="g3-cli" onClick={() => copy(INIT_CMD)}>
                <span className="g3-cli__dollar">$</span>
                <code>{INIT_CMD}</code>
                {copied ? <Check size={15} color="#34d399" /> : <Copy size={15} color="#c7c5d8" />}
              </button>
            </div>

            <div className="g3-hero-metrics">
              <div className="g3-hero-metric">
                <strong>30+</strong>
                <span>Empresas em 6 países</span>
              </div>
              <div className="g3-hero-metric">
                <strong style={{ color: "#c084fc" }}>0 Bytes</strong>
                <span>Vazamento no modo local</span>
              </div>
              <div className="g3-hero-metric">
                <strong>14 Dias</strong>
                <span>Primeiro squad em produção</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive 3D Switch Cutaway preserved */}
          <div className="g3-hero-hardware">
            <Switch2Cutaway3D />
          </div>
        </div>
      </section>

      {/* DUAL-ROW ROTATING TECH MARQUEE */}
      <TechMarquee />

      {/* SECTION 01: ISO-STACK (4-Layer Isometric Operational Architecture) */}
      <section className="g3-sec" aria-labelledby="g3-iso-h">
        <div className="g3-container">
          <div className="g3-sec-head">
            <div>
              <span className="g3-badge">01 · FLUXO OPERACIONAL ISOMÉTRICO</span>
              <h2 id="g3-iso-h" className="g3-h2" style={{ marginTop: "0.75rem" }}>
                Do ERP legado à <span className="g3-accent-gold">decisão auditada</span> em 4 camadas.
              </h2>
            </div>
            <p className="g3-lede">
              Passe o mouse ou clique em cada camada do <strong>Iso-Stack</strong> para inspecionar como seus dados são
              sanitizados, estruturados em ontologia e transformados em ações executivas.
            </p>
          </div>
          <IsoStack3D />
        </div>
      </section>

      {/* SECTION 02: MG-WALL-BENTO (Multipage Hub) */}
      <section className="g3-sec" aria-labelledby="g3-bento-h">
        <div className="g3-container">
          <div className="g3-sec-head">
            <div>
              <span className="g3-badge g3-badge--gold">02 · EXPLORE A PLATAFORMA MULTIPAGE</span>
              <h2 id="g3-bento-h" className="g3-h2" style={{ marginTop: "0.75rem" }}>
                Cada módulo do <span className="g3-accent-purple">GothamOS</span> em profundidade.
              </h2>
            </div>
            <p className="g3-lede">
              Navegue pelas páginas dedicadas de telemetria ao vivo, squads de agentes, arquitetura de instalação e
              planos B2B com simulador de retorno.
            </p>
          </div>

          <div className="g3-bento">
            <Link href="/dashboard" className="g3-bento__item g3-bento__span-7">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="g3-badge g3-badge--gold">
                  <BarChart3 size={13} /> DASHBOARD INTERATIVO
                </span>
                <ArrowUpRight size={20} color="#facc15" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.45rem", fontSize: "1.55rem", fontWeight: 800 }}>
                  Centro de Comando &amp; Aprovações ao Vivo
                </h3>
                <p className="g3-lede" style={{ fontSize: "0.92rem" }}>
                  Aprove bloqueios fiscais, audite alertas de estoque e veja o mapa topológico e a trilha SHA-256
                  reagirem em tempo real.
                </p>
              </div>
            </Link>

            <Link href="/agentes" className="g3-bento__item g3-bento__span-5">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="g3-badge">
                  <Bot size={13} /> 5 SQUADS
                </span>
                <ArrowUpRight size={20} color="#c084fc" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.45rem", fontSize: "1.45rem", fontWeight: 800 }}>Time de Agentes</h3>
                <p className="g3-lede" style={{ fontSize: "0.92rem" }}>
                  Financeiro, Operações, Jurídico, Clínico e Executivo com playbooks interativos e aprovação mobile.
                </p>
              </div>
            </Link>

            <Link href="/arquitetura" className="g3-bento__item g3-bento__span-5">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="g3-badge">
                  <Server size={13} /> INFRAESTRUTURA
                </span>
                <ArrowUpRight size={20} color="#c084fc" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.45rem", fontSize: "1.45rem", fontWeight: 800 }}>
                  100% Local ou Nuvem VPC
                </h3>
                <p className="g3-lede" style={{ fontSize: "0.92rem" }}>
                  Compare vLLM/llama.cpp On-Premise vs AWS/GCP VPC e calcule o dimensionamento exato do seu servidor.
                </p>
              </div>
            </Link>

            <Link href="/planos" className="g3-bento__item g3-bento__span-7">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="g3-badge g3-badge--gold">
                  <CreditCard size={13} /> PLANOS &amp; ROI B2B
                </span>
                <ArrowUpRight size={20} color="#facc15" />
              </div>
              <div>
                <h3 style={{ margin: "0 0 0.45rem", fontSize: "1.55rem", fontWeight: 800 }}>
                  Planos Transparentes + Calculadora de Economia
                </h3>
                <p className="g3-lede" style={{ fontSize: "0.92rem" }}>
                  Escolha entre Implantação Base, Operação Multi-Squad ou Enterprise Sovereign Air-Gap com contrato
                  formal e LGPD.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 03: MG-DEV-LAPTOP & MG-DEV-TABLET */}
      <section className="g3-sec" aria-labelledby="g3-devices-h">
        <div className="g3-container">
          <div className="g3-sec-head">
            <div>
              <span className="g3-badge">
                <Cpu size={13} /> 03 · CONSOLE MULTI-DISPOSITIVO
              </span>
              <h2 id="g3-devices-h" className="g3-h2" style={{ marginTop: "0.75rem" }}>
                Sincronizado do <span className="g3-accent-purple">Desktop</span> ao{" "}
                <span className="g3-accent-gold">Tablet Executivo.</span>
              </h2>
            </div>
            <p className="g3-lede">
              Alterne o squad abaixo e veja a telemetria sincronizar instantaneamente entre a estação de comando e o
              painel móvel da diretoria.
            </p>
          </div>
          <MultiDevicePreview />
        </div>
      </section>

      {/* SECTION 04: MG-WALL-SHUFFLE */}
      <section className="g3-sec" aria-labelledby="g3-shuffle-h">
        <div className="g3-container">
          <CardShuffleDeck />
        </div>
      </section>

      {/* SECTION 05: MG-EVENT-TICKET (Holographic Enterprise Pilot Pass) */}
      <section className="g3-sec" aria-label="Passe para Piloto Enterprise">
        <div className="g3-container">
          <HolographicTicket />
        </div>
      </section>
    </GothamShell>
  );
}
