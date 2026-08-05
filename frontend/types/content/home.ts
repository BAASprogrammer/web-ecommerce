import type { LucideIcon } from "lucide-react";

export interface TrustSignal {
  icon: LucideIcon;
  label: string;
}

export interface WhyUsFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface CountdownItem {
  val: string;
  label: string;
}
