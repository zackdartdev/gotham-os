"use client";

import { Cpu, Layers } from "lucide-react";

const GOTHAM_STACK = [
  { name: "vLLM Engine", cat: "Inferência" },
  { name: "llama.cpp", cat: "Edge / CPU" },
  { name: "Docker & Kubernetes", cat: "Orquestração" },
  { name: "NVIDIA CUDA / TensorRT", cat: "GPU" },
  { name: "PostgreSQL + pgvector", cat: "Memória" },
  { name: "ClickHouse", cat: "Telemetria" },
  { name: "Redis Streams", cat: "Eventos" },
  { name: "TOTVS Protheus", cat: "ERP" },
  { name: "Philips Tasy", cat: "Saúde" },
  { name: "ERP Sênior", cat: "ERP" },
  { name: "4medic", cat: "Clínico" },
  { name: "AWS / GCP Private VPC", cat: "Cloud" },
  { name: "Zero-Trust TLS 1.3", cat: "Segurança" },
  { name: "LGPD Audit Trail", cat: "Compliance" },
];

const INTERFACE_STACK = [
  { name: "Next.js 16", cat: "App Router" },
  { name: "React 19", cat: "UI Core" },
  { name: "TypeScript 6", cat: "Tipagem" },
  { name: "Three.js WebGL", cat: "3D Engine" },
  { name: "Motion (Framer)", cat: "Cinética" },
  { name: "GSAP Timeline", cat: "Coreografia" },
  { name: "Lenis Smooth Scroll", cat: "Scroll" },
  { name: "CSS 3D Cutaway", cat: "Hardware" },
  { name: "21st.dev Patterns", cat: "Componentes" },
  { name: "Lucide Vector", cat: "Ícones" },
  { name: "Vercel Edge", cat: "Deploy" },
];

export function TechMarquee() {
  return (
    <section className="tech-marquee" aria-label="Tecnologias que rodam no site e na infraestrutura do GothamOS">
      <div className="tech-marquee__label">
        <span className="tech-marquee__label-dot" aria-hidden="true" />
        <Cpu size={14} aria-hidden="true" />
        <span>Stack em produção · Infraestrutura GothamOS &amp; Motor desta Interface</span>
        <Layers size={14} aria-hidden="true" />
      </div>

      <div className="tech-marquee__viewport">
        {/* Row 1: GothamOS AI, Data & Enterprise Infrastructure */}
        <div className="tech-marquee__track tech-marquee__track--fwd" aria-label="Tecnologias do GothamOS">
          {[...GOTHAM_STACK, ...GOTHAM_STACK].map((item, idx) => (
            <span key={`g-${idx}`} className="tech-pill">
              <span className="tech-pill__cat">{item.cat}</span>
              {item.name}
            </span>
          ))}
        </div>

        {/* Row 2: Web, 3D & Motion Technologies powering this site */}
        <div className="tech-marquee__track tech-marquee__track--rev" aria-label="Tecnologias desta interface">
          {[...INTERFACE_STACK, ...INTERFACE_STACK].map((item, idx) => (
            <span key={`i-${idx}`} className="tech-pill">
              <span className="tech-pill__cat">{item.cat}</span>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
