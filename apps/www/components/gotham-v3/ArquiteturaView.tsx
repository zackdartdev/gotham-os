"use client";

import { useState } from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, ArrowUpRight } from "lucide-react";
import { GothamShell } from "./GothamShell";
import { GothamDeployV2 } from "@/components/home/sections/GothamDeployV2";
import { VenueTopologyMap } from "./MotionShowcase";

export function ArquiteturaView() {
  const [users, setUsers] = useState(40);
  const [privacy, setPrivacy] = useState<"airgap" | "vpc">("airgap");

  const spec =
    privacy === "airgap"
      ? users <= 30
        ? {
            tier: "Node Compact On-Premise",
            hw: "1x NVIDIA RTX 4090 / L40 (24–48GB VRAM) · 64GB RAM · NVMe 2TB",
            engine: "Docker Compose + vLLM FP8 + PostgreSQL pgvector",
            deploy: "7 a 10 dias úteis",
          }
        : users <= 120
          ? {
              tier: "Cluster Dedicado On-Premise",
              hw: "2x NVIDIA L40S 48GB (96GB VRAM) · 128GB ECC RAM · NVMe RAID",
              engine: "Kubernetes (k3s) + vLLM Tensor Parallel + ClickHouse",
              deploy: "10 a 14 dias úteis",
            }
          : {
              tier: "Datacenter Sovereign HA",
              hw: "4x NVIDIA H100/L40S · 256GB ECC RAM · Redundância Ativa",
              engine: "Kubernetes HA + vLLM + Air-Gap Zero-Egress",
              deploy: "14 a 21 dias úteis",
            }
      : users <= 50
        ? {
            tier: "Private VPC Compact (AWS/GCP)",
            hw: "VPC Isolada sa-east-1 · 1x G6e / L4 Auto-Scale + RDS pgvector",
            engine: "Terraform + Inference Router Zero-Retention + KMS",
            deploy: "5 a 8 dias úteis",
          }
        : {
            tier: "Private VPC Enterprise Multi-AZ",
            hw: "VPC Multi-AZ · Inference Router Híbrido + VPN IPSec ao ERP",
            engine: "EKS/GKE Privado + Cache Semântico Redis + ClickHouse",
            deploy: "10 a 14 dias úteis",
          };

  return (
    <GothamShell>
      {/* Interactive Hardware & VPC Sizing Calculator */}
      <section className="g3-sec g3-sec--hero" aria-labelledby="arch-h">
        <div className="g3-container" style={{ display: "grid", gap: "2rem" }}>
          <div style={{ display: "grid", gap: "0.75rem", maxWidth: "48rem" }}>
            <span className="g3-badge g3-badge--gold">ARQUITETURA SOBERANA · ZERO GAMBIARRA</span>
            <h1 id="arch-h" className="g3-h1" style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)" }}>
              100% Local <span className="g3-accent-gold">(On-Premise)</span> ou{" "}
              <span className="g3-accent-purple">Nuvem Privada (VPC).</span>
            </h1>
            <p className="g3-lede">
              Esqueça ferramentas desktop como LM Studio. Implantamos containers reais de produção com{" "}
              <strong>vLLM, llama.cpp, Docker/Kubernetes e pgvector</strong> adaptados à realidade do seu TI.
            </p>
          </div>

          <div className="g3-card g3-card--gold" style={{ padding: "1.75rem", display: "grid", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <div>
                <span className="g3-badge g3-badge--gold">
                  <Cpu size={13} /> DIMENSIONADOR DE INFRAESTRUTURA
                </span>
                <h2 style={{ margin: "0.5rem 0 0", fontSize: "1.4rem", fontWeight: 800 }}>
                  Calcule o perfil ideal para a sua operação
                </h2>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={() => setPrivacy("airgap")}
                  className={`g3-btn g3-btn--sm ${privacy === "airgap" ? "g3-btn--gold" : "g3-btn--ghost"}`}
                >
                  100% Local (Air-Gap)
                </button>
                <button
                  type="button"
                  onClick={() => setPrivacy("vpc")}
                  className={`g3-btn g3-btn--sm ${privacy === "vpc" ? "g3-btn--purple" : "g3-btn--ghost"}`}
                >
                  Nuvem Privada (VPC)
                </button>
              </div>
            </div>

            <div className="g3-map-grid">
              <div style={{ display: "grid", gap: "1rem", alignContent: "center" }}>
                <label style={{ display: "grid", gap: "0.5rem" }}>
                  <span style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", fontWeight: 700 }}>
                    <span>Usuários &amp; Analistas simultâneos</span>
                    <span style={{ color: "var(--g3-gold)", fontFamily: "var(--site-font-mono)" }}>{users} pessoas</span>
                  </span>
                  <input
                    type="range"
                    min={10}
                    max={250}
                    step={10}
                    value={users}
                    onChange={(e) => setUsers(Number(e.target.value))}
                    className="g3-slider"
                  />
                </label>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "var(--g3-muted)" }}>
                  <ShieldCheck size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: "0.35rem", color: "#34d399" }} />
                  Em ambos os modos seus dados nunca treinam modelos de terceiros e toda execução fica auditada em SHA-256.
                </p>
              </div>

              <div
                style={{
                  padding: "1.25rem",
                  borderRadius: "1rem",
                  background: "rgba(5, 5, 8, 0.72)",
                  border: "1px solid var(--g3-border-purple)",
                  display: "grid",
                  gap: "0.65rem",
                }}
              >
                <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.7rem", color: "var(--g3-gold)", fontWeight: 700 }}>
                  ARQUITETURA RECOMENDADA · {spec.tier.toUpperCase()}
                </span>
                <div style={{ fontSize: "0.94rem", color: "#fff", fontWeight: 700 }}>{spec.hw}</div>
                <div style={{ fontSize: "0.84rem", color: "#c084fc" }}>{spec.engine}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid var(--g3-border)" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--g3-muted)" }}>Go-Live estimado: {spec.deploy}</span>
                  <Link href="/planos" className="g3-btn g3-btn--gold g3-btn--sm">
                    Ver Planos <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Deploy Protocol & Live Terminal */}
      <GothamDeployV2 />

      {/* Enterprise Topology Map */}
      <section className="g3-sec" aria-labelledby="arch-map-h">
        <div className="g3-container" style={{ display: "grid", gap: "1.75rem" }}>
          <h2 id="arch-map-h" className="g3-h2">
            Perímetro de <span className="g3-accent-purple">Segurança &amp; Dados</span>
          </h2>
          <VenueTopologyMap />
        </div>
      </section>
    </GothamShell>
  );
}
