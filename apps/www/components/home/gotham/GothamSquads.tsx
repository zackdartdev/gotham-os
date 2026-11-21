"use client";

/**
 * Corporate Agent Squads — inspired by 21st.dev Agent Plan (#2127),
 * built with Echo UI tactile controls and GothamOS obsidian + yellow tokens.
 */
import { useState } from "react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { BigTitle } from "@/components/home/BigTitle";
import { GuideStop } from "@/components/home/Guide";
import "./gotham.css";

type Status = "completed" | "in-progress" | "need-approval";

interface Subtask {
  id: string;
  title: string;
  detail: string;
  status: Status;
  connectors: string[];
}

interface AgentTask {
  id: string;
  title: string;
  desc: string;
  status: Status;
  subtasks: Subtask[];
}

interface Squad {
  id: string;
  label: string;
  role: string;
  badge: string;
  summary: string;
  kpis: { label: string; value: string; note: string }[];
  verdict: string;
  tasks: AgentTask[];
}

const SQUADS: Squad[] = [
  {
    id: "finance",
    label: "Financeiro & Fiscal",
    role: "CFO · Controladoria · Contabilidade",
    badge: "SQUAD 01 // AUDITORIA",
    summary:
      "Conciliação contínua, detecção de cobranças fora de contrato e fechamento fiscal auditável diretamente sobre seus ERPs.",
    kpis: [
      { label: "Economia Potencial", value: "R$ 142k/ano", note: "reajustes fora de contrato" },
      { label: "Fechamento", value: "-32h/mês", note: "conciliação automatizada" },
      { label: "Rastreabilidade", value: "100% SHA-256", note: "cada número cita a origem" },
      { label: "Latência Local", value: "54 ms", note: "inferência vLLM dedicada" },
    ],
    verdict:
      "Detectamos reajuste +6,8% fora de contrato em 2 fornecedores e 214 lançamentos duplicados no Q3. Dossiê pronto para assinatura do CFO.",
    tasks: [
      {
        id: "f1",
        title: "Ingestão & Saneamento Contábil",
        desc: "Consolida razão, notas fiscais e extratos bancários sem expor PII.",
        status: "completed",
        subtasks: [
          {
            id: "f1.1",
            title: "Extração incremental do ERP",
            detail: "Leitura segura de faturamento, centros de custo e contas a pagar.",
            status: "completed",
            connectors: ["erp-protheus", "erp-senior", "parquet-stream"],
          },
          {
            id: "f1.2",
            title: "Expurgo de duplicatas & máscara LGPD",
            detail: "Remove 214 lançamentos duplicados e anonimiza CPF/dados bancários sensíveis.",
            status: "completed",
            connectors: ["gotham-cleaner", "lgpd-pii-guard"],
          },
        ],
      },
      {
        id: "f2",
        title: "Auditoria de Margem & Contratos",
        desc: "Cruza realizado vs. orçado e compara boletos contra cláusulas contratuais.",
        status: "in-progress",
        subtasks: [
          {
            id: "f2.1",
            title: "Detectar descontos acima da política",
            detail: "Linha Premium operou com 18% de desconto médio (limite interno: 12%).",
            status: "completed",
            connectors: ["juggernaut-llm", "margin-analyzer"],
          },
          {
            id: "f2.2",
            title: "Gerar minuta de renegociação",
            detail: "Aguardando aprovação humana para envio ao compras e diretoria financeira.",
            status: "need-approval",
            connectors: ["sentinel-council", "approval-gate"],
          },
        ],
      },
    ],
  },
  {
    id: "ops",
    label: "Operações & Supply",
    role: "COO · Logística · Compras",
    badge: "SQUAD 02 // OPERAÇÕES",
    summary:
      "Monitoramento em tempo real de estoque, SLAs de transporte, custos de frete e previsão de ruptura entre filiais.",
    kpis: [
      { label: "Estoque Ocioso", value: "-18%", note: "realocação RJ → MG" },
      { label: "Desvio de Frete", value: "+9,0%", note: "alerta na Região Sul" },
      { label: "Cenários Ativos", value: "256", note: "simulação multivariável" },
      { label: "Vigilância", value: "24/7", note: "Sentinel daemon ativo" },
    ],
    verdict:
      "Frete da Região Sul subiu 9% sem repasse na tabela de preço. Recomendado realocar 18% do estoque ocioso da filial RJ antes do fechamento.",
    tasks: [
      {
        id: "o1",
        title: "Fusão de Ontologia Logística",
        desc: "Unifica WMS, pedidos de venda, tabelas de frete e prazos de fornecedores.",
        status: "completed",
        subtasks: [
          {
            id: "o1.1",
            title: "Sincronizar estoque multi-filial",
            detail: "Cruza giro por SKU, lead time médio e custo de armazenagem.",
            status: "completed",
            connectors: ["wms-bridge", "postgres-dw"],
          },
        ],
      },
      {
        id: "o2",
        title: "Otimização de Reposição & Frete",
        desc: "Simula cenários de transferência e compras emergenciais.",
        status: "in-progress",
        subtasks: [
          {
            id: "o2.1",
            title: "Plano de transferência inter-filiais",
            detail: "Calcula rota ótima reduzindo ruptura prevista em 14 dias.",
            status: "in-progress",
            connectors: ["route-solver", "sentinel-radar"],
          },
          {
            id: "o2.2",
            title: "Disparar alerta de tabela de frete",
            detail: "Notificação pronta para diretoria comercial aprovar ajuste.",
            status: "need-approval",
            connectors: ["whatsapp-exec", "approval-gate"],
          },
        ],
      },
    ],
  },
  {
    id: "legal",
    label: "Jurídico & LGPD",
    role: "Compliance · Contratos · Risco",
    badge: "SQUAD 03 // GOVERNANÇA",
    summary:
      "Catalogação semântica de contratos, rastreamento de prazos/multas e governança de dados pessoais com trilha imutável.",
    kpis: [
      { label: "Documentos", value: "42.810", note: "indexados em vetor local" },
      { label: "Precisão RAG", value: "98,7%", note: "citação direta de cláusula" },
      { label: "Exposição Nuvem", value: "0 BYTES", note: "modo air-gapped" },
      { label: "Auditoria", value: "100%", note: "log imutável por ação" },
    ],
    verdict:
      "Aditivo do Fornecedor #09 vence em 11 dias com cláusula de renovação automática. Dossiê jurídico com redlines prontos para revisão.",
    tasks: [
      {
        id: "l1",
        title: "Catalogação Semântica & Dossiês",
        desc: "Indexa PDFs, aditivos, SLAs e políticas internas na ontologia Gotham.",
        status: "completed",
        subtasks: [
          {
            id: "l1.1",
            title: "Extração de cláusulas críticas",
            detail: "Identifica multas, reajustes, prazos de aviso prévio e foro.",
            status: "completed",
            connectors: ["gotham-archivist", "qdrant-local"],
          },
        ],
      },
      {
        id: "l2",
        title: "Radar de Prazos & Conformidade LGPD",
        desc: "Monitora vencimentos e bloqueia vazamento de dados sensíveis.",
        status: "in-progress",
        subtasks: [
          {
            id: "l2.1",
            title: "Revisão de aditivo contratual #09",
            detail: "Sugere contraproposta baseada em histórico de SLA descumprido.",
            status: "need-approval",
            connectors: ["legal-agent", "sha256-ledger"],
          },
        ],
      },
    ],
  },
  {
    id: "health",
    label: "Clínico & HealthTech",
    role: "Clínicas · Hospitais · Gestão Médica",
    badge: "SQUAD 04 // SAÚDE",
    summary:
      "Automação de agenda, cálculo e auditoria de repasse médico e indicadores operacionais integrados ao Tasy e 4medic.",
    kpis: [
      { label: "Repasses", value: "100% Auto", note: "fim das planilhas manuais" },
      { label: "Integração", value: "Tasy · 4medic", note: "conectores dedicados" },
      { label: "Privacidade", value: "LGPD Saúde", note: "dados sensíveis isolados" },
      { label: "Glosas Evitadas", value: "+24%", note: "pré-auditoria TISS" },
    ],
    verdict:
      "Lote de 380 atendimentos validado antes do faturamento. 14 divergências de código TISS corrigidas automaticamente antes do envio.",
    tasks: [
      {
        id: "h1",
        title: "Auditoria de Repasse & Faturamento",
        desc: "Cruza agenda realizada, convênios e regras de comissão médica.",
        status: "completed",
        subtasks: [
          {
            id: "h1.1",
            title: "Cálculo automático de honorários",
            detail: "Aplica regras por especialidade, convênio e plantão sem retrabalho.",
            status: "completed",
            connectors: ["tasy-connector", "4medic-sync"],
          },
        ],
      },
      {
        id: "h2",
        title: "Pré-Auditoria de Glosas TISS",
        desc: "Verifica guias incompletas antes de enviar às operadoras.",
        status: "in-progress",
        subtasks: [
          {
            id: "h2.1",
            title: "Relatório de pendências para recepção",
            detail: "Lista 14 guias com campo pendente para ajuste imediato.",
            status: "need-approval",
            connectors: ["health-guard", "clinic-notify"],
          },
        ],
      },
    ],
  },
  {
    id: "exec",
    label: "Comando Executivo",
    role: "CEO · Diretoria · Board",
    badge: "SQUAD 05 // SENTINEL",
    summary:
      "Conselho de agentes que cruza todas as áreas da empresa e entrega um briefing diário acionável no console ou WhatsApp.",
    kpis: [
      { label: "Confiança", value: "96,8%", note: "baseado em evidências" },
      { label: "ROI Estimado", value: "4,3x", note: "no primeiro trimestre" },
      { label: "Ações Priorizadas", value: "04", note: "prontas para decisão" },
      { label: "Canais", value: "Web · WhatsApp", note: "briefing executivo" },
    ],
    verdict:
      "Prioridade máxima: aprovar renegociação do Fornecedor #09 e realocação de estoque RJ → MG. Impacto estimado: +R$ 180k de caixa em 90 dias.",
    tasks: [
      {
        id: "e1",
        title: "Síntese Cross-Departamental",
        desc: "Correlaciona alertas do Financeiro, Operações e Jurídico em uma visão única.",
        status: "completed",
        subtasks: [
          {
            id: "e1.1",
            title: "Ranking de impacto financeiro",
            detail: "Ordena decisões por impacto em caixa, risco jurídico e esforço.",
            status: "completed",
            connectors: ["sentinel-core", "ontology-graph"],
          },
        ],
      },
      {
        id: "e2",
        title: "Despacho de Plano de Ação",
        desc: "Entrega dashboard e relatório executivo com botões de aprovação.",
        status: "in-progress",
        subtasks: [
          {
            id: "e2.1",
            title: "Briefing matinal da diretoria",
            detail: "Enviado às 08:00 com link auditável para cada evidência.",
            status: "in-progress",
            connectors: ["exec-briefing", "whatsapp-exec"],
          },
        ],
      },
    ],
  },
];

