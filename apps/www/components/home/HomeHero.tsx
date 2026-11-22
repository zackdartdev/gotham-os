"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { Switch2Cutaway3D } from "@/components/home/Switch2Cutaway3D";
import { NavTools } from "@/components/home/NavTools";
import { Wordmark } from "@/components/site/SiteTopBar";
import { useCopy } from "@/components/use-copy";
import { HeroLight } from "@/components/home/light/HeroLight";

const INIT = "gotham-ctl deploy --mode=on-prem|cloud";

const LINKS = [
  { href: "#fluxo", label: "Fluxo Operacional" },
  { href: "#agentes", label: "Time de Agentes" },
  { href: "#instalacao", label: "Local & Cloud" },
  { href: "#fundador", label: "Zack Studios" },
];

const ROTATING_PHRASES = [
  "soberania 100% local (on-premise)",
  "time de agentes autônomos sob medida",
  "nuvem privada (VPC) com zero vazamento",
  "auditoria imutável & compliance LGPD",
  "decisão executiva em tempo real",
];

function Icon({ children, fill = false }: { children: ReactNode; fill?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"}
      stroke={fill ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Command() {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      className="hero4__cmd"
      onClick={() => copy(INIT)}
      aria-label={copied ? "Copiado" : `Copiar comando: ${INIT}`}
    >
      <span className="hero4__cmd-prompt" aria-hidden="true">
        $
      </span>
      <code>{INIT}</code>
      <span className="hero4__cmd-icon" aria-hidden="true">
        {copied ? (
          <Icon>
            <path d="M5 12l5 5L20 7" />
          </Icon>
        ) : (
          <Icon>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h8" />
          </Icon>
        )}
      </span>
    </button>
  );
}

export function HomeHero({
  away = false,
}: {
  /** Agent is out on the page, not on the device's screen. */
  away?: boolean;
}) {
  const card = useRef<HTMLElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);

  // Scroll-reactive typography transforms
  const { scrollYProgress } = useScroll({
    target: card,
    offset: ["start start", "end start"],
  });
  const leftWordX = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const rightWordX = useTransform(scrollYProgress, [0, 1], [0, 72]);
  const wordsOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.22]);
  const offerY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const offerOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.45]);

  // Rotating highlighted phrase cycle
  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  // Sticky top bar reveal once hero scrolls past
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    const root = document.documentElement;
    let checking = 0;
    const check = () => {
      checking = 0;
      const r = el.getBoundingClientRect();
      root.toggleAttribute("data-hero-passed", !(r.bottom > 72 && r.top < window.innerHeight));
    };
    const schedule = () => {
      if (!checking) checking = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    check();
    return () => {
      cancelAnimationFrame(checking);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.removeAttribute("data-hero-passed");
    };
  }, []);

  return (
    <section ref={card} className="hero4" aria-labelledby="hero-h" data-guide-section="">
      <HeroLight />
      <div className="hero4__grid" aria-hidden="true" />

      <header className="hero4__nav">
        <span className="hero4__brand">
          <Wordmark />
        </span>
        <nav className="hero4__links" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} className="hero4__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hero4__support">
          <NavTools />
          <HardwareButton size="sm" variant="primary" href="#contato">
            Agendar Implantação
          </HardwareButton>
        </div>
      </header>

      <h1 id="hero-h" className="hero4__sr">
        GothamOS: Inteligência operacional e time de agentes corporativos, 100% local ou em nuvem privada
      </h1>

      <div className="hero4__device hero4__device--switch2">
        <motion.span
          className="hero4__small hero4__small--before"
          aria-hidden="true"
          style={{ x: leftWordX, opacity: wordsOpacity }}
        >
          Camada Executiva Soberana
        </motion.span>
        <motion.span
          className="hero4__word hero4__word--left"
          aria-hidden="true"
          style={{ x: leftWordX, opacity: wordsOpacity }}
        >
          GOTHAM
        </motion.span>
        <motion.span
          className="hero4__word hero4__word--right"
          aria-hidden="true"
          style={{ x: rightWordX, opacity: wordsOpacity }}
        >
          OS
        </motion.span>
        <motion.span
          className="hero4__small hero4__small--after"
          aria-hidden="true"
          style={{ x: rightWordX, opacity: wordsOpacity }}
        >
          arquitetura multi-agente corporativa
        </motion.span>
        <Switch2Cutaway3D away={away} />
      </div>

      <motion.div className="hero4__offer" style={{ y: offerY, opacity: offerOpacity }}>
        <div className="hero4__rotator" aria-live="polite">
          <span className="hero4__rotator-lead">Inteligência operacional no padrão Palantir Gotham com</span>
          <span className="hero4__rotator-slot">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROTATING_PHRASES[phraseIdx]}
                className="hero4__rotator-highlight"
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                {ROTATING_PHRASES[phraseIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <p className="hero4__lede">
          Implantamos a plataforma completa e operamos squads de agentes conectados aos seus ERPs, bancos de dados e
          fluxos críticos — com controle total sobre dados e custos.
        </p>

        <div className="hero4__ctas">
          <HardwareButton
            variant="primary"
            size="lg"
            impact
            href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20conhecer%20a%20implanta%C3%A7%C3%A3o%20do%20GothamOS%20e%20os%20squads%20de%20agentes."
          >
            Agendar Implantação
          </HardwareButton>
          <Command />
        </div>
      </motion.div>
    </section>
  );
}
