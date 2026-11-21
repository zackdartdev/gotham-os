/**
 * The end of the page: a field of light across the whole width (FootLight),
 * and on it one panel that holds the wordmark and the ways onward, exactly as
 * wide as the page's other objects (the motion panel, the road's cards), the
 * way Lovable's foot sits on its gradient.
 *
 * The crowd heaps up on the panel's top edge, the way a conference's ticket
 * page ends in a heap of mascots: the first time the foot of the page comes
 * into view they drop in, in the seed's colour and its neighbours', and pile
 * up. Echo lands on the last perch above them and drops in too. Move the
 * pointer through them and they shove aside; press one and it jumps
 * (stage.ts).
 *
 * Without WebGL or JavaScript, the heap is a row of flat creatures instead.
 *
 * The panel is kept short enough that its top edge, where Echo lands, is in
 * view at the end of the page: where Echo works is a sentence under the mark,
 * not a column (it was the panel's tallest, eight names to two pages), privacy
 * and terms are in the foot row with the rest of the fine print, and on a
 * phone the groups of links are Echo's Accordion, one row each, rather than a
 * column of thirty links a screen and a half long.
 */
import { Fragment, type CSSProperties } from "react";
import { Creature } from "@registry/echo/creature";
import { Accordion } from "@registry/echo/accordion";
import { FusedLockup } from "@/components/brand/Logo";
import { GuideStop } from "@/components/home/Guide";
import { SEED_PRESETS } from "@/components/site/theme-store";
import { DeviceSwitch } from "@/components/site/DeviceSwitch";
import { LANDING_SEED } from "@/components/home/landing-seed";
import { FootLight } from "@/components/home/light/FootLight";
import { HeapLine } from "@/components/supporters/HeapLine";

/** The flat heap: sizes and colours that read as a crowd, not a row. */
const FLAT = [
  { size: 88, colour: undefined, lift: 0 },
  { size: 64, colour: SEED_PRESETS[1]!.seed.accent, lift: 10 },
  { size: 104, colour: SEED_PRESETS[3]!.seed.accent, lift: 0 },
  { size: 72, colour: SEED_PRESETS[2]!.seed.accent, lift: 4 },
  { size: 96, colour: undefined, lift: 0 },
  { size: 60, colour: SEED_PRESETS[1]!.seed.accent, lift: 14 },
  { size: 84, colour: SEED_PRESETS[3]!.seed.accent, lift: 2 },
];

type Group = { title: string; links: [string, string][] };

/** What Echo is, how to build with it, its tools, and the project. */
const COLUMNS: Group[] = [
  {
    title: "GothamOS",
    links: [
      ["Time de Agentes", "/#agentes"],
      ["Instalação Local & Cloud", "/#instalacao"],
      ["Console Tátil", "/#comando"],
      ["Diagnóstico B2B", "/#contato"],
    ],
  },
  {
    title: "Squads",
    links: [
      ["Financeiro & Fiscal", "/#agentes"],
      ["Operações & Supply", "/#agentes"],
      ["Jurídico & LGPD", "/#agentes"],
      ["Clínico & HealthTech", "/#agentes"],
      ["Comando Executivo", "/#agentes"],
    ],
  },
  {
    title: "Infraestrutura",
    links: [
      ["On-Premise (vLLM / Docker)", "/#instalacao"],
      ["Nuvem Privada (VPC)", "/#instalacao"],
      ["Templates de Console", "/templates"],
      ["Módulos da Interface", "/docs"],
    ],
  },
  {
    title: "Zack Studios",
    links: [
      ["Sobre Isaac Lamego", "/#fundador"],
      ["WhatsApp Corporativo", "https://wa.me/5521990315582"],
      ["contato.zackstudio@gmail.com", "mailto:contato.zackstudio@gmail.com"],
      ["GitHub", "https://github.com/zackdartdev"],
    ],
  },
];