const STATUS_LABEL: Record<Status, string> = {
  completed: "Concluído",
  "in-progress": "Em execução",
  "need-approval": "Aprovação humana",
};

const NEXT_STATUS: Record<Status, Status> = {
  completed: "in-progress",
  "in-progress": "need-approval",
  "need-approval": "completed",
};

export function GothamSquads() {
  const [squadId, setSquadId] = useState<string>(SQUADS[0]!.id);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ f1: true, f2: true });
  const [overrides, setOverrides] = useState<Record<string, Status>>({});

  const squad = SQUADS.find((s) => s.id === squadId) ?? SQUADS[0]!;

  const toggleExpand = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const cycleStatus = (id: string, current: Status) =>
    setOverrides((prev) => ({ ...prev, [id]: NEXT_STATUS[prev[id] ?? current] }));

  return (
    <section id="agentes" className="gotham-sec" aria-labelledby="squads-h" data-guide-section="">
      <GuideStop className="gotham-stop" />
      <span className="gotham-kicker">
        <span className="gotham-kicker__dot" aria-hidden="true" />
        TIME DE AGENTES CORPORATIVOS · ESTILO PALANTIR GOTHAM
      </span>
      <BigTitle id="squads-h" title="Um time de agentes para cada frente da empresa">
        <strong>Não vendemos um chatbot genérico.</strong> Implantamos squads autônomos conectados aos seus ERPs,
        contratos e bancos de dados, com supervisão humana e trilha auditável.
      </BigTitle>

      <div className="gotham-squad-bar" role="group" aria-label="Squads corporativos do GothamOS">
        {SQUADS.map((s) => (
          <HardwareButton
            key={s.id}
            size="sm"
            variant={s.id === squad.id ? "primary" : undefined}
            aria-pressed={s.id === squad.id}
            onClick={() => {
              setSquadId(s.id);
              const firstTask = s.tasks[0]?.id;
              const secondTask = s.tasks[1]?.id;
              setExpanded((prev) => ({
                ...prev,
                ...(firstTask ? { [firstTask]: true } : {}),
                ...(secondTask ? { [secondTask]: true } : {}),
              }));
            }}
          >
            {s.label}
          </HardwareButton>
        ))}
      </div>

      <div className="gotham-squad-grid">
        {/* Left: Interactive Agent Execution Plan (21st.dev Agent Plan pattern) */}
        <div className="gotham-card gotham-plan">
          <div className="gotham-plan__head">
            <div>
              <h3 className="gotham-plan__title">{squad.label}</h3>
              <p className="gotham-plan__sub">{squad.role}</p>
            </div>
            <span className="gotham-pill gotham-pill--run">{squad.badge}</span>
          </div>

          <ul className="gotham-task-list">
            {squad.tasks.map((task) => {
              const status = overrides[task.id] ?? task.status;
              const isOpen = expanded[task.id] ?? true;
              const pillClass =
                status === "completed"
                  ? "gotham-pill gotham-pill--ok"
                  : status === "need-approval"
                    ? "gotham-pill gotham-pill--warn"
                    : "gotham-pill gotham-pill--run";

              return (
                <li key={task.id} className={`gotham-task ${isOpen ? "gotham-task--open" : ""}`}>
                  <div className="gotham-task__row" onClick={() => toggleExpand(task.id)}>
                    <button
                      type="button"
                      className={`gotham-task__status-btn ${status === "completed" ? "gotham-task__status-btn--done" : ""}`}
                      aria-label={`Alternar status de ${task.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        cycleStatus(task.id, status);
                      }}
                    >
                      {status === "completed" ? "✓" : status === "need-approval" ? "!" : "●"}
                    </button>
                    <div className="gotham-task__main">
                      <span className={`gotham-task__name ${status === "completed" ? "gotham-task__name--done" : ""}`}>
                        {task.title}
                      </span>
                      <span className="gotham-task__desc">{task.desc}</span>
                    </div>
                    <span className={pillClass}>{STATUS_LABEL[status]}</span>
                  </div>

                  {isOpen && (
                    <ul className="gotham-subtasks">
                      {task.subtasks.map((sub) => {
                        const subStatus = overrides[sub.id] ?? sub.status;
                        const subPill =
                          subStatus === "completed"
                            ? "gotham-pill gotham-pill--ok"
                            : subStatus === "need-approval"
                              ? "gotham-pill gotham-pill--warn"
                              : "gotham-pill gotham-pill--run";
                        return (
                          <li key={sub.id} className="gotham-subtask">
                            <div className="gotham-subtask__top">
                              <span className="gotham-subtask__title">{sub.title}</span>
                              <button
                                type="button"
                                className={subPill}
                                style={{ cursor: "pointer" }}
                                onClick={() => cycleStatus(sub.id, subStatus)}
                              >
                                {STATUS_LABEL[subStatus]}
                              </button>
                            </div>
                            <p className="gotham-subtask__detail">{sub.detail}</p>
                            <div className="gotham-tools">
                              {sub.connectors.map((c) => (
                                <span key={c} className="gotham-tool">
                                  mcp://{c}
                                </span>
                              ))}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Executive Dossier & Sentinel Verdict */}
        <aside className="gotham-card gotham-dossier" aria-label="Resumo executivo do squad">
          <div>
            <span className="gotham-pill">ONTOLOGIA ATIVA · DADOS ILUSTRATIVOS</span>
            <p className="gotham-plan__sub" style={{ marginTop: "0.75rem", fontSize: "0.9rem", lineHeight: 1.55 }}>
              {squad.summary}
            </p>
          </div>

          <div className="gotham-kpis">
            {squad.kpis.map((k) => (
              <div key={k.label} className="gotham-kpi">
                <small>{k.label}</small>
                <strong>{k.value}</strong>
                <span>{k.note}</span>
              </div>
            ))}
          </div>

          <div className="gotham-verdict">
            <small>PARECER SENTINEL // DECISÃO RECOMENDADA</small>
            <p>{squad.verdict}</p>
          </div>

          <HardwareButton
            variant="primary"
            href={`https://wa.me/5521990315582?text=${encodeURIComponent(
              `Olá Isaac! Quero conhecer o squad ${squad.label} do GothamOS para minha empresa.`,
            )}`}
          >
            Contratar Squad {squad.label}
          </HardwareButton>
        </aside>
      </div>
    </section>
  );
}
