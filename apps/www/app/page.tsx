import type { Metadata } from "next";
import { HomeV3 } from "@/components/gotham-v3/HomeV3";

export const metadata: Metadata = {
  title: "GothamOS — Inteligência Operacional & Time de Agentes Corporativos",
  description:
    "Plataforma multipage de inteligência executiva no padrão Palantir Gotham: implante 100% local (On-Premise / vLLM) ou em nuvem privada (VPC) com squads de agentes sob medida.",
};

export default function Page() {
  return <HomeV3 />;
}
