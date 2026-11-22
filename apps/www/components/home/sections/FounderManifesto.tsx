"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { HardwareButton } from "@registry/echo/hardware-button";
import { GuideStop } from "@/components/home/Guide";

const STATS = [
  { value: "30+", label: "Empresas atendidas" },
  { value: "6", label: "Países em operação" },
  { value: "0B", label: "Vazamento no modo local" },
  { value: "100%", label: "Contrato formal & LGPD" },
];

export function FounderManifesto() {
  return (
    <section id="fundador" className="os-sec" aria-labelledby="manifesto-h" data-guide-section="">
      <div className="os-wrap">
        <motion.div
          className="os-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="os-index">04 · Zack Studios &amp; Engenharia</span>
            <h2 id="manifesto-h" className="os-title">
              Engenharia antes <span className="os-title__accent">do espetáculo.</span>
            </h2>
          </div>
          <p className="os-lede">
            Idealizado por <strong>Isaac Lamego</strong> na <strong>Zack Studios</strong> — unindo experiência real em
            integrações de ERPs críticos com arquitetura soberana de agentes.
          </p>
        </motion.div>

        <GuideStop />

        <div className="manifesto-grid">
          <div className="os-card manifesto-copy">
            <p>
              Ao longo de projetos com <strong>mais de 30 empresas em 6 países</strong> — integrando sistemas críticos
              como <strong>Protheus, Tasy, Sênior e 4medic</strong> — o mesmo gargalo se repetiu: operações maduras
              sentadas sobre montanhas de dados, mas ainda reféns de planilhas manuais e decisões tardias.
            </p>
            <p>
              O mercado de IA corporativa empurra dois extremos inviáveis: chats genéricos que expõem dados sensíveis na
              nuvem de terceiros, ou plataformas milionárias inacessíveis para empresas reais.
            </p>
            <p>
              O <strong>GothamOS</strong> fecha essa lacuna. Inspirado no rigor operacional do padrão Palantir Gotham,
              entregamos uma camada soberana que roda <strong>100% local (on-premise)</strong> ou na{" "}
              <strong>sua nuvem privada (VPC)</strong> — já acompanhada de um{" "}
              <strong>time de agentes corporativos</strong> desenhado para gerar resultado mensurável nas primeiras
              semanas.
            </p>
            <div>
              <HardwareButton
                variant="primary"
                size="lg"
                href="https://wa.me/5521990315582?text=Ol%C3%A1%20Isaac!%20Quero%20conversar%20sobre%20um%20piloto%20B2B%20do%20GothamOS."
              >
                Falar com Isaac no WhatsApp
              </HardwareButton>
            </div>
          </div>

          <div className="os-card manifesto-aside">
            <div className="manifesto-stats">
              {STATS.map((st) => (
                <div key={st.label} className="manifesto-stat">
                  <strong>{st.value}</strong>
                  <span>{st.label}</span>
                </div>
              ))}
            </div>

            <ul className="manifesto-links">
              <li>
                <a href="https://wa.me/5521990315582" target="_blank" rel="noopener noreferrer">
                  <span>WhatsApp · +55 21 99031-5582</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="mailto:contato.zackstudio@gmail.com">
                  <span>contato.zackstudio@gmail.com</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://github.com/zackdartdev" target="_blank" rel="noopener noreferrer">
                  <span>GitHub · zackdartdev</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
