"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Flower } from "@/components/brand/Logo";
import "./gotham-v3.css";
import "@/components/home/sections/oversight.css";
import "@/components/home/gotham/gotham.css";

const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/dashboard", label: "Dashboard Live" },
  { href: "/agentes", label: "Time de Agentes" },
  { href: "/arquitetura", label: "Local & Cloud" },
  { href: "/planos", label: "Planos" },
];

export function GothamShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="g3-app">
      <header className="g3-header">
        <div className="g3-container g3-header__inner">
          <Link href="/" className="g3-brand" aria-label="GothamOS — Início">
            <Flower m={24} tier="standard" />
            <span>GOTHAM</span>
            <span className="g3-brand__os">OS</span>
          </Link>

          <nav className="g3-nav" aria-label="Navegação principal">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`g3-nav__link ${active ? "g3-nav__link--active" : ""}`}
                >
                  {active && (
                    <motion.span
                      layoutId="g3-nav-pill"
                      className="g3-nav__pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="g3-nav__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="g3-header__actions">
            <a
              href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20agendar%20um%20piloto%20do%20GothamOS."
              target="_blank"
              rel="noopener noreferrer"
              className="g3-btn g3-btn--gold g3-btn--sm g3-header__cta-desktop"
            >
              Agendar Piloto
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="g3-mobile-btn"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="g3-mobile-drawer"
              aria-label="Menu móvel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={pathname === item.href ? "true" : "false"}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20agendar%20um%20piloto%20do%20GothamOS."
                target="_blank"
                rel="noopener noreferrer"
                className="g3-btn g3-btn--gold"
                style={{ marginTop: "0.35rem" }}
              >
                Agendar Piloto no WhatsApp
                <ArrowUpRight size={16} />
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>{children}</main>

      <footer className="g3-footer">
        <div className="g3-container">
          <div className="g3-footer__grid">
            <div style={{ display: "grid", gap: "0.85rem", alignContent: "start" }}>
              <Link href="/" className="g3-brand">
                <Flower m={26} tier="expressive" />
                <span>GOTHAM</span>
                <span className="g3-brand__os">OS</span>
              </Link>
              <p className="g3-lede" style={{ fontSize: "0.9rem", maxWidth: "24rem" }}>
                Plataforma soberana de inteligência operacional e squads de agentes corporativos — rodando{" "}
                <strong>100% local (On-Premise)</strong> ou em <strong>nuvem privada (VPC)</strong>.
              </p>
              <span className="g3-badge g3-badge--gold" style={{ width: "fit-content" }}>
                <ShieldCheck size={13} aria-hidden="true" />
                Contrato Formal · LGPD · Zero Lock-In
              </span>
            </div>

            <div className="g3-footer__col">
              <h4>Plataforma</h4>
              <ul>
                <li>
                  <Link href="/">Visão Geral</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard Interativo</Link>
                </li>
                <li>
                  <Link href="/agentes">Time de Agentes</Link>
                </li>
                <li>
                  <Link href="/arquitetura">Local &amp; Nuvem VPC</Link>
                </li>
                <li>
                  <Link href="/planos">Planos &amp; ROI</Link>
                </li>
              </ul>
            </div>

            <div className="g3-footer__col">
              <h4>Integrações</h4>
              <ul>
                <li>
                  <Link href="/arquitetura">TOTVS Protheus</Link>
                </li>
                <li>
                  <Link href="/arquitetura">Philips Tasy &amp; 4medic</Link>
                </li>
                <li>
                  <Link href="/arquitetura">ERP Sênior &amp; SQL</Link>
                </li>
                <li>
                  <Link href="/arquitetura">vLLM · llama.cpp · Docker</Link>
                </li>
              </ul>
            </div>

            <div className="g3-footer__col">
              <h4>Zack Studios</h4>
              <ul>
                <li>
                  <a href="https://wa.me/5521990315582" target="_blank" rel="noopener noreferrer">
                    WhatsApp · +55 21 99031-5582
                  </a>
                </li>
                <li>
                  <a href="mailto:contato.zackstudio@gmail.com">contato.zackstudio@gmail.com</a>
                </li>
                <li>
                  <a href="https://github.com/zackdartdev" target="_blank" rel="noopener noreferrer">
                    GitHub · zackdartdev
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="g3-footer__bottom">
            <span>© 2026 Zack Studios · Idealizado por Isaac Lamego (30+ empresas em 6 países)</span>
            <span>Operação 100% Remota · Padrão Enterprise Soberano</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
