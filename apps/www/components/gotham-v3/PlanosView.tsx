"use client";

import { useState } from "react";
import { Check, ArrowUpRight, Calculator, Sparkles, ShieldCheck } from "lucide-react";
import { GothamShell } from "./GothamShell";
import { HolographicTicket } from "./MotionShowcase";

type BillingCycle = "semestral" | "anual";

const PLANS = [
  {
    id: "fundacao",
    badge: "FUNDAÇÃO",
    name: "Implantação Base GothamOS",
    desc: "Para empresas que querem sua camada soberana instalada (100% local ou VPC) conectada ao ERP principal.",
    setup: "R$ 18.000",
    monthlySemestral: 4900,
    monthlyAnual: 4150,
    highlighted: false,
    features: [
      "Instalação completa On-Premise (vLLM/Docker) ou Private VPC",
      "1 conector ERP somente-leitura (Protheus, Tasy, Sênior ou SQL)",
      "1 Squad de Agentes em produção (à escolha)",
      "Console Executivo + Trilha de Auditoria SHA-256",
      "Conformidade LGPD + Contrato Formal B2B",
    ],
  },
  {
    id: "multisquad",
    badge: "MAIS ESCOLHIDO · ESCALA",
    name: "Operação Multi-Squad",
    desc: "Nossa entrega principal: plataforma soberana + time completo de agentes operando múltiplas áreas 24/7.",
    setup: "R$ 29.000",
    monthlySemestral: 9800,
    monthlyAnual: 8300,
    highlighted: true,
    features: [
      "Tudo da Fundação + até 3 Squads de Agentes dedicados",
      "Múltiplos conectores ERP + XML NF-e + PDFs contratuais",
      "Aprovação Human-in-the-Loop via Console, Tablet e WhatsApp",
      "Evolução contínua de playbooks, prompts e conectores",
      "SLA corporativo prioritário + reuniões quinzenais com Zack Studios",
    ],
  },
  {
    id: "sovereign",
    badge: "ENTERPRISE AIR-GAP",
    name: "Sovereign Datacenter",
    desc: "Para grupos econômicos, hospitais e indústrias com requisitos rígidos de Air-Gap, SSO e alta disponibilidade.",
    setup: "Sob Projeto",
    monthlySemestral: 0,
    monthlyAnual: 0,
    highlighted: false,
    features: [
      "Todos os 5 Squads + Agentes customizados ilimitados",
      "Cluster Kubernetes HA Multi-GPU ou Multi-AZ VPC dedicado",
      "SSO corporativo (Microsoft Entra ID / Okta) + RBAC avançado",
      "Engenheiro dedicado de arquitetura + treinamento in-company",
      "Auditoria de segurança dedicada e NDA customizado",
    ],
  },
];

const FAQS = [
  {
    q: "Preciso usar LM Studio ou ferramentas de desktop?",
    a: "Não. O GothamOS roda em containers de produção headless (Docker/Kubernetes + vLLM ou llama.cpp no modo On-Premise, ou Terraform + Inference Router na sua VPC), prontos para múltiplos usuários simultâneos 24/7.",
  },
  {
    q: "Meus dados saem da empresa ou treinam modelos de terceiros?",
    a: "Nunca. No modo 100% Local (On-Premise), zero bytes saem da sua rede. No modo Nuvem Privada (VPC), tudo roda na sua própria conta AWS/GCP com contrato de zero retenção e chaves KMS controladas por você.",
  },
  {
    q: "Quanto tempo leva para o primeiro squad começar a gerar retorno?",
    a: "Em média de 10 a 14 dias úteis do diagnóstico até o primeiro squad rodando em produção conectado ao seu ERP com aprovações humanas.",
  },
  {
    q: "Como funciona a formalização e emissão fiscal?",
    a: "Toda contratação é formalizada com Contrato B2B, NDA, política LGPD explícita e emissão regular de Nota Fiscal pela Zack Studios.",
  },
];

