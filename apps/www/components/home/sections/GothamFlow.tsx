"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Database, GitBranch, Bot, ShieldCheck, Activity } from "lucide-react";
import { GuideStop } from "@/components/home/Guide";

interface FlowLayer {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  icon: typeof Database;
  pipeline: { label: string; title: string; detail: string }[];
  trace: { ts: string; tag: string; msg: string }[];
  metrics: { label: string; value: string }[];
}

const LAYERS: FlowLayer[] = [
  {
    id: "ingest",
    num: "01 · INGESTÃO",
    title: "Conectores Somente-Leitura & Sanitização LGPD",
    shortDesc:
      "Conecta diretamente a ERPs (Protheus, Tasy, Sênior, 4medic), bancos SQL, NF-es e PDFs sem alterar seus sistemas legados.",
    icon: Database,
    pipeline: [
      { label: "Fontes", title: "ERPs & Bancos", detail: "Protheus, Tasy, Sênior, PostgreSQL, REST/SOAP" },
      { label: "Filtro", title: "Mascaramento PII", detail: "CPFs, chaves e dados sensíveis tokenizados na borda" },
      { label: "Saída", title: "Stream Normalizado", detail: "Eventos tipados via Redis Streams com zero perda" },
    ],
    trace: [
      { ts: "09:14:02.11", tag: "CONNECTOR", msg: "Sync incremental Protheus (SE2/SF1) · 1.482 registros lidos" },
      { ts: "09:14:02.38", tag: "LGPD-GUARD", msg: "38 campos PII sanitizados antes da indexação semântica" },
      { ts: "09:14:02.52", tag: "STREAM-OK", msg: "Lote publicado no barramento interno · 0 bytes fora do perímetro" },
    ],
    metrics: [
      { label: "Latência de Sync", value: "< 420ms" },
      { label: "Vazamento Externo", value: "0 Bytes" },
      { label: "Modo de Acesso", value: "Read-Only" },
    ],
  },
  {
    id: "ontology",
    num: "02 · ONTOLOGIA",
    title: "Grafo Operacional & Memória Vetorial",
    shortDesc:
      "Transforma tabelas fragmentadas em entidades vivas (Clientes, Contratos, Notas, Estoque, Pacientes) com regras de negócio explícitas.",
    icon: GitBranch,
    pipeline: [
      { label: "Entidades", title: "Grafo de Domínio", detail: "Relaciona pedidos, contratos, centros de custo e SLAs" },
      { label: "Busca", title: "RAG Híbrido", detail: "pgvector + busca lexical SQL com citação exata da fonte" },
      { label: "Política", title: "RBAC Granular", detail: "Cada perfil enxerga apenas o escopo autorizado" },
    ],
    trace: [
      { ts: "09:14:03.04", tag: "ONTOLOGY", msg: "Vinculados 42 contratos ativos ↔ 118 faturas ↔ 9 fornecedores" },
      { ts: "09:14:03.29", tag: "PGVECTOR", msg: "Índice HNSW atualizado · recall@10 = 99.2% sobre base contratual" },
      { ts: "09:14:03.41", tag: "RBAC", msg: "Escopo aplicado: Diretoria Financeira + Auditoria Interna" },
    ],
    metrics: [
      { label: "Precisão de Fonte", value: "100% Citável" },
      { label: "Motor Vetorial", value: "pgvector" },
      { label: "Controle de Acesso", value: "RBAC / SSO" },
    ],
  },
  {
    id: "agents",
    num: "03 · ORQUESTRAÇÃO",
    title: "Time de Agentes Autônomos com Aprovação Humana",
    shortDesc:
      "Squads especializados rodam 24/7 em vLLM local ou VPC privada, cruzando anomalias, redigindo pareceres e propondo ações.",
    icon: Bot,
    pipeline: [
      { label: "Inferência", title: "vLLM / Router", detail: "Modelos open-weights locais ou roteamento seguro em VPC" },
      { label: "Execução", title: "Playbooks Multi-Agente", detail: "Agentes verificam uns aos outros antes de emitir alerta" },
      { label: "Gate", title: "Human-in-the-Loop", detail: "Ações críticas exigem 1 clique de aprovação executiva" },
    ],
    trace: [
      { ts: "09:14:04.12", tag: "SQUAD-FIN", msg: "Detectada divergência de 6,8% em alíquota ICMS-ST na NF #88412" },
      { ts: "09:14:04.64", tag: "VERIFIER", msg: "Prova documental anexada · impacto mensal estimado: R$ 41.200" },
      { ts: "09:14:04.88", tag: "APPROVAL", msg: "Ação sugerida enviada ao Controller com botão de aprovação" },
    ],
    metrics: [
      { label: "Operação Contínua", value: "24/7 SLA" },
      { label: "Alucinação Tolerada", value: "Zero (Evidência)" },
      { label: "Aprovação Crítica", value: "1-Click Gate" },
    ],
  },
  {
    id: "command",
    num: "04 · COMANDO",
    title: "Decisão Executiva & Trilha de Auditoria Imutável",
    shortDesc:
      "Cada veredito chega mastigado no Console, WhatsApp ou Slack com evidência rastreável e log criptográfico completo.",
    icon: ShieldCheck,
    pipeline: [
      { label: "Entrega", title: "Console & Mensageria", detail: "Briefing executivo no painel tátil, WhatsApp ou Slack" },
      { label: "Ação", title: "Write-Back Seguro", detail: "Dispara bloqueios, pedidos ou chamados após aprovação" },
      { label: "Compliance", title: "Log Imutável", detail: "Hash SHA-256 de cada prompt, ferramenta e decisão" },
    ],
    trace: [
      { ts: "09:14:06.05", tag: "DISPATCH", msg: "Resumo executivo entregue ao CFO · 3 prioridades do dia" },
      { ts: "09:14:08.40", tag: "APPROVED", msg: "Controller aprovou bloqueio preventivo da NF #88412" },
      { ts: "09:14:08.51", tag: "AUDIT-HASH", msg: "Registro selado em ClickHouse · sha256:9f84c1...e02a" },
    ],
    metrics: [
      { label: "Rastreabilidade", value: "SHA-256 Log" },
      { label: "Canais de Alerta", value: "Web / Whats / Slack" },
      { label: "Retorno Médio", value: "4–8 Semanas" },
    ],
  },
];

