"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Landmark, Package, Scale, HeartPulse, Radar, CheckCircle2, Circle, ChevronDown } from "lucide-react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { GuideStop } from "@/components/home/Guide";

interface Subtask {
  id: string;
  title: string;
  detail: string;
  tools: string[];
}

interface MissionTask {
  id: string;
  title: string;
  agent: string;
  status: "done" | "running" | "queued";
  subtasks: Subtask[];
}

interface Squad {
  id: string;
  name: string;
  icon: typeof Landmark;
  tagline: string;
  kpis: { label: string; value: string; note: string }[];
  verdict: string;
  tasks: MissionTask[];
}

const SQUADS: Squad[] = [
  {
    id: "financeiro",
    name: "Financeiro & Fiscal",
    icon: Landmark,
    tagline: "Auditoria contínua de NF-e, fluxo de caixa e conciliação bancária em ERPs corporativos.",
    kpis: [
      { label: "Conciliação", value: "99,4%", note: "Baixa automática ERP" },
      { label: "Recuperação", value: "R$ 41k/mês", note: "Média em divergências" },
      { label: "Fechamento", value: "-68%", note: "Tempo de fechamento" },
      { label: "Auditoria", value: "100%", note: "Notas verificadas" },
    ],
    verdict:
      "Detectadas 14 divergências de ICMS-ST em 3 fornecedores recorrentes. Rascunho de contestação e bloqueio preventivo prontos para aprovação do Controller.",
    tasks: [
      {
        id: "fin-1",
        title: "Conciliação automática Protheus × Extratos Bancários",
        agent: "Agente Tesouraria",
        status: "done",
        subtasks: [
          {
            id: "fin-1a",
            title: "Leitura de títulos SE1/SE2 + OFX multi-bancos",
            detail: "Cruza liquidações, juros indevidos e tarifas divergentes em tempo real.",
            tools: ["protheus-ro", "ofx-parser", "pgvector"],
          },
          {
            id: "fin-1b",
            title: "Sinalização de pagamentos duplicados",
            detail: "Bloqueia automaticamente remessas com mesmo favorecido e valor em janela de 72h.",
            tools: ["anomaly-guard", "approval-gate"],
          },
        ],
      },
      {
        id: "fin-2",
        title: "Auditoria tributária de NF-e e retenções (PIS/COFINS/ICMS-ST)",
        agent: "Agente Fiscal",
        status: "running",
        subtasks: [
          {
            id: "fin-2a",
            title: "Validação de NCM, CFOP e alíquota interestadual",
            detail: "Compara XML recebido com tabela fiscal vigente e histórico do fornecedor.",
            tools: ["xml-nfe-audit", "tax-rules-br"],
          },
        ],
      },
      {
        id: "fin-3",
        title: "Projeção de caixa D+90 e alertas de margem",
        agent: "Agente FP&A",
        status: "queued",
        subtasks: [
          {
            id: "fin-3a",
            title: "Simulação de cenários de inadimplência e câmbio",
            detail: "Entrega resumo executivo toda segunda-feira às 07h30 para a diretoria.",
            tools: ["forecast-engine", "whatsapp-exec"],
          },
        ],
      },
    ],
  },
  {
    id: "operacoes",
    name: "Operações & Supply",
    icon: Package,
    tagline: "Previsão de ruptura, rastreamento de compras e monitoramento de SLAs logísticos.",
    kpis: [
      { label: "Ruptura", value: "-54%", note: "Redução de estoque zerado" },
      { label: "Lead Time", value: "24/7", note: "Monitoramento de pedidos" },
      { label: "Cotação", value: "4x", note: "Mais rápido por RFQ" },
      { label: "SLA", value: "97,8%", note: "Entregas no prazo" },
    ],
    verdict:
      "7 SKUs de curva A entram em zona crítica em 9 dias. Cotações comparativas com 3 fornecedores homologados já estruturadas para disparo.",
    tasks: [
      {
        id: "op-1",
        title: "Detector preditivo de ruptura de estoque",
        agent: "Agente Demanda",
        status: "done",
        subtasks: [
          {
            id: "op-1a",
            title: "Cálculo de cobertura real por filial e sazonalidade",
            detail: "Cruza giro diário do ERP Sênior/Protheus com pedidos em trânsito.",
            tools: ["erp-stock-ro", "demand-forecast"],
          },
        ],
      },
      {
        id: "op-2",
        title: "Equalização automática de propostas de fornecedores",
        agent: "Agente Compras",
        status: "running",
        subtasks: [
          {
            id: "op-2a",
            title: "Extração de PDFs/planilhas de cotação e comparativo TCO",
            detail: "Normaliza frete, prazo de pagamento e histórico de atraso em matriz única.",
            tools: ["pdf-table-ocr", "supplier-score"],
          },
        ],
      },
    ],
  },
  {
    id: "juridico",
    name: "Jurídico & LGPD",
    icon: Scale,
    tagline: "Revisão de contratos, controle de prazos críticos e governança estrita de privacidade.",
    kpis: [
      { label: "Triagem", value: "3 min", note: "Por contrato de 40 págs." },
      { label: "Vazamento", value: "0 Bytes", note: "100% perímetro privado" },
      { label: "Prazos", value: "100%", note: "Renovações rastreadas" },
      { label: "LGPD", value: "Nat.", note: "Anonimização na borda" },
    ],
    verdict:
      "Cláusula 11.4 do novo aditivo remove teto de multa e amplia foro fora da sede. Redline sugerido pronto para validação jurídica.",
    tasks: [
      {
        id: "jur-1",
        title: "Análise de risco contratual contra Playbook Interno",
        agent: "Agente Contratos",
        status: "running",
        subtasks: [
          {
            id: "jur-1a",
            title: "Mapeamento de multas, SLA, reajuste e propriedade intelectual",
            detail: "Destaca desvios do padrão jurídico da empresa com citação exata da página.",
            tools: ["clause-diff", "pgvector-legal"],
          },
        ],
      },
      {
        id: "jur-2",
        title: "Radar de vencimentos, reajustes IGPM/IPCA e aditivos",
        agent: "Agente Compliance",
        status: "done",
        subtasks: [
          {
            id: "jur-2a",
            title: "Alertas automáticos D-60 / D-30 para renegociação",
            detail: "Evita renovações tácitas indesejadas em fornecedores críticos.",
            tools: ["contract-calendar", "audit-log"],
          },
        ],
      },
    ],
  },
  {
    id: "clinico",
    name: "Clínico & HealthTech",
    icon: HeartPulse,
    tagline: "Auditoria de glosas, faturamento TISS e inteligência operacional integrada a Tasy e 4medic.",
    kpis: [
      { label: "Glosas", value: "-42%", note: "Redução pré-faturamento" },
      { label: "Integração", value: "Tasy/4m", note: "Conectores dedicados" },
      { label: "Privacidade", value: "On-Prem", note: "Dados sensíveis locais" },
      { label: "Agenda", value: "+19%", note: "Aproveitamento salas" },
    ],
    verdict:
      "28 guias TISS com risco de glosa técnica por divergência de CID/TUSS corrigidas antes do envio ao convênio.",
    tasks: [
      {
        id: "cli-1",
        title: "Auditoria pré-envio de guias TISS e códigos TUSS",
        agent: "Agente Faturamento",
        status: "done",
        subtasks: [
          {
            id: "cli-1a",
            title: "Validação cruzada de prontuário, OPME e regras de operadora",
            detail: "Roda 100% dentro do hospital/clínica sem enviar dados de pacientes à internet.",
            tools: ["tasy-ro", "4medic-sync", "tiss-validator"],
          },
        ],
      },
      {
        id: "cli-2",
        title: "Otimização de grade cirúrgica e redução de no-show",
        agent: "Agente Operação Clínica",
        status: "running",
        subtasks: [
          {
            id: "cli-2a",
            title: "Confirmação inteligente e encaixe dinâmico de fila",
            detail: "Identifica horários ociosos e aciona equipe de recepção com lista priorizada.",
            tools: ["schedule-opt", "clinic-notify"],
          },
        ],
      },
    ],
  },
  {
    id: "executivo",
    name: "Comando Executivo",
    icon: Radar,
    tagline: "Briefing matinal unificado para CEO/CFO/COO conectando todas as áreas em um só painel.",
    kpis: [
      { label: "Visão", value: "360°", note: "ERPs + Ops + Caixa" },
      { label: "Briefing", value: "07h30", note: "Resumo diário automático" },
      { label: "Decisão", value: "1 Clique", note: "Aprovação auditada" },
      { label: "Evidência", value: "100%", note: "Link direto à fonte" },
    ],
    verdict:
      "Margem EBITDA 2,1pp acima do plano; atenção concentrada em 1 contrato logístico e 3 títulos fiscais já com plano de mitigação anexado.",
    tasks: [
      {
        id: "exe-1",
        title: "Consolidação cross-departamental e detecção de gargalos",
        agent: "Agente Chief-of-Staff",
        status: "done",
        subtasks: [
          {
            id: "exe-1a",
            title: "Síntese de alertas dos squads Financeiro, Supply e Jurídico",
            detail: "Filtra ruído operacional e entrega apenas desvios que exigem decisão de diretoria.",
            tools: ["multi-squad-bus", "kpi-rollup"],
          },
        ],
      },
    ],
  },
];