export function PlanosView() {
  const [cycle, setCycle] = useState<BillingCycle>("anual");
  const [analysts, setAnalysts] = useState(8);
  const [docsMonth, setDocsMonth] = useState(650);

  // Realistic conservative ROI projection
  const hoursSaved = Math.round(analysts * 22 + docsMonth * 0.18);
  const monthlySavings = Math.round(hoursSaved * 68 + docsMonth * 24);
  const paybackWeeks = Math.max(3, Math.min(10, Math.round(29000 / Math.max(1, monthlySavings / 4))));

  return (
    <GothamShell>
      <section className="g3-sec g3-sec--hero" aria-labelledby="planos-h">
        <div className="g3-container" style={{ display: "grid", gap: "2.25rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1.25rem" }}>
            <div style={{ display: "grid", gap: "0.75rem", maxWidth: "46rem" }}>
              <span className="g3-badge g3-badge--gold">
                <Sparkles size={13} /> PLANOS B2B · IMPLANTAÇÃO + SQUADS
              </span>
              <h1 id="planos-h" className="g3-h1" style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)" }}>
                Investimento claro, <span className="g3-accent-gold">retorno mensurável.</span>
              </h1>
              <p className="g3-lede">
                Sem cobranças surpresa por token. Escolha o modelo ideal para implantar o <strong>GothamOS</strong> e
                operar com squads de agentes sob SLA corporativo.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.45rem", padding: "0.3rem", borderRadius: "999px", border: "1px solid var(--g3-border-purple)", background: "var(--g3-surface)" }}>
              <button
                type="button"
                onClick={() => setCycle("semestral")}
                className={`g3-btn g3-btn--sm ${cycle === "semestral" ? "g3-btn--purple" : "g3-btn--ghost"}`}
                style={{ borderRadius: "999px", border: 0 }}
              >
                Semestral
              </button>
              <button
                type="button"
                onClick={() => setCycle("anual")}
                className={`g3-btn g3-btn--sm ${cycle === "anual" ? "g3-btn--gold" : "g3-btn--ghost"}`}
                style={{ borderRadius: "999px", border: 0 }}
              >
                Anual (-15%)
              </button>
            </div>
          </div>

          {/* 3-Tier Pricing Grid */}
          <div className="g3-pricing-grid">
            {PLANS.map((plan) => {
              const price = cycle === "anual" ? plan.monthlyAnual : plan.monthlySemestral;
              return (
                <div
                  key={plan.id}
                  className={`g3-card g3-plan ${plan.highlighted ? "g3-card--gold" : "g3-card--purple"}`}
                >
                  <div style={{ display: "grid", gap: "1rem" }}>
                    <span className={`g3-badge ${plan.highlighted ? "g3-badge--gold" : ""}`} style={{ width: "fit-content" }}>
                      {plan.badge}
                    </span>
                    <div>
                      <h2 style={{ margin: "0 0 0.4rem", fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>
                        {plan.name}
                      </h2>
                      <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--g3-muted)", lineHeight: 1.55 }}>
                        {plan.desc}
                      </p>
                    </div>

                    <div style={{ paddingBlock: "0.85rem", borderTop: "1px solid var(--g3-border)", borderBottom: "1px solid var(--g3-border)" }}>
                      <div className="g3-plan__price">
                        {price > 0 ? `R$ ${price.toLocaleString("pt-BR")}` : "Sob Consulta"}
                        {price > 0 && (
                          <span style={{ fontSize: "0.88rem", fontWeight: 500, color: "var(--g3-muted)" }}>/mês</span>
                        )}
                      </div>
                      <div style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.74rem", color: "var(--g3-gold)", marginTop: "0.25rem" }}>
                        Setup &amp; Implantação: {plan.setup}
                      </div>
                    </div>

                    <ul className="g3-plan__list">
                      {plan.features.map((f) => (
                        <li key={f}>
                          <Check size={16} color={plan.highlighted ? "#facc15" : "#c084fc"} style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/5521990315582?text=${encodeURIComponent(
                      `Olá Isaac! Tenho interesse no plano ${plan.name} (${cycle}) do GothamOS.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`g3-btn ${plan.highlighted ? "g3-btn--gold" : "g3-btn--purple"}`}
                    style={{ width: "100%" }}
                  >
                    Solicitar Proposta B2B
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive ROI & Economy Estimator */}
      <section className="g3-sec" aria-labelledby="roi-h">
        <div className="g3-container">
          <div className="g3-card g3-card--purple" style={{ padding: "clamp(1.5rem, 3vw, 2.25rem)", display: "grid", gap: "1.75rem" }}>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <span className="g3-badge g3-badge--gold" style={{ width: "fit-content" }}>
                <Calculator size={13} /> SIMULADOR DE ROI OPERACIONAL
              </span>
              <h2 id="roi-h" className="g3-h2" style={{ fontSize: "clamp(1.65rem, 3vw, 2.4rem)" }}>
                Estime o ganho mensal da sua empresa com o <span className="g3-accent-gold">GothamOS</span>
              </h2>
            </div>

            <div className="g3-map-grid">
              <div style={{ display: "grid", gap: "1.25rem" }}>
                <label style={{ display: "grid", gap: "0.5rem" }}>
                  <span style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.92rem" }}>
                    <span>Analistas em rotinas manuais (Financeiro / Ops / Jurídico)</span>
                    <span style={{ color: "var(--g3-gold)", fontFamily: "var(--site-font-mono)" }}>{analysts} pessoas</span>
                  </span>
                  <input
                    type="range"
                    min={2}
                    max={40}
                    value={analysts}
                    onChange={(e) => setAnalysts(Number(e.target.value))}
                    className="g3-slider"
                  />
                </label>

                <label style={{ display: "grid", gap: "0.5rem" }}>
                  <span style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "0.92rem" }}>
                    <span>Notas fiscais, guias ou contratos auditados / mês</span>
                    <span style={{ color: "#c084fc", fontFamily: "var(--site-font-mono)" }}>{docsMonth} docs/mês</span>
                  </span>
                  <input
                    type="range"
                    min={100}
                    max={5000}
                    step={50}
                    value={docsMonth}
                    onChange={(e) => setDocsMonth(Number(e.target.value))}
                    className="g3-slider"
                  />
                </label>

                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--g3-muted)" }}>
                  <ShieldCheck size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "0.35rem", color: "#34d399" }} />
                  Estimativa conservadora baseada em redução de retrabalho + prevenção de glosas e divergências fiscais.
                </p>
              </div>

              <div style={{ display: "grid", gap: "0.85rem" }}>
                <div className="g3-hero-metric" style={{ borderColor: "var(--g3-border-gold)" }}>
                  <strong style={{ fontSize: "2rem" }}>R$ {monthlySavings.toLocaleString("pt-BR")}/mês</strong>
                  <span>Economia + perdas evitadas estimadas</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                  <div className="g3-hero-metric">
                    <strong style={{ color: "#c084fc" }}>{hoursSaved}h/mês</strong>
                    <span>Horas manuais liberadas</span>
                  </div>
                  <div className="g3-hero-metric">
                    <strong>~{paybackWeeks} semanas</strong>
                    <span>Payback médio do setup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Holographic Enterprise Pilot Pass + FAQ */}
      <section className="g3-sec" aria-labelledby="faq-h">
        <div className="g3-container" style={{ display: "grid", gap: "3rem" }}>
          <HolographicTicket />

          <div style={{ display: "grid", gap: "1.25rem" }}>
            <h2 id="faq-h" className="g3-h2" style={{ fontSize: "clamp(1.65rem, 3vw, 2.3rem)" }}>
              Perguntas Frequentes <span className="g3-accent-purple">B2B</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {FAQS.map((item) => (
                <div key={item.q} className="g3-card" style={{ padding: "1.35rem", display: "grid", gap: "0.55rem", alignContent: "start" }}>
                  <strong style={{ fontSize: "1rem", color: "var(--g3-gold)" }}>{item.q}</strong>
                  <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.6, color: "var(--g3-muted)" }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GothamShell>
  );
}
