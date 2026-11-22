import type { Metadata } from "next";
import { ArquiteturaView } from "@/components/gotham-v3/ArquiteturaView";

export const metadata: Metadata = {
  title: "Arquitetura Local & Nuvem VPC — GothamOS",
  description:
    "Dimensione seu cluster 100% local (Docker/K8s + vLLM/llama.cpp) ou Private VPC na AWS/GCP com conformidade LGPD.",
};

export default function ArquiteturaPage() {
  return <ArquiteturaView />;
}