export function GothamSquadsV2() {
  const [squadId, setSquadId] = useState(SQUADS[0]!.id);
  const [openTask, setOpenTask] = useState<string>(SQUADS[0]!.tasks[0]!.id);
  const [doneIds, setDoneIds] = useState<Record<string, boolean>>({});

  const squad = SQUADS.find((s) => s.id === squadId) ?? SQUADS[0]!;

  const selectSquad = (id: string) => {
    setSquadId(id);
    const next = SQUADS.find((s) => s.id === id);
    if (next?.tasks[0]) setOpenTask(next.tasks[0].id);
  };

  const toggleDone = (id: string, defaultDone: boolean) => {
    setDoneIds((prev) => ({ ...prev, [id]: !(prev[id] ?? defaultDone) }));
  };

  return (
    <section id="agentes" className="os-sec" aria-labelledby="squads-h" data-guide-section="">
      <div className="os-wrap">
        <motion.div
          className="os-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="os-index">02 · Time de Agentes Corporativos</span>
            <h2 id="squads-h" className="os-title">
              Squads especializados <span className="os-title__accent">em operação real.</span>
            </h2>
          </div>
          <p className="os-lede">
            Não vendemos chatbots genéricos. Entregamos <strong>times de agentes treinados nas regras da sua empresa</strong>,
            com ferramentas auditáveis, aprovações humanas e indicadores claros de retorno.
          </p>
        </motion.div>

        <GuideStop />

        {/* Animated Kinetic Tabs */}
        <div className="os-tabs" role="tablist" aria-label="Squads de agentes GothamOS">
          {SQUADS.map((s) => {
            const Icon = s.icon;
            const active = s.id === squadId;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`os-tab ${active ? "os-tab--active" : ""}`}
                onClick={() => selectSquad(s.id)}
              >
                {active && (
                  <motion.span
                    layoutId="squad-tab-bg"
                    className="os-tab__bg"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className="os-tab__label">
                  <Icon size={15} aria-hidden="true" />
                  {s.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Squad Bento View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={squad.id}
            className="bento-squads"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left: Interactive Playbook Tree */}
            <div className="os-card gotham-plan">
              <div className="gotham-plan__head">
                <div>
                  <h3 className="gotham-plan__title">Playbook · {squad.name}</h3>
                  <p className="gotham-plan__sub">{squad.tagline}</p>
                </div>
                <span className="gotham-pill gotham-pill--run">SQUAD ATIVO</span>
              </div>

              <ul className="gotham-task-list">
                {squad.tasks.map((task) => {
                  const isDone = doneIds[task.id] ?? task.status === "done";
                  const isOpen = openTask === task.id;
                  return (
                    <li key={task.id} className={`gotham-task ${isOpen ? "gotham-task--open" : ""}`}>
                      <div className="gotham-task__row" onClick={() => setOpenTask(isOpen ? "" : task.id)}>
                        <button
                          type="button"
                          className={`gotham-task__status-btn ${isDone ? "gotham-task__status-btn--done" : ""}`}
                          aria-label={isDone ? "Marcar tarefa como pendente" : "Marcar tarefa como concluída"}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDone(task.id, task.status === "done");
                          }}
                        >
                          {isDone ? <CheckCircle2 size={14} /> : <Circle size={13} />}
                        </button>
                        <div className="gotham-task__main">
                          <span className={`gotham-task__name ${isDone ? "gotham-task__name--done" : ""}`}>
                            {task.title}
                          </span>
                          <span className="gotham-task__desc">{task.agent}</span>
                        </div>
                        <span className={`gotham-pill ${isDone ? "gotham-pill--ok" : "gotham-pill--run"}`}>
                          {isDone ? "concluído" : task.status === "running" ? "em execução" : "agendado"}
                        </span>
                        <ChevronDown
                          size={16}
                          style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease",
                            opacity: 0.7,
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            className="gotham-subtasks"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.24 }}
                            style={{ overflow: "hidden" }}
                          >
                            {task.subtasks.map((st) => (
                              <li key={st.id} className="gotham-subtask">
                                <div className="gotham-subtask__top">
                                  <span className="gotham-subtask__title">{st.title}</span>
                                </div>
                                <p className="gotham-subtask__detail">{st.detail}</p>
                                <div className="gotham-tools">
                                  {st.tools.map((tool) => (
                                    <span key={tool} className="gotham-tool">
                                      {tool}
                                    </span>
                                  ))}
                                </div>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right: Executive Bento Dossier */}
            <div className="os-card gotham-dossier">
              <div className="gotham-kpis">
                {squad.kpis.map((kpi) => (
                  <div key={kpi.label} className="gotham-kpi">
                    <small>{kpi.label}</small>
                    <strong>{kpi.value}</strong>
                    <span>{kpi.note}</span>
                  </div>
                ))}
              </div>

              <div className="gotham-verdict">
                <small>VEREDITO DO SQUAD · EVIDÊNCIA ANEXADA</small>
                <p>{squad.verdict}</p>
              </div>

              <HardwareButton
                variant="primary"
                size="md"
                href={`https://wa.me/5521990315582?text=${encodeURIComponent(
                  `Olá Isaac! Quero montar o squad de ${squad.name} no GothamOS para minha empresa.`,
                )}`}
              >
                Montar Squad de {squad.name}
              </HardwareButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
