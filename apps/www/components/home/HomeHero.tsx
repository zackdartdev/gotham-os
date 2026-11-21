"use client";

/**
 * The hero: a rounded card that is the whole first screen.
 *
 * The nav is part of the card, laid out the way a product's is: the wordmark
 * on the left, the links in the middle; GitHub (once the repository is
 * public), X and Support on the right (NavTools.tsx). The site's own top bar stays out of the way until the card has
 * scrolled past (landing.css, `data-hero-passed`), and on a phone the card
 * leaves navigation to it.
 *
 * In the card: the brand's device, upright and floating a little, over a
 * faded grid, with DESIGN and SYSTEM right up against it on either side (what
 * makes Echo different: one design system, every component from the same
 * material), and the small words that finish the sentence: "The" over DESIGN,
 * "your AI agent builds with." under SYSTEM. The big words keep their balance;
 * read in order, the hero says who Echo is for. Then what it is, at the bottom
 * left, as wide as the two ways in under it: the plugin (Echo's listing in
 * ChatGPT, nothing to install) and the one command (in your code).
 *
 * The device is the brand's own (brand/Device.tsx), with its real keys, and
 * you can turn it over (DeviceSpinner). Echo lives on its screen; scroll, and
 * Echo steps out and comes down the page with you.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { BrandDevice } from "@/components/brand/Device";
import { DeviceSpinner } from "@/components/home/DeviceSpinner";
import { NavTools } from "@/components/home/NavTools";
import { Wordmark } from "@/components/site/SiteTopBar";
import { useCopy } from "@/components/use-copy";
import { HeroLight } from "@/components/home/light/HeroLight";

const INIT = "gotham-ctl deploy --mode=on-prem|cloud";

const LINKS = [
  { href: "#agentes", label: "Time de Agentes" },
  { href: "#instalacao", label: "Instalação Local & Cloud" },
  { href: "#comando", label: "Console Tátil" },
  { href: "#fundador", label: "Zack Studios" },
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
    <button type="button" className="hero4__cmd" onClick={() => copy(INIT)} aria-label={copied ? "Copied" : `Copy the command: ${INIT}`}>
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
  /** Echo is out on the page, not on the device's screen. */
  away?: boolean;
}) {
  const card = useRef<HTMLElement>(null);

  /*
   * The site's own top bar comes back once the card (and its nav) has scrolled away: its foot above the
   * top 72px, or its top below the window. Measured from the scroll, not with an IntersectionObserver:
   * under a heavy load a browser can hold an observer's notices back for seconds, and the bar stayed away.
   */
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
        {/* Whose page this is, where every visitor looks first: the top-left corner. */}
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

      {/* The words beside the device say it on the screen; the heading says it to everyone else. */}
      <h1 id="hero-h" className="hero4__sr">
        GothamOS: Inteligência operacional e time de agentes corporativos, 100% local ou em nuvem privada
      </h1>

      <div className="hero4__device">
        <span className="hero4__small hero4__small--before" aria-hidden="true">
          Camada executiva
        </span>
        <span className="hero4__word hero4__word--left" aria-hidden="true">
          GOTHAM
        </span>
        <span className="hero4__word hero4__word--right" aria-hidden="true">
          OS
        </span>
        <span className="hero4__small hero4__small--after" aria-hidden="true">
          time de agentes corporativos
        </span>
        <DeviceSpinner float>
          <BrandDevice away={away} />
        </DeviceSpinner>
      </div>

      <div className="hero4__offer">
        <p className="hero4__lede">
          Inteligência operacional no padrão Palantir Gotham: implantamos a plataforma 100% local{" "}
          <span style={{ whiteSpace: "nowrap" }}>(on-premise)</span> ou em nuvem privada (VPC) junto com squads de
          agentes sob medida para a sua operação.
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
      </div>
    </section>
  );
}