export function GothamFlow() {
  const [activeId, setActiveId] = useState(LAYERS[0]!.id);
  const current = LAYERS.find((l) => l.id === activeId) ?? LAYERS[0]!;

  return (
    <section id="fluxo" className="os-sec" aria-labelledby="flow-h" data-guide-section="">
      <div className="os-wrap">
        <motion.div
          className="os-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="os-index">01 · Fluxo Operacional</span>
            <h2 id="flow-h" className="os-title">
              Do dado bruto à <span className="os-title__accent">decisão auditada</span> em 4 camadas.
            </h2>
          </div>
          <p className="os-lede">
            Sem caixas-pretas nem planilhas manuais. Veja como o <strong>GothamOS</strong> conecta seus ERPs,
            estrutura uma ontologia viva e coordena squads de agentes sob controle total da sua diretoria.
          </p>
        </motion.div>

        <GuideStop />

        <div className="flow-grid">
          {/* Left: Interactive 4-Layer Selector */}
          <div className="flow-steps" role="tablist" aria-label="Camadas do fluxo operacional">
            {LAYERS.map((layer) => {
              const Icon = layer.icon;
              const isActive = layer.id === activeId;
              return (
                <button
                  key={layer.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`flow-step ${isActive ? "flow-step--active" : ""}`}
                  onClick={() => setActiveId(layer.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="flow-active-bar"
                      className="flow-step__bar"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="flow-step__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="flow-step__num">{layer.num}</span>
                    <h3 className="flow-step__title">{layer.title}</h3>
                    <p className="flow-step__desc">{layer.shortDesc}</p>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Live Animated Architecture Telemetry Card */}
          <div className="os-card flow-stage" role="tabpanel" aria-live="polite">
            <div className="flow-stage__top">
              <div>
                <span className="flow-step__num">{current.num}</span>
                <h3 className="flow-step__title" style={{ marginBottom: 0 }}>
                  {current.title}
                </h3>
              </div>
              <span className="flow-stage__badge">
                <span className="flow-stage__pulse" aria-hidden="true" />
                <Activity size={13} aria-hidden="true" />
                PIPELINE AO VIVO
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "grid", gap: "1.1rem" }}
              >
                <div className="flow-nodes">
                  {current.pipeline.map((node, i) => (
                    <motion.div
                      key={node.label}
                      className="flow-node"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, duration: 0.28 }}
                    >
                      <small>
                        0{i + 1} · {node.label}
                      </small>
                      <strong>{node.title}</strong>
                      <span>{node.detail}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flow-trace" aria-label="Log de telemetria da camada">
                  {current.trace.map((row, idx) => (
                    <div key={idx} className="flow-trace__row">
                      <span className="flow-trace__ts">{row.ts}</span>
                      <span className="flow-trace__tag">[{row.tag}]</span>
                      <span>{row.msg}</span>
                    </div>
                  ))}
                </div>

                <div className="flow-metrics">
                  {current.metrics.map((m) => (
                    <div key={m.label} className="flow-metric">
                      <small>{m.label}</small>
                      <strong>{m.value}</strong>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
