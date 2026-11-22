import type { Metadata } from "next";
import { AgentesView } from "@/components/gotham-v3/AgentesView";

export const metadata: Metadata = {
  title: "Time de Agentes — GothamOS | 5 Squads Corporativos",
  description:
    "Conheça os squads autônomos Financeiro, Operações, Jurídico, Clínico e Executivo integrados a Protheus, Tasy, Sênior e 4medic.",
};

export default function AgentesPage() {
  return <AgentesView />;
}
