import { SEED_PRESETS, type Seed } from "@/components/site/seeds";

/**
 * The colour the homepage opens on until the visitor picks one: Gotham
 * (obsidian dark chassis with tactical yellow accent #FACC15).
 */
export const LANDING_SEED: Seed = SEED_PRESETS.find((p) => p.name === "Gotham")!.seed;
