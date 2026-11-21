"use client";

/**
 * Dual-Mode Enterprise Architecture & Realistic Installation Protocol
 * Inspired by 21st.dev Deploy Pipeline (#40323) — supports BOTH:
 * 1) 100% Local On-Premise / Air-Gapped (Docker/K8s + vLLM / llama.cpp Enterprise)
 * 2) Private Cloud / Dedicated VPC Software (AWS/GCP/Azure + Model-Agnostic Inference Router)
 * Zero consumer hacks (no LM Studio dependency).
 */
import { useState } from "react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { BigTitle } from "@/components/home/BigTitle";
import { GuideStop } from "@/components/home/Guide";
import { useCopy } from "@/components/use-copy";
import "./gotham.css";

type DeployMode = "local" | "cloud";

interface Stage {
  num: string;
  title: string;
  desc: string;
  log: string[];
}

interface ModeSpec {
  id: DeployMode;
  label: string;
  badge: string;
  headline: string;
  summary: string;
  cli: string;
  specs: { k: string; v: string; note: string }[];
  stages: Stage[];
}

const MODES: Record<DeployMode, ModeSpec> = {
  local: {
    id: "local",
    label: "100% Local (On-Premise)",
    badge: "AIR-GAPPED // 0 BYTES NUVEM",
    headline: "Soberania absoluta dentro do seu servidor ou datacenter.",
    summary:
      "Implantação corporativa via containers assinados (Docker Compose ou Helm/Kubernetes) rodando motor vLLM/TensorRT-LLM em GPU própria ou llama.cpp otimizado em CPU — sem depender de ferramentas de desktop ou APIs externas.",
    cli: "gotham-ctl deploy --mode=on-prem --runtime=vllm --storage=qdrant --airgap",
    specs: [
      { k: "Motor de Inferência", v: "vLLM / TensorRT-LLM / llama.cpp", note: "Produção 24/7 com filas e batching" },
      { k: "Modelos Open-Weights", v: "Qwen 2.5 · Llama 3.3 · Juggernaut", note: "Quantização FP8/AWQ sob medida" },
      { k: "Hardware Suportado", v: "NVIDIA L4 / A100 / RTX 4090 ou CPU", note: "Dimensionado ao volume da empresa" },
      { k: "Segurança & LGPD", v: "0 Bytes Externos + SHA-256", note: "PII mascarado e trilha imutável" },
    ],
    stages: [
      {
        num: "01",
        title: "Dimensionamento & Compliance",
        desc: "Auditoria de servidores/GPU, mapeamento de ERPs e definição de políticas LGPD.",
        log: [
          "$ gotham-ctl preflight --audit-hardware --lgpd-strict",
          "✓ GPU detectada: 2x NVIDIA L40S (96 GB VRAM total)",
          "✓ Rede interna isolada validada (egress bloqueado)",
          "✓ Conectores mapeados: Protheus SQL, Tasy, Parquet DW",
        ],
      },
      {
        num: "02",
        title: "Provisionamento do Runtime",
        desc: "Deploy automatizado do Gotham Core, vLLM, Qdrant local e Guardrails via Docker/K8s.",
        log: [
          "$ gotham-ctl deploy --mode=on-prem --runtime=vllm --airgap",
          "✓ Bundle assinado verificado (SHA-256 OK)",
          "✓ Engine vLLM ativo: Juggernaut-32B-AWQ @ 48 tok/s",
          "✓ Banco vetorial Qdrant + PostgreSQL inicializados",
        ],
      },
      {
        num: "03",
        title: "Ontologia & Conectores ERP",
        desc: "Unifica tabelas, PDFs e contratos em uma Ontologia Operacional consultável.",
        log: [
          "$ gotham-ctl ontology sync --sources=protheus,contratos,bancos",
          "✓ 1.482.400 registros saneados (4.190 duplicatas expurgadas)",
          "✓ 42.810 entidades catalogadas com link para documento fonte",
          "✓ Máscara LGPD aplicada em 100% dos campos sensíveis",
        ],
      },
      {
        num: "04",
        title: "Ativação dos Squads & RBAC",
        desc: "Ativa os agentes contratados com SSO, aprovações humanas e Sentinel 24/7.",
        log: [
          "$ gotham-ctl squads enable finance,ops,legal,executive --sentinel",
          "✓ Squad Financeiro & Fiscal: ONLINE (aprovação CFO ativa)",
          "✓ Squad Operações & Supply: ONLINE (radar de desvio ativo)",
          "✓ Sentinel 24/7 operacional — 0 bytes enviados para fora",
        ],
      },
    ],
  },
  cloud: {
    id: "cloud",
    label: "Nuvem Privada (VPC / Software)",
    badge: "SINGLE-TENANT VPC // ZERO RETENTION",
    headline: "Mesmo software GothamOS em nuvem dedicada, sem gerenciar hardware.",
    summary:
      "Para empresas distribuídas que preferem escala elástica: instalamos o GothamOS em uma VPC isolada (AWS, GCP ou Azure) com Inference Router agnóstico de modelo, zero retenção de dados e governança corporativa.",
    cli: "gotham-ctl deploy --mode=cloud-vpc --provider=aws --router=zero-retention",
    specs: [
      { k: "Infraestrutura", v: "VPC Dedicada (AWS / GCP / Azure)", note: "Tenant único com criptografia KMS" },
      { k: "Roteador de Modelos", v: "vLLM Privado · Bedrock · Vertex", note: "Zero data retention + fallback" },
      { k: "Conectividade ERP", v: "VPN Site-to-Site / Túnel mTLS", note: "Leitura segura sem expor banco" },
      { k: "Governança & Custo", v: "SSO/OIDC + Teto por Squad", note: "Telemetria e auditoria por usuário" },
    ],
    stages: [
      {
        num: "01",
        title: "Arquitetura VPC & Segurança",
        desc: "Provisionamento de sub-rede privada, chaves KMS e túnel mTLS com seus sistemas.",
        log: [
          "$ gotham-ctl cloud init --provider=aws --region=sa-east-1",
          "✓ VPC single-tenant isolada criada com KMS dedicado",
          "✓ Túnel mTLS estabelecido com ERP e Data Warehouse",
          "✓ SSO corporativo (Entra ID / Google Workspace) validado",
        ],
      },
      {
        num: "02",
        title: "Software & Inference Router",
        desc: "Deploy do Gotham Core e roteador inteligente com políticas de zero retenção.",
        log: [
          "$ gotham-ctl deploy --mode=cloud-vpc --router=zero-retention",
          "✓ Gotham Core + Orquestrador de Agentes em alta disponibilidade",
          "✓ Inference Router ativo (Qwen/Llama privado + fallback ZDR)",
          "✓ Teto de tokens e auditoria LGPD/GDPR habilitados",
        ],
      },
      {
        num: "03",
        title: "Ontologia & Pipelines Contínuos",
        desc: "Sincronização incremental de ERPs, planilhas e pastas corporativas.",
        log: [
          "$ gotham-ctl ontology sync --mode=incremental --schedule='*/15 * * * *'",
          "✓ Conectores ERP Sênior, Protheus e Drive corporativo ativos",
          "✓ Índice semântico atualizado com rastreabilidade de fonte",
          "✓ 0 dados usados para treino externo (contrato ZDR)",
        ],
      },
      {
        num: "04",
        title: "Go-Live do Time de Agentes",
        desc: "Squads operando no console web, Slack, Teams e WhatsApp executivo.",
        log: [
          "$ gotham-ctl squads enable finance,ops,health,executive --channels=web,wa",
          "✓ 4 squads corporativos ativos com aprovação em 1 clique",
          "✓ Briefing diário da diretoria agendado às 08:00 BRT",
          "✓ SLA monitorado 24/7 pela equipe Zack Studios",
        ],
      },
    ],
  },
};