const WORKS_WITH: [string, string][] = [
  ["Protheus", "/#instalacao"],
  ["Tasy", "/#instalacao"],
  ["ERP Sênior", "/#instalacao"],
  ["4medic", "/#instalacao"],
  ["vLLM", "/#instalacao"],
  ["Docker / K8s", "/#instalacao"],
  ["AWS / GCP VPC", "/#instalacao"],
];

/** On a phone, every group one row of the accordion, where it works among them. */
const PHONE_GROUPS: Group[] = [COLUMNS[0]!, COLUMNS[1]!, { title: "Works with", links: WORKS_WITH }, ...COLUMNS.slice(2)];

/** The fine print's own pages, in the foot row. */
const LEGAL: [string, string][] = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
];

export function HomeFooter() {
  return (
    <footer className="foot" data-guide-section="">
      <FootLight />
      <div className="foot__col">
        <div className="foot__pile" data-echo-pile="">
          <GuideStop className="foot__stop" mood="sleep" pile />
          <div className="foot__flat" aria-hidden="true">
            {FLAT.map((c, i) => (
              <span key={i} style={{ "--lift": `${c.lift}px` } as CSSProperties}>
                <Creature size={c.size} accent={c.colour} mood={i % 3 === 1 ? "idle" : "sleep"} />
              </span>
            ))}
          </div>
        </div>
        <div className="foot__panel">
          <div className="foot__inner">
            <div className="foot__mark">
              <div className="foot__lockup" aria-hidden="true">
                <FusedLockup H={60} />
              </div>
              <p className="foot__line">
                GothamOS — Inteligência operacional e time de agentes corporativos, 100% local ou em nuvem privada.
              </p>
              <p className="foot__line foot__works">
                Integra com{" "}
                {WORKS_WITH.map(([name, href], i) => (
                  <Fragment key={name}>
                    <a href={href}>{name}</a>
                    {i < WORKS_WITH.length - 2 ? ", " : i === WORKS_WITH.length - 2 ? " e " : "."}
                  </Fragment>
                ))}
              </p>
              {/* Some of the heap above are Echo's supporters, named when pointed at (echo3d/stage.ts). */}
              <HeapLine className="foot__line" />
            </div>
            <nav className="foot__nav" aria-label="Footer">
              {COLUMNS.map((c) => (
                <div key={c.title} className="foot__col-links">
                  <p className="foot__title">{c.title}</p>
                  <ul>
                    {c.links.map(([label, href]) => (
                      <li key={label}>
                        <a href={href}>{label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            {/* A phone: the same links, a row a group (home.css shows one or the other). */}
            <nav className="foot__menu" aria-label="Footer">
              {/* The groups' headers are h3s: this h2 puts them under a heading on any page. */}
              <h2 className="foot__sr">Echo&rsquo;s pages</h2>
              <Accordion>
                {PHONE_GROUPS.map((c) => (
                  <Accordion.Item key={c.title} value={c.title}>
                    <Accordion.Trigger>{c.title}</Accordion.Trigger>
                    <Accordion.Panel>
                      <ul className="foot__menu-links">
                        {c.links.map(([label, href]) => (
                          <li key={label}>
                            <a href={href}>{label}</a>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </nav>
          </div>
          {/*
            The foot row: who it's from and on what terms, on the left; the fine print's pages and the
            light key (where Cursor keeps its theme switch) on the right.
          */}
          <div className="foot__legal">
            <p className="foot__legal-lines">
              <span>© 2026 Zack Studios · GothamOS</span>
              <span>Contrato Formal &amp; LGPD</span>
              <span>
                Idealizado por <a href="#fundador">Isaac Lamego</a> · 100% remoto.
              </span>
            </p>
            {LEGAL.map(([label, href]) => (
              <a key={href} className="foot__legal-link" href={href}>
                {label}
              </a>
            ))}
            <DeviceSwitch opening={LANDING_SEED} />
          </div>
        </div>
      </div>
    </footer>
  );
}
