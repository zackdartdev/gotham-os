"use client";

import { useCallback, useRef, useState } from "react";
import "echo-ui-core/theme/material.css";
import { SoundProvider } from "echo-ui-core/sound";
import { AppShell } from "@registry/echo/app-shell";
import { TopNavLinks, Wordmark } from "@/components/site/SiteTopBar";
import { SiteMenu } from "@/components/site/SiteMenu";
import { LANDING_NAV } from "@/components/site/site-nav";
import { HomeHero } from "@/components/home/HomeHero";
import { Echo3D } from "@/components/home/echo3d/Echo3D";
import { Keychain } from "@/components/home/Keychain";
import { NavTools } from "@/components/home/NavTools";
import { TechMarquee } from "@/components/home/sections/TechMarquee";
import { GothamFlow } from "@/components/home/sections/GothamFlow";
import { GothamSquadsV2 } from "@/components/home/sections/GothamSquadsV2";
import { GothamDeployV2 } from "@/components/home/sections/GothamDeployV2";
import { FounderManifesto } from "@/components/home/sections/FounderManifesto";
import { HomeFooter } from "@/components/home/HomeFooter";
import { LANDING_SEED } from "@/components/home/landing-seed";
import { useReveal } from "@/components/home/use-reveal";
import { useSmoothScroll } from "@/components/home/use-smooth-scroll";
import { LightPool, type LightPoolHandle } from "@/components/home/light/LightPool";
import { CARRIED } from "@/components/home/light/look";
import type { DrawnPose } from "@/components/home/echo3d/stage";
import "./home.css";
import "./landing.css";
import "./sections.css";
import "./gotham/gotham.css";
import "./sections/oversight.css";
import "./road/road.css";

export interface HomeCounts {
  components: number;
  templates: number;
}

export function HomePage({ counts: _counts }: { counts: HomeCounts }) {
  const [away, setAway] = useState(false);
  const [home, setHome] = useState<boolean | null>(null);
  useReveal();
  useSmoothScroll();
  const pool = useRef<LightPoolHandle>(null);
  const onPose = useCallback((p: DrawnPose) => pool.current?.move(p), []);

  return (
    <SoundProvider>
      <AppShell bare className="home-shell">
        <AppShell.Rail label="Site" brand={<Wordmark />}>
          <TopNavLinks links={LANDING_NAV} opening={LANDING_SEED} tools={<NavTools />} />
          <SiteMenu links={LANDING_NAV} tools={<NavTools />} />
        </AppShell.Rail>
        <AppShell.Content>
          <div className="home-lit">
            <LightPool ref={pool} mode={CARRIED.mode} amount={CARRIED.amount} size={CARRIED.size} />
            <HomeHero away={home === null ? away : !home} />
            <TechMarquee />
            <GothamFlow />
            <GothamSquadsV2 />
            <GothamDeployV2 />
            <FounderManifesto />
            <HomeFooter />
          </div>
        </AppShell.Content>
      </AppShell>
      <Echo3D onAwayChange={setAway} onHomeChange={setHome} onPose={onPose} />
      <Keychain />
    </SoundProvider>
  );
}
