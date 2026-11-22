import type { Metadata } from "next";
import { DashboardView } from "@/components/gotham-v3/DashboardView";

export const metadata: Metadata = {
  title: "Dashboard Live — GothamOS | Centro de Comando & Auditoria",
  description:
    "Simule aprovações Human-in-the-Loop, inspecione a topologia de rede e acompanhe a trilha imutável SHA-256 do GothamOS ao vivo.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
