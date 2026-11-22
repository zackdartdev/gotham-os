"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Server, Cloud, Terminal, Check } from "lucide-react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { GuideStop } from "@/components/home/Guide";

type DeployMode = "onprem" | "vpc";

const MODES: Record<
  DeployMode,
  {
    label: string;
    subtitle: string;
    specs: { label: string; value: string; note: string }[];
    stages: { num: string; title: string; desc: string; cmd: string; logs: string[] }[];
  }
> = {
  onprem: {
    label: "100% Local (On-Premise)",
    subtitle:
      "Roda integralmente dentro do seu servidor ou datacenter via Docker/Kubernetes + vLLM ou llama.cpp. Zero dependência de APIs externas ou ferramentas desktop.",
    specs: [
      { label: "Motor de Inferência", value: "vLLM / llama.cpp", note: "Produção headless via container GPU/CPU" },
      { label: "Soberania", value: "Air-Gap Ready", note: "0 bytes enviados para fora da rede" },
      { label: "Banco & Vetores", value: "PostgreSQL + pgvector", note: "Persistência e RAG dentro do seu perímetro" },
      { label: "Hardware Sugerido", value: "1–4x GPU 24GB+", note: "RTX 4090/L40S/A100 ou servidor CPU quantizado" },
    ],
    stages: [
      {
        num: "01",
        title: "Diagnóstico & Sizing",
        desc: "Mapeamos ERPs, volume de dados e dimensionamos o hardware ideal (GPU ou CPU).",
        cmd: "gotham-ctl audit --target=on-prem --check-gpu",
        logs: [
          "✓ NVIDIA CUDA 12.6 detectado (2x 48GB VRAM disponíveis)",
          "✓ Conectividade interna com Protheus / PostgreSQL validada",
          "✓ Perfil recomendado: vLLM FP8 + pgvector local",
        ],
      },
      {
        num: "02",
        title: "Provisionamento Container",
        desc: "Subimos a stack completa via Docker Compose ou Helm Chart com TLS interno.",
        cmd: "gotham-ctl deploy --mode=on-prem --engine=vllm --tls=mtls",
        logs: [
          "✓ Imagens assinadas carregadas (gotham-core, vllm-worker, audit-db)",
          "✓ Política Zero-Egress aplicada no firewall interno",
          "✓ Healthcheck: 6/6 serviços saudáveis em 18s",
        ],
      },
      {
        num: "03",
        title: "Conexão ERP & Squads",
        desc: "Ativamos conectores somente-leitura, ontologia corporativa e os agentes contratados.",
        cmd: "gotham-ctl squad attach --preset=financeiro,operacoes --rbac=strict",
        logs: [
          "✓ Ontologia sincronizada: 184k entidades indexadas localmente",
          "✓ Squad Financeiro & Operações ativos com aprovação 1-clique",
          "✓ Trilha SHA-256 gravando em ClickHouse local",
        ],
      },
      {
        num: "04",
        title: "Operação Assistida & SLA",
        desc: "Acompanhamento contínuo, ajuste fino de playbooks e evolução dos agentes.",
        cmd: "gotham-ctl status --audit-window=30d",
        logs: [
          "✓ Uptime 99,96% · 12.480 execuções auditadas",
          "✓ Custo variável de API externa: R$ 0,00",
          "✓ Relatório executivo entregue à diretoria",
        ],
      },
    ],
  },
  vpc: {
    label: "Nuvem Privada (VPC)",
    subtitle:
      "Implantado na sua própria conta AWS, GCP ou Azure com VPC isolada, Inference Router multi-modelo e contrato de zero retenção de dados.",
    specs: [
      { label: "Infraestrutura", value: "Sua AWS / GCP / Azure", note: "Terraform + VPC privada sem multi-tenant" },
      { label: "Modelos & Router", value: "Inference Router", note: "Alterna modelos open-weights e frontier com fallback" },
      { label: "Escalabilidade", value: "Auto-Scale GPU/CPU", note: "Pague apenas pelo pico operacional real" },
      { label: "Segurança", value: "KMS + SSO + LGPD", note: "Chaves gerenciadas pelo cliente e trilha imutável" },
    ],
    stages: [
      {
        num: "01",
        title: "Arquitetura VPC & KMS",
        desc: "Provisionamos sub-redes privadas, VPN Site-to-Site com seu ERP e chaves KMS.",
        cmd: "gotham-ctl vpc init --provider=aws --region=sa-east-1 --kms=client",
        logs: [
          "✓ VPC isolada criada em São Paulo (sa-east-1)",
          "✓ Túnel WireGuard / IPSec conectado ao ERP do cliente",
          "✓ Zero exposição pública de bancos ou vetores",
        ],
      },
      {
        num: "02",
        title: "Inference Router & Cache",
        desc: "Configuramos roteamento inteligente entre modelos rápidos e raciocínio profundo.",
        cmd: "gotham-ctl router apply --zero-retention=true --budget-cap=strict",
        logs: [
          "✓ Roteamento por complexidade ativo (economia média de 62%)",
          "✓ Zero-Data-Retention verificado em todos os endpoints",
          "✓ Cache semântico Redis reduzindo latência para < 650ms",
        ],
      },
      {
        num: "03",
        title: "Deploy de Squads & SSO",
        desc: "Autenticação corporativa (Google/Microsoft Entra ID) e ativação dos times de agentes.",
        cmd: "gotham-ctl squad deploy --sso=entra-id --channels=console,whatsapp",
        logs: [
          "✓ SSO corporativo e permissões RBAC por diretoria ativos",
          "✓ Squads conectados aos canais executivos e ERP",
          "✓ Telemetria de custo por departamento habilitada",
        ],
      },
      {
        num: "04",
        title: "Governança & Evolução",
        desc: "Monitoramento de performance, novos agentes sob demanda e auditoria contínua.",
        cmd: "gotham-ctl telemetry --summary",
        logs: [
          "✓ Latência P95 estável em 1,1s · SLA 99,95%",
          "✓ 100% das decisões com prova documental citável",
          "✓ Expansão modular para novas áreas em dias",
        ],
      },
    ],
  },
};

