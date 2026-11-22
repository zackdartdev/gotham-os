import { SEED_PRESETS, type Seed } from "@/components/site/seeds";

/**
 * The colour the homepage opens on until the visitor picks one: Kirby Pink
 * (velvet dark plum chassis with vibrant Kirby rose accent #FF6FAE).
 */
export const LANDING_SEED: Seed = SEED_PRESETS.find((p) => p.name === "Kirby")!.seed;
