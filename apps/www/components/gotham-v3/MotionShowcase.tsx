"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  Database,
  GitBranch,
  Bot,
  ShieldCheck,
  Shuffle,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Server,
  Radio,
  Smartphone,
  Sparkles,
} from "lucide-react";

/* ============================================================================
 * 1. ISO-STACK (ref: 21st.dev/iso-stack) — 4 Isometric 3D Floating Planes
 * ========================================================================== */
const ISO_LAYERS = [
  {
    id: "audit",
    num: "CAMADA 04",
    name: "Comando & Auditoria SHA-256",
    sub: "Decisão em 1 clique + log imutável ClickHouse",
    detail:
      "Cada ação executada pelos squads chega ao executivo com prova documental citável e assinatura criptográfica SHA-256 gravada em ClickHouse.",
    metrics: ["100% Rastreável", "WhatsApp + Web", "Write-Back Seguro"],
  },
  {
    id: "agents",
    num: "CAMADA 03",
    name: "Orquestração Multi-Agente",
    sub: "Squads 24/7 rodando em vLLM local ou VPC",
    detail:
      "Agentes especializados (Financeiro, Supply, Jurídico, Clínico e Executivo) validam descobertas entre si antes de disparar qualquer recomendação.",
    metrics: ["Zero Alucinação", "Human-in-the-Loop", "24/7 SLA"],
  },
  {
    id: "ontology",
    num: "CAMADA 02",
    name: "Ontologia & Memória Vetorial",
    sub: "Grafo de entidades + pgvector + RBAC granular",
    detail:
      "Transforma tabelas isoladas de ERPs em um grafo vivo de contratos, faturas, estoques e regras de negócio com controle estrito de permissão.",
    metrics: ["pgvector HNSW", "RBAC / SSO", "Recall 99,2%"],
  },
  {
    id: "ingest",
    num: "CAMADA 01",
    name: "Conectores ERP & Borda LGPD",
    sub: "Protheus, Tasy, Sênior, 4medic · Read-Only",
    detail:
      "Leitura incremental somente-leitura nos seus bancos e ERPs legados com mascaramento automático de dados sensíveis (PII) na borda.",
    metrics: ["0 Bytes Externos", "< 420ms Sync", "Read-Only"],
  },
];

