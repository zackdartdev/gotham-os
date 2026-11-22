"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldAlert, Activity, Lock, Server, Cloud, RotateCcw } from "lucide-react";
import { GothamShell } from "./GothamShell";
import { VenueTopologyMap, IsoWaveVisualizer } from "./MotionShowcase";

interface AlertItem {
  id: string;
  squad: string;
  title: string;
  source: string;
  impactBRL: number;
  actionLabel: string;
  hash: string;
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: "al-1",
    squad: "FINANCEIRO",
    title: "Divergência ICMS-ST (+6,8%) na NF #88412",
    source: "Protheus SE2 · XML Fornecedor",
    impactBRL: 41200,
    actionLabel: "Bloquear Liquidação",
    hash: "sha256:9f84c1a8...e02a",
  },
  {
    id: "al-2",
    squad: "OPERAÇÕES",
    title: "7 SKUs Curva A em risco de ruptura (D+9)",
    source: "ERP Sênior · Estoque Filial SP",
    impactBRL: 28500,
    actionLabel: "Disparar RFQ 3 Fornecedores",
    hash: "sha256:4b12d9e4...7c11",
  },
  {
    id: "al-3",
    squad: "CLÍNICO",
    title: "28 guias TISS com divergência CID/TUSS",
    source: "Tasy / 4medic · Pré-Faturamento",
    impactBRL: 19800,
    actionLabel: "Corrigir Lote TISS",
    hash: "sha256:c703a5f1...19b8",
  },
  {
    id: "al-4",
    squad: "JURÍDICO",
    title: "Cláusula 11.4 sem teto de multa no aditivo #409",
    source: "Contrato Logístico · PDF 42 págs.",
    impactBRL: 64000,
    actionLabel: "Enviar Redline Jurídico",
    hash: "sha256:e291f0b7...54dd",
  },
];