export function GothamDeploy() {
  const [mode, setMode] = useState<DeployMode>("local");
  const [stageIdx, setStageIdx] = useState(0);
  const { copied, copy } = useCopy();

  const spec = MODES[mode];
  const stage = spec.stages[stageIdx] ?? spec.stages[0]!;

  return (
    <section id="instalacao" className="gotham-sec" aria-labelledby="deploy-h" data-guide-section="">
      <GuideStop className="gotham-stop" />
      <span className="gotham-kicker">
        <span className="gotham-kicker__dot" aria-hidden="true" />
        ARQUITETURA DUAL-MODE & PROTOCOLO DE INSTALAÇÃO
      </span>
      <BigTitle id="deploy-h" title="Rode 100% local ou na sua nuvem privada">
        <strong>O mesmo software, a infraestrutura que o cliente preferir.</strong> Nada de gambiarras de desktop:
        instalação corporativa via containers assinados, motor de inferência de produção e contrato formal.
      </BigTitle>

      <div className="gotham-mode-switch">
        <div className="gotham-mode-btns" role="group" aria-label="Modo de implantação">
          {(["local", "cloud"] as const).map((m) => (
            <HardwareButton
              key={m}
              size="md"
              variant={mode === m ? "primary" : undefined}
              aria-pressed={mode === m}
              onClick={() => {
                setMode(m);
                setStageIdx(0);
              }}
            >
              {MODES[m].label}
            </HardwareButton>
          ))}
        </div>
        <span className="gotham-pill gotham-pill--run">{spec.badge}</span>
      </div>

      {/* 4-Stage Pipeline Cards (21st.dev Deploy Pipeline pattern) */}
      <div className="gotham-pipeline-grid" role="tablist" aria-label="Etapas do protocolo de instalação">
        {spec.stages.map((st, idx) => (
          <button
            key={st.num}
            type="button"
            role="tab"
            aria-selected={idx === stageIdx}
            className={`gotham-stage ${idx === stageIdx ? "gotham-stage--active" : ""}`}
            onClick={() => setStageIdx(idx)}
          >
            <div className="gotham-stage__num">
              <span>ETAPA {st.num}</span>
              <span>{idx < stageIdx ? "✓" : idx === stageIdx ? "● ATIVA" : "○"}</span>
            </div>
            <h3 className="gotham-stage__title">{st.title}</h3>
            <p className="gotham-stage__desc">{st.desc}</p>
          </button>
        ))}
      </div>

      {/* Active Mode Details + Realistic Terminal */}
      <div className="gotham-card gotham-deploy-detail">
        <div>
          <h3 className="gotham-plan__title" style={{ fontSize: "1.2rem" }}>
            {spec.headline}
          </h3>
          <p className="gotham-plan__sub" style={{ marginTop: "0.5rem", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {spec.summary}
          </p>

          <div className="gotham-specs">
            {spec.specs.map((item) => (
              <div key={item.k} className="gotham-spec">
                <small>{item.k}</small>
                <strong>{item.v}</strong>
                <span>{item.note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gotham-terminal">
          <div className="gotham-terminal__bar">
            <span>gotham-ctl // etapa {stage.num} · {mode === "local" ? "on-prem" : "cloud-vpc"}</span>
            <button
              type="button"
              onClick={() => copy(spec.cli)}
              style={{
                background: "transparent",
                border: "1px solid rgba(250,204,21,0.35)",
                color: "#facc15",
                borderRadius: "6px",
                padding: "0.18rem 0.55rem",
                fontSize: "0.68rem",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {copied ? "Copiado ✓" : "Copiar CLI"}
            </button>
          </div>
          <pre className="gotham-terminal__body">
            {stage.log.map((line, i) => (
              <div key={i}>
                {line.startsWith("$") ? (
                  <span className="gotham-terminal__prompt">{line}</span>
                ) : line.startsWith("✓") ? (
                  <span className="gotham-terminal__ok">{line}</span>
                ) : (
                  <span className="gotham-terminal__dim">{line}</span>
                )}
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* Commercial Model: Installation + Corporate Agent Squads */}
      <div className="gotham-offer-grid" id="contato">
        <article className="gotham-card gotham-offer-card">
          <div>
            <span className="gotham-pill gotham-pill--run">01 // SETUP & IMPLANTAÇÃO</span>
            <h3>Instalação do GothamOS</h3>
            <p>
              Projeto fechado com contrato formal, emissão fiscal e adequação LGPD para colocar o GothamOS rodando na
              sua infraestrutura local ou nuvem privada.
            </p>
            <ul className="gotham-offer-list">
              <li>Diagnóstico de hardware/VPC e mapeamento dos seus ERPs</li>
              <li>Provisionamento completo (vLLM/Docker/K8s ou VPC single-tenant)</li>
              <li>Ontologia inicial, conectores e treinamento da equipe</li>
            </ul>
          </div>
          <HardwareButton
            variant="primary"
            href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20agendar%20o%20diagn%C3%B3stico%20de%20instala%C3%A7%C3%A3o%20do%20GothamOS."
          >
            Solicitar Diagnóstico de Instalação
          </HardwareButton>
        </article>

        <article className="gotham-card gotham-offer-card">
          <div>
            <span className="gotham-pill gotham-pill--ok">02 // OPERAÇÃO CONTÍNUA</span>
            <h3>Time de Agentes Corporativos</h3>
            <p>
              Contrate squads especializados para Financeiro, Operações, Jurídico ou Saúde — com evolução contínua,
              novas automações e suporte direto da Zack Studios.
            </p>
            <ul className="gotham-offer-list">
              <li>Agentes sob medida com ferramentas e aprovações por cargo (RBAC)</li>
              <li>Vigilância Sentinel 24/7 + briefings no console e WhatsApp</li>
              <li>SLA de engenharia, auditoria contínua e atualizações de modelos</li>
            </ul>
          </div>
          <HardwareButton
            href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20montar%20um%20time%20de%20agentes%20corporativos%20no%20GothamOS."
          >
            Montar Meu Time de Agentes
          </HardwareButton>
        </article>
      </div>
    </section>
  );
}