export function IsoStack3D() {
  const [active, setActive] = useState(0);
  const current = ISO_LAYERS[active] ?? ISO_LAYERS[0]!;

  return (
    <div className="g3-iso-wrap">
      <div className="g3-iso-stage" aria-label="Pilha isométrica interativa das 4 camadas do GothamOS">
        <div className="g3-iso-stack">
          {ISO_LAYERS.map((layer, idx) => {
            const isSel = idx === active;
            const baseZ = (3 - idx) * 44;
            const liftZ = isSel ? baseZ + 28 : idx < active ? baseZ + 14 : baseZ - 6;
            return (
              <motion.button
                key={layer.id}
                type="button"
                className={`g3-iso-layer ${isSel ? "g3-iso-layer--active" : ""}`}
                onClick={() => setActive(idx)}
                onMouseEnter={() => setActive(idx)}
                animate={{
                  z: liftZ,
                  scale: isSel ? 1.04 : 1,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                style={{ zIndex: 10 - idx }}
              >
                <span className="g3-iso-layer__num">{layer.num}</span>
                <div>
                  <div className="g3-iso-layer__name">{layer.name}</div>
                  <div className="g3-iso-layer__sub">{layer.sub}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="g3-card g3-card--purple" style={{ padding: "1.75rem", display: "grid", gap: "1.1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span className="g3-badge g3-badge--gold">{current.num}</span>
          <div style={{ display: "flex", gap: "0.35rem" }}>
            {ISO_LAYERS.map((l, i) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setActive(i)}
                className="g3-btn g3-btn--sm"
                style={{
                  padding: "0.3rem 0.6rem",
                  background: i === active ? "var(--g3-gold)" : "rgba(255,255,255,0.06)",
                  color: i === active ? "#050508" : "#ffffff",
                }}
              >
                0{4 - i}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24 }}
            style={{ display: "grid", gap: "1rem" }}
          >
            <h3 style={{ margin: 0, fontSize: "1.55rem", fontWeight: 800, color: "#fff" }}>{current.name}</h3>
            <p className="g3-lede" style={{ fontSize: "0.96rem" }}>
              {current.detail}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {current.metrics.map((m) => (
                <span key={m} className="g3-badge">
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={{ paddingTop: "0.5rem" }}>
          <Link href="/arquitetura" className="g3-btn g3-btn--ghost g3-btn--sm">
            Explorar Arquitetura Completa
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2. MG-DEV-LAPTOP & MG-DEV-TABLET — Multi-Device Synchronized Dashboard Preview
 * ========================================================================== */
const DEVICE_VIEWS = {
  financeiro: {
    label: "Financeiro",
    kpiA: "R$ 41.200",
    kpiALabel: "Divergência ICMS-ST evitada",
    kpiB: "99,4%",
    kpiBLabel: "Conciliação Protheus",
    alert: "NF #88412 retida preventivamente · alíquota 6,8% acima do contrato",
    tabletTitle: "Aprovação CFO",
    tabletStatus: "1 ação pendente · R$ 41,2k",
  },
  operacoes: {
    label: "Operações",
    kpiA: "7 SKUs",
    kpiALabel: "Ruptura prevista em 9 dias",
    kpiB: "-54%",
    kpiBLabel: "Queda em estoque zerado",
    alert: "3 cotações equalizadas automaticamente com menor TCO e prazo D+4",
    tabletTitle: "Painel Supply",
    tabletStatus: "SLA logístico em 97,8%",
  },
  clinico: {
    label: "Clínico",
    kpiA: "28 Guias",
    kpiALabel: "Glosas corrigidas pré-envio",
    kpiB: "0 Bytes",
    kpiBLabel: "Saída de dados de paciente",
    alert: "Auditoria Tasy/4medic concluída 100% On-Premise antes do faturamento TISS",
    tabletTitle: "Faturamento TISS",
    tabletStatus: "-42% glosas neste mês",
  },
} as const;

type DeviceTab = keyof typeof DEVICE_VIEWS;

export function MultiDevicePreview() {
  const [tab, setTab] = useState<DeviceTab>("financeiro");
  const view = DEVICE_VIEWS[tab];

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
          {(Object.keys(DEVICE_VIEWS) as DeviceTab[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`g3-btn g3-btn--sm ${tab === k ? "g3-btn--gold" : "g3-btn--ghost"}`}
            >
              {DEVICE_VIEWS[k].label}
            </button>
          ))}
        </div>
        <Link href="/dashboard" className="g3-btn g3-btn--purple g3-btn--sm">
          Abrir Dashboard Interativo Completo
          <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="g3-devices-stage">
        {/* Laptop Mockup */}
        <motion.div
          className="g3-laptop"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <div className="g3-laptop__lid">
            <div className="g3-laptop__screen">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="g3-badge g3-badge--gold">GOTHAM CONSOLE · DESKTOP</span>
                <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.72rem", color: "#34d399" }}>
                  ● vLLM ONLINE · 142ms
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  style={{ display: "grid", gap: "0.85rem" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div className="g3-hero-metric">
                      <strong>{view.kpiA}</strong>
                      <span>{view.kpiALabel}</span>
                    </div>
                    <div className="g3-hero-metric">
                      <strong style={{ color: "#c084fc" }}>{view.kpiB}</strong>
                      <span>{view.kpiBLabel}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "0.9rem 1rem",
                      borderRadius: "0.85rem",
                      borderLeft: "3px solid var(--g3-gold)",
                      background: "rgba(250, 204, 21, 0.08)",
                      fontSize: "0.88rem",
                      color: "#fff",
                    }}
                  >
                    <div style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.68rem", color: "var(--g3-gold)", marginBottom: "0.25rem" }}>
                      ALERTA PRIORITÁRIO · SQUAD {view.label.toUpperCase()}
                    </div>
                    {view.alert}
                  </div>
                  <IsoWaveVisualizer compact />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="g3-laptop__base">
            <span className="g3-laptop__notch" />
          </div>
        </motion.div>

        {/* Tablet Mockup */}
        <motion.div
          className="g3-tablet-frame"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <div className="g3-tablet-screen">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="g3-badge">TABLET EXEC</span>
              <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.7rem", color: "var(--g3-gold)" }}>
                07:30 BRT
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`tab-${tab}`}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", gap: "0.75rem" }}
              >
                <div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>{view.tabletTitle}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--g3-muted)", marginTop: "0.2rem" }}>
                    {view.tabletStatus}
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.8rem",
                    borderRadius: "0.8rem",
                    background: "rgba(139, 92, 246, 0.14)",
                    border: "1px solid var(--g3-border-purple)",
                    fontSize: "0.8rem",
                    color: "#fff",
                  }}
                >
                  ✓ Trilha SHA-256 pronta para auditoria
                  <br />✓ RBAC Diretoria autenticado
                </div>
                <Link href="/dashboard" className="g3-btn g3-btn--gold g3-btn--sm" style={{ width: "100%" }}>
                  Testar Aprovação ao Vivo
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3. MG-WALL-SHUFFLE — Interactive Kinetic Agent Card Shuffle Deck
 * ========================================================================== */
const SHUFFLE_SQUADS = [
  {
    id: "fin",
    badge: "SQUAD 01 · FINANCEIRO",
    title: "Auditoria Fiscal & Conciliação",
    impact: "R$ 41k/mês recuperados em média",
    desc: "Cruza NF-e, ICMS-ST, títulos SE1/SE2 do Protheus e extratos bancários com bloqueio preventivo de duplicidades.",
    tags: ["Protheus", "XML NF-e", "OFX", "Approval Gate"],
  },
  {
    id: "ops",
    badge: "SQUAD 02 · OPERAÇÕES",
    title: "Supply Chain & Previsão de Ruptura",
    impact: "-54% em rupturas de estoque",
    desc: "Monitora cobertura real por SKU e equaliza cotações de fornecedores em PDF/planilha automaticamente.",
    tags: ["ERP Sênior", "OCR Cotações", "Lead Time"],
  },
  {
    id: "jur",
    badge: "SQUAD 03 · JURÍDICO",
    title: "Contratos, Prazos & LGPD",
    impact: "Triagem de 40 págs. em 3 min",
    desc: "Compara contratos recebidos contra o playbook jurídico da empresa e gera redlines citáveis com 0 vazamento.",
    tags: ["Clause Diff", "pgvector", "Zero-Egress"],
  },
  {
    id: "cli",
    badge: "SQUAD 04 · CLÍNICO",
    title: "Auditoria TISS & Glosas Zero",
    impact: "-42% glosas pré-faturamento",
    desc: "Conectado a Tasy e 4medic rodando 100% On-Premise dentro do hospital para validar CID/TUSS e OPME.",
    tags: ["Tasy", "4medic", "TISS/TUSS", "On-Prem"],
  },
];

export function CardShuffleDeck() {
  const [cards, setCards] = useState(SHUFFLE_SQUADS);

  const shuffleNext = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return first ? [...rest, first] : prev;
    });
  };

  const front = cards[0]!;

  return (
    <div className="g3-shuffle-grid">
      <div style={{ display: "grid", gap: "1rem", justifyItems: "start" }}>
        <span className="g3-badge g3-badge--gold">SQUADS AUTÔNOMOS · DECK INTERATIVO</span>
        <h2 className="g3-h2">
          Cada departamento ganha um <span className="g3-accent-purple">time de agentes</span> dedicado.
        </h2>
        <p className="g3-lede">
          Clique no card ao lado para embaralhar os squads e ver o retorno operacional real de cada frente — ou abra a
          página completa para inspecionar cada playbook passo a passo.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
          <button type="button" onClick={shuffleNext} className="g3-btn g3-btn--gold">
            <Shuffle size={16} />
            Próximo Squad ({front.badge.slice(0, 8)})
          </button>
          <Link href="/agentes" className="g3-btn g3-btn--ghost">
            Ver Todos os 5 Squads
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="g3-shuffle-deck" aria-label="Baralho interativo de squads">
        <AnimatePresence mode="popLayout">
          {cards.slice(0, 3).map((card, idx) => (
            <motion.div
              key={card.id}
              className="g3-shuffle-card"
              onClick={shuffleNext}
              layout
              initial={{ scale: 0.88, y: 40, opacity: 0 }}
              animate={{
                scale: 1 - idx * 0.055,
                y: idx * 18,
                rotate: idx === 0 ? 0 : idx === 1 ? 2.8 : -2.6,
                opacity: 1 - idx * 0.18,
                zIndex: 10 - idx,
              }}
              exit={{ x: 180, rotate: 14, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              style={{
                borderColor: idx === 0 ? "var(--g3-gold)" : "var(--g3-border-purple)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8rem" }}>
                <span className="g3-badge g3-badge--gold">{card.badge}</span>
                <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.72rem", color: "var(--g3-muted)" }}>
                  CLIQUE P/ TROCAR →
                </span>
              </div>
              <h3 style={{ margin: "0 0 0.4rem", fontSize: "1.35rem", fontWeight: 800, color: "#fff" }}>{card.title}</h3>
              <div style={{ color: "var(--g3-gold)", fontWeight: 700, fontSize: "0.94rem", marginBottom: "0.7rem" }}>
                {card.impact}
              </div>
              <p className="g3-lede" style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
                {card.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {card.tags.map((t) => (
                  <span key={t} className="g3-badge">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================================
 * 4. PHONE-TUMBLE — 3D Executive Smartphone Briefing Preview
 * ========================================================================== */
export function PhoneTumblePreview() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="g3-phone-stage">
      <motion.div
        className="g3-phone"
        initial={{ rotateY: -22, rotateX: 12, rotateZ: -4 }}
        whileInView={{ rotateY: -8, rotateX: 6, rotateZ: -1 }}
        whileHover={{ rotateY: 4, rotateX: 2, rotateZ: 0, scale: 1.03 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        <div className="g3-phone__screen">
          <div className="g3-phone__island" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.72rem", color: "var(--g3-muted)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", color: "#fff", fontWeight: 700 }}>
              <Smartphone size={12} color="#facc15" /> Gotham Sentinel
            </span>
            <span>Agora</span>
          </div>

          <div
            style={{
              padding: "0.85rem",
              borderRadius: "0.95rem",
              background: "rgba(139, 92, 246, 0.16)",
              border: "1px solid var(--g3-border-purple)",
              display: "grid",
              gap: "0.45rem",
            }}
          >
            <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.66rem", color: "var(--g3-gold)", fontWeight: 700 }}>
              BRIEFING EXECUTIVO · CFO
            </span>
            <strong style={{ fontSize: "0.88rem", color: "#fff" }}>
              NF #88412 com divergência fiscal de R$ 41.200
            </strong>
            <span style={{ fontSize: "0.76rem", color: "var(--g3-muted)", lineHeight: 1.45 }}>
              Evidência anexada (XML + Contrato #409). Deseja bloquear liquidação no Protheus?
            </span>
          </div>

          <button
            type="button"
            onClick={() => setApproved((v) => !v)}
            className={`g3-btn g3-btn--sm ${approved ? "g3-btn--purple" : "g3-btn--gold"}`}
            style={{ width: "100%" }}
          >
            <CheckCircle2 size={15} />
            {approved ? "Bloqueio Aprovado · SHA-256" : "Aprovar em 1 Clique"}
          </button>

          <div style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.65rem", color: approved ? "#34d399" : "var(--g3-dim)", textAlign: "center" }}>
            {approved ? "HASH: 9f84c1a8...e02a GRAVADO" : "AGUARDANDO CONFIRMAÇÃO HUMAN-IN-THE-LOOP"}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================================
 * 5. MG-WALL-ISO-WAVE — Animated Telemetry Pillar Wave
 * ========================================================================== */
const BAR_SEEDS = [38, 62, 85, 54, 92, 74, 46, 88, 96, 68, 52, 82, 90, 60, 44, 78];

export function IsoWaveVisualizer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="g3-isowave" style={compact ? { height: "86px", padding: "0.65rem 0.8rem" } : undefined} aria-hidden="true">
      {BAR_SEEDS.map((h, i) => (
        <motion.span
          key={i}
          className="g3-isowave__bar"
          animate={{
            height: [`${Math.max(18, h - 24)}%`, `${h}%`, `${Math.max(22, h - 18)}%`],
          }}
          transition={{
            duration: 1.8 + (i % 4) * 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.08,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================================
 * 6. MG-EVENT-TICKET — Interactive Holographic Enterprise Pilot Pass
 * ========================================================================== */
export function HolographicTicket() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -ny * 9, ry: nx * 11 });
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        className="g3-ticket"
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <div className="g3-ticket__main">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", alignItems: "center" }}>
            <span className="g3-badge g3-badge--gold">
              <Sparkles size={12} /> ENTERPRISE PILOT PASS · 2026
            </span>
            <span className="g3-badge">ON-PREMISE OU PRIVATE VPC</span>
          </div>

          <h3 style={{ margin: 0, fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)", fontWeight: 800, color: "#fff", lineHeight: 1.08 }}>
            Agende o Diagnóstico &amp; Piloto <span className="g3-accent-gold">GothamOS</span>
          </h3>

          <p className="g3-lede" style={{ fontSize: "0.95rem" }}>
            Sessão técnica direta com <strong>Isaac Lamego (Zack Studios)</strong> para mapear seus ERPs, dimensionar
            hardware local ou VPC e colocar o primeiro squad de agentes em produção em até 14 dias.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", fontFamily: "var(--site-font-mono)", fontSize: "0.75rem", color: "#e9d5ff" }}>
            <span>● CONTRATO FORMAL B2B</span>
            <span>● CONFORMIDADE LGPD</span>
            <span>● ZERO VAZAMENTO</span>
          </div>
        </div>

        <div className="g3-ticket__perf" aria-hidden="true" />

        <div className="g3-ticket__stub">
          <div style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.72rem", color: "var(--g3-gold)", fontWeight: 700 }}>
            PASS #GTH-2026-B2B
          </div>
          <div className="g3-barcode" aria-hidden="true" />
          <a
            href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20ativar%20o%20Enterprise%20Pilot%20Pass%20do%20GothamOS."
            target="_blank"
            rel="noopener noreferrer"
            className="g3-btn g3-btn--gold"
            style={{ width: "100%" }}
          >
            Ativar Piloto Agora
            <ArrowUpRight size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================================
 * 7. MG-EVENT-VENUE-MAP — Interactive Enterprise Topology Map
 * ========================================================================== */
const TOPO_NODES = [
  {
    id: "erps",
    zone: "ZONA 01",
    title: "ERPs & Fontes Legadas",
    icon: Database,
    status: "CONECTADO · READ-ONLY",
    spec: "Protheus, Tasy, ERP Sênior, 4medic, SQL Server, Oracle e pastas fiscais XML/PDF.",
    latency: "380ms sync",
    security: "Credencial somente-leitura",
  },
  {
    id: "lgpd",
    zone: "ZONA 02",
    title: "Borda LGPD & Sanitização",
    icon: ShieldCheck,
    status: "ZERO-EGRESS ATIVO",
    spec: "Tokenização automática de CPFs, dados clínicos e segredos comerciais antes de qualquer inferência.",
    latency: "18ms filtro",
    security: "mTLS 1.3 + Mascaramento PII",
  },
  {
    id: "vllm",
    zone: "ZONA 03",
    title: "Cluster vLLM / VPC Router",
    icon: Cpu,
    status: "INFERÊNCIA DEDICADA",
    spec: "Execução local em GPU (vLLM/llama.cpp) ou roteamento privado multi-modelo na sua AWS/GCP VPC.",
    latency: "142ms TTFT",
    security: "Zero retenção garantida",
  },
  {
    id: "ontology",
    zone: "ZONA 04",
    title: "Ontologia & pgvector",
    icon: GitBranch,
    status: "184K ENTIDADES",
    spec: "Grafo semântico relacionando contratos, faturas, estoques e regras de negócio com busca híbrida.",
    latency: "24ms query",
    security: "RBAC por diretoria",
  },
  {
    id: "squads",
    zone: "ZONA 05",
    title: "5 Squads Autônomos",
    icon: Bot,
    status: "24/7 EM OPERAÇÃO",
    spec: "Times Financeiro, Operações, Jurídico, Clínico e Executivo executando playbooks auditáveis.",
    latency: "1.1s P95",
    security: "Human-in-the-Loop",
  },
  {
    id: "audit",
    zone: "ZONA 06",
    title: "ClickHouse & Comando",
    icon: Radio,
    status: "TRILHA SHA-256",
    spec: "Entrega de vereditos no Console, Tablet e WhatsApp com hash criptográfico imutável de auditoria.",
    latency: "Tempo Real",
    security: "Log Imutável WORM",
  },
];

export function VenueTopologyMap() {
  const [selected, setSelected] = useState(TOPO_NODES[2]!.id);
  const node = TOPO_NODES.find((n) => n.id === selected) ?? TOPO_NODES[0]!;

  return (
    <div className="g3-map-grid">
      <div className="g3-card g3-map-canvas" role="tablist" aria-label="Mapa interativo de zonas da arquitetura GothamOS">
        {TOPO_NODES.map((n) => {
          const Icon = n.icon;
          const isSel = n.id === selected;
          return (
            <button
              key={n.id}
              type="button"
              role="tab"
              aria-selected={isSel}
              className={`g3-map-node ${isSel ? "g3-map-node--active" : ""}`}
              onClick={() => setSelected(n.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.66rem", color: "var(--g3-gold)", fontWeight: 700 }}>
                  {n.zone}
                </span>
                <Icon size={16} color={isSel ? "#facc15" : "#c084fc"} />
              </div>
              <strong style={{ fontSize: "0.94rem" }}>{n.title}</strong>
              <span style={{ fontFamily: "var(--site-font-mono)", fontSize: "0.65rem", color: "#34d399" }}>
                ● {n.status}
              </span>
            </button>
          );
        })}
      </div>

      <div className="g3-card g3-card--gold" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="g3-badge g3-badge--gold">{node.zone} · INSPEÇÃO AO VIVO</span>
            <Server size={16} color="#facc15" />
          </div>
          <h3 style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#fff" }}>{node.title}</h3>
          <p className="g3-lede" style={{ fontSize: "0.92rem" }}>
            {node.spec}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
          <div className="g3-hero-metric">
            <strong style={{ fontSize: "1.05rem" }}>{node.latency}</strong>
            <span>Performance</span>
          </div>
          <div className="g3-hero-metric">
            <strong style={{ fontSize: "0.95rem", color: "#c084fc" }}>{node.security}</strong>
            <span>Blindagem</span>
          </div>
        </div>
      </div>
    </div>
  );
}