export function DashboardView() {
  const [approved, setApproved] = useState<string[]>(["al-1"]);
  const [clusterMode, setClusterMode] = useState<"onprem" | "vpc">("onprem");

  const toggleApprove = (id: string) => {
    setApproved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const totalProtected = INITIAL_ALERTS.filter((a) => approved.includes(a.id)).reduce((s, a) => s + a.impactBRL, 0);

  return (
    <GothamShell>
      <section className="g3-sec g3-sec--hero" aria-labelledby="dash-h">
        <div className="g3-container" style={{ display: "grid", gap: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <span className="g3-badge g3-badge--gold">
                <Activity size={13} /> DASHBOARD LIVE · SIMULAÇÃO INTERATIVA
              </span>
              <h1 id="dash-h" className="g3-h1" style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
                Centro de Comando <span className="g3-accent-gold">GothamOS</span>
              </h1>
              <p className="g3-lede" style={{ maxWidth: "42rem" }}>
                Aprove ações abaixo para ver o <strong>valor protegido</strong>, a <strong>trilha SHA-256</strong> e o
                status do cluster atualizarem em tempo real.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setClusterMode("onprem")}
                className={`g3-btn g3-btn--sm ${clusterMode === "onprem" ? "g3-btn--gold" : "g3-btn--ghost"}`}
              >
                <Server size={14} /> On-Premise vLLM
              </button>
              <button
                type="button"
                onClick={() => setClusterMode("vpc")}
                className={`g3-btn g3-btn--sm ${clusterMode === "vpc" ? "g3-btn--purple" : "g3-btn--ghost"}`}
              >
                <Cloud size={14} /> Private VPC
              </button>
            </div>
          </div>

          {/* Live KPI Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "0.95rem" }}>
            <motion.div className="g3-card g3-card--gold" style={{ padding: "1.25rem" }} layout>
              <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.68rem", color: "var(--g3-gold)" }}>
                VALOR PROTEGIDO (SESSÃO)
              </span>
              <div style={{ fontSize: "1.95rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>
                R$ {totalProtected.toLocaleString("pt-BR")}
              </div>
              <span style={{ fontSize: "0.78rem", color: "#34d399" }}>
                {approved.length}/{INITIAL_ALERTS.length} ações executivas aprovadas
              </span>
            </motion.div>

            <div className="g3-card" style={{ padding: "1.25rem" }}>
              <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.68rem", color: "#c084fc" }}>
                LATÊNCIA DE INFERÊNCIA
              </span>
              <div style={{ fontSize: "1.95rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>
                {clusterMode === "onprem" ? "142 ms" : "218 ms"}
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--g3-muted)" }}>
                {clusterMode === "onprem" ? "vLLM Local · 2x GPU 48GB" : "VPC sa-east-1 · Inference Router"}
              </span>
            </div>

            <div className="g3-card" style={{ padding: "1.25rem" }}>
              <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.68rem", color: "#c084fc" }}>
                VAZAMENTO EXTERNO
              </span>
              <div style={{ fontSize: "1.95rem", fontWeight: 800, color: "var(--g3-gold)", marginTop: "0.25rem" }}>
                0 Bytes
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--g3-muted)" }}>
                {clusterMode === "onprem" ? "Air-Gap Local · LGPD Estrita" : "Zero-Data-Retention + KMS"}
              </span>
            </div>

            <div className="g3-card" style={{ padding: "1.25rem" }}>
              <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.68rem", color: "#c084fc" }}>
                CUSTO VARIÁVEL API
              </span>
              <div style={{ fontSize: "1.95rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>
                {clusterMode === "onprem" ? "R$ 0,00" : "-62%"}
              </div>
              <span style={{ fontSize: "0.78rem", color: "var(--g3-muted)" }}>
                {clusterMode === "onprem" ? "Hardware próprio amortizado" : "Cache semântico + roteamento"}
              </span>
            </div>
          </div>

          {/* Interactive Approval Queue + Live Audit Log */}
          <div className="g3-map-grid">
            <div className="g3-card g3-card--purple" style={{ padding: "1.5rem", display: "grid", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>Fila de Aprovação Human-in-the-Loop</h2>
                  <p style={{ margin: "0.2rem 0 0", fontSize: "0.84rem", color: "var(--g3-muted)" }}>
                    Clique nos botões para aprovar ou reverter ações reais dos squads.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setApproved([])}
                  className="g3-btn g3-btn--ghost g3-btn--sm"
                >
                  <RotateCcw size={13} /> Resetar
                </button>
              </div>

              <div style={{ display: "grid", gap: "0.75rem" }}>
                {INITIAL_ALERTS.map((item) => {
                  const isOk = approved.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      style={{
                        padding: "1rem",
                        borderRadius: "1rem",
                        border: `1px solid ${isOk ? "rgba(52, 211, 153, 0.45)" : "var(--g3-border)"}`,
                        background: isOk ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.03)",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.9rem",
                      }}
                    >
                      <div style={{ display: "grid", gap: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span className="g3-badge g3-badge--gold">{item.squad}</span>
                          <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.72rem", color: "var(--g3-muted)" }}>
                            {item.source}
                          </span>
                        </div>
                        <strong style={{ fontSize: "0.98rem", color: "#fff" }}>{item.title}</strong>
                        <span style={{ fontSize: "0.82rem", color: "var(--g3-gold)", fontWeight: 700 }}>
                          Impacto estimado: R$ {item.impactBRL.toLocaleString("pt-BR")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleApprove(item.id)}
                        className={`g3-btn g3-btn--sm ${isOk ? "g3-btn--ghost" : "g3-btn--gold"}`}
                      >
                        {isOk ? (
                          <>
                            <CheckCircle2 size={15} color="#34d399" /> Aprovado
                          </>
                        ) : (
                          <>
                            <ShieldAlert size={15} /> {item.actionLabel}
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Audit Trail + Iso-Wave */}
            <div className="g3-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1.25rem" }}>
              <div style={{ display: "grid", gap: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="g3-badge">
                    <Lock size={12} /> TRILHA IMUTÁVEL CLICKHOUSE
                  </span>
                  <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.7rem", color: "#34d399" }}>
                    WORM ATIVO
                  </span>
                </div>

                <div
                  style={{
                    padding: "1rem",
                    borderRadius: "0.95rem",
                    background: "#050508",
                    border: "1px solid var(--g3-border-purple)",
                    fontFamily: "var(--site-font-mono)",
                    fontSize: "0.74rem",
                    lineHeight: 1.7,
                    minHeight: "175px",
                  }}
                >
                  {approved.length === 0 ? (
                    <span style={{ color: "var(--g3-dim)" }}>
                      Aguardando aprovação na fila ao lado para selar o próximo registro SHA-256...
                    </span>
                  ) : (
                    INITIAL_ALERTS.filter((a) => approved.includes(a.id)).map((a) => (
                      <div key={a.id} style={{ marginBottom: "0.45rem" }}>
                        <span style={{ color: "#34d399" }}>[OK]</span>{" "}
                        <span style={{ color: "var(--g3-gold)" }}>{a.squad}</span> · {a.actionLabel}
                        <div style={{ color: "#a78bfa", paddingLeft: "1.1rem" }}>{a.hash}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gap: "0.55rem" }}>
                <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.7rem", color: "var(--g3-muted)" }}>
                  CARGA DE INFERÊNCIA · {clusterMode === "onprem" ? "CLUSTER LOCAL GPU" : "ROUTER VPC"}
                </span>
                <IsoWaveVisualizer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Venue Topology Map */}
      <section className="g3-sec" aria-labelledby="topo-h">
        <div className="g3-container" style={{ display: "grid", gap: "1.75rem" }}>
          <div>
            <span className="g3-badge g3-badge--gold">MAPA TOPOLÓGICO INTERATIVO</span>
            <h2 id="topo-h" className="g3-h2" style={{ marginTop: "0.65rem" }}>
              Inspecione cada zona da <span className="g3-accent-purple">rede GothamOS.</span>
            </h2>
          </div>
          <VenueTopologyMap />
        </div>
      </section>
    </GothamShell>
  );
}
