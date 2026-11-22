"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GothamShell } from "./GothamShell";
import { GothamSquadsV2 } from "@/components/home/sections/GothamSquadsV2";
import { PhoneTumblePreview } from "./MotionShowcase";

export function AgentesView() {
  return (
    <GothamShell>
      {/* Hero + Phone Tumble Executive Mobile Briefing */}
      <section className="g3-sec g3-sec--hero" aria-labelledby="ag-hero-h">
        <div className="g3-container g3-hero-grid">
          <div className="g3-hero-copy">
            <span className="g3-badge g3-badge--gold">TIME DE AGENTES CORPORATIVOS</span>
            <h1 id="ag-hero-h" className="g3-h1" style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)" }}>
              Squads treinados nas <span className="g3-accent-purple">regras reais</span> do seu negócio.
            </h1>
            <p className="g3-lede">
              Cada squad monitora seus ERPs 24/7, valida anomalias com prova documental e envia decisões mastigadas
              direto para o celular da diretoria aprovar em 1 clique.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link href="/planos" className="g3-btn g3-btn--gold">
                Contratar Meu Time de Agentes
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/dashboard" className="g3-btn g3-btn--ghost">
                Ver Dashboard Live
              </Link>
            </div>
          </div>

          <div className="g3-card g3-card--purple" style={{ padding: "1.75rem", display: "grid", gap: "0.75rem", justifyItems: "center" }}>
            <span className="g3-badge">APROVAÇÃO MOBILE · HUMAN-IN-THE-LOOP</span>
            <PhoneTumblePreview />
          </div>
        </div>
      </section>

      {/* Full Interactive 5-Squad Playbook Command Center */}
      <GothamSquadsV2 />
    </GothamShell>
  );
}