export function GothamDeployV2() {
  const [mode, setMode] = useState<DeployMode>("onprem");
  const [stageIdx, setStageIdx] = useState(0);

  const cfg = MODES[mode];
  const stage = cfg.stages[stageIdx] ?? cfg.stages[0]!;

  const switchMode = (next: DeployMode) => {
    setMode(next);
    setStageIdx(0);
  };

  return (
    <section id="instalacao" className="os-sec" aria-labelledby="deploy-h" data-guide-section="">
      <div className="os-wrap">
        <motion.div
          className="os-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="os-index">03 · Instalação Local &amp; Nuvem Privada</span>
            <h2 id="deploy-h" className="os-title">
              Arquitetura realista <span className="os-title__accent">para a sua infraestrutura.</span>
            </h2>
          </div>
          <p className="os-lede">
            Nada de gambiarras em desktop. O <strong>GothamOS</strong> roda em containers de produção{" "}
            <strong>100% local (on-premise)</strong> ou na <strong>sua nuvem privada (VPC)</strong>, conforme a política
            de segurança e o orçamento da sua empresa.
          </p>
        </motion.div>

        <GuideStop />

        {/* Mode Toggle */}
        <div className="gotham-mode-switch">
          <div className="deploy-toggle" role="tablist" aria-label="Modo de implantação">
            {(["onprem", "vpc"] as const).map((key) => {
              const active = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`deploy-toggle__btn ${active ? "deploy-toggle__btn--active" : ""}`}
                  onClick={() => switchMode(key)}
                >
                  {active && (
                    <motion.span
                      layoutId="deploy-mode-pill"
                      className="os-tab__bg"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  <span className="os-tab__label">
                    {key === "onprem" ? <Server size={15} /> : <Cloud size={15} />}
                    {MODES[key].label}
                  </span>
                </button>
              );
            })}
          </div>
          <span className="gotham-pill gotham-pill--ok">PROTOCOLO EM 4 ETAPAS · ZERO LOCK-IN</span>
        </div>

        {/* 4-Stage Pipeline */}
        <div className="gotham-pipeline-grid">
          {cfg.stages.map((st, idx) => (
            <button
              key={`${mode}-${st.num}`}
              type="button"
              className={`gotham-stage ${stageIdx === idx ? "gotham-stage--active" : ""}`}
              onClick={() => setStageIdx(idx)}
            >
              <span className="gotham-stage__num">
                <span>ETAPA {st.num}</span>
                {stageIdx >= idx && <Check size={13} aria-hidden="true" />}
              </span>
              <h3 className="gotham-stage__title">{st.title}</h3>
              <p className="gotham-stage__desc">{st.desc}</p>
            </button>
          ))}
        </div>

        {/* Mode Specs + Live Terminal */}
        <div className="os-card gotham-deploy-detail">
          <div>
            <h3 className="gotham-plan__title">{cfg.label}</h3>
            <p className="gotham-plan__sub">{cfg.subtitle}</p>
            <div className="gotham-specs">
              {cfg.specs.map((sp) => (
                <div key={sp.label} className="gotham-spec">
                  <small>{sp.label}</small>
                  <strong>{sp.value}</strong>
                  <span>{sp.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="gotham-terminal" aria-live="polite">
            <div className="gotham-terminal__bar">
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <Terminal size={13} aria-hidden="true" />
                gotham-ctl · etapa {stage.num}
              </span>
              <span>{mode === "onprem" ? "ON-PREM" : "PRIVATE-VPC"}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.pre
                key={`${mode}-${stage.num}`}
                className="gotham-terminal__body"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                <span className="gotham-terminal__prompt">$ </span>
                {stage.cmd}
                {"\n\n"}
                {stage.logs.map((line, i) => (
                  <span key={i} className="gotham-terminal__ok">
                    {line}
                    {"\n"}
                  </span>
                ))}
              </motion.pre>
            </AnimatePresence>
          </div>
        </div>

        {/* Commercial Engagement Models */}
        <div id="contato" className="gotham-offer-grid">
          <div className="os-card gotham-offer-card">
            <div>
              <span className="gotham-pill gotham-pill--run">MODELO 01 · FUNDAÇÃO</span>
              <h3>Implantação Base GothamOS</h3>
              <p>
                Instalamos e configuramos a infraestrutura completa (100% local ou VPC privada) conectada aos seus
                sistemas atuais, com segurança, RBAC e painel executivo prontos para operar.
              </p>
              <ul className="gotham-offer-list">
                <li>Setup completo Docker/K8s + vLLM/llama.cpp ou Private VPC</li>
                <li>Conectores somente-leitura para ERPs, bancos e documentos</li>
                <li>Trilha de auditoria imutável e conformidade LGPD</li>
                <li>Treinamento da equipe técnica e documentação completa</li>
              </ul>
            </div>
            <div>
              <HardwareButton
                variant="primary"
                size="md"
                href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20or%C3%A7amento%20para%20a%20Implanta%C3%A7%C3%A3o%20Base%20do%20GothamOS."
              >
                Solicitar Diagnóstico de Implantação
              </HardwareButton>
            </div>
          </div>

          <div className="os-card gotham-offer-card">
            <div>
              <span className="gotham-pill gotham-pill--ok">MODELO 02 · ESCALA</span>
              <h3>Time de Agentes Sob Medida</h3>
              <p>
                Projetamos, treinamos e mantemos squads de agentes dedicados aos seus processos críticos — cobrando por
                entrega de valor operacional, não por promessas genéricas.
              </p>
              <ul className="gotham-offer-list">
                <li>Squads Financeiro, Operações, Jurídico, Clínico ou Executivo</li>
                <li>Fluxos com aprovação humana (Human-in-the-Loop)</li>
                <li>Evolução contínua de playbooks, prompts e conectores</li>
                <li>SLA corporativo e contrato formal com emissão fiscal</li>
              </ul>
            </div>
            <div>
              <HardwareButton
                size="md"
                href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20contratar%20um%20Time%20de%20Agentes%20no%20GothamOS."
              >
                Desenhar Meu Time de Agentes
              </HardwareButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
