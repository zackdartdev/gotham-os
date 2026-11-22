import type { Metadata } from "next";
import { PlanosView } from "@/components/gotham-v3/PlanosView";

export const metadata: Metadata = {
  title: "Planos & Simulador de ROI — GothamOS B2B",
  description:
    "Planos de implantação base, operação multi-squad e enterprise air-gap com simulador de economia e Enterprise Pilot Pass.",
};

export default function PlanosPage() {
  return <PlanosView />;
}
