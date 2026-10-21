export const REPO = 'https://github.com/T1nkiePlayz/Moss';
export const SITE_REPO = 'https://github.com/T1nkiePlayz/Moss-Website';
export const VERSION = '0.1.0';

/** Prefix a site-root path with the deploy base (GitHub Pages project sites live under /<repo>/). */
export const url = (p = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${p.startsWith('/') ? p : `/${p}`}`;
};

export interface DocPage { slug: string; title: string; group: string; blurb: string }
export const DOCS: DocPage[] = [
  { slug: 'getting-started', title: 'Getting started', group: 'Start', blurb: 'Install Moss on Linux or macOS, try dev mode, run it as a service.' },
  { slug: 'features', title: 'Features', group: 'Start', blurb: 'Everything Moss can do today.' },
  { slug: 'sign-in', title: 'Sign-in and accounts', group: 'Start', blurb: 'Becoming the owner, roles, two-factor sign-in and API tokens.' },
  { slug: 'configuration', title: 'Configuration', group: 'Start', blurb: 'Every flag, variable and the data layout.' },
  { slug: 'macos', title: 'macOS', group: 'Start', blurb: 'Apple silicon and Intel: install, Gatekeeper, launchd, Java.' },
  { slug: 'mods', title: 'Mods and compatibility', group: 'Operate', blurb: 'Jar checks, updates, staged updates, upgrades and modpacks.' },
  { slug: 'curseforge', title: 'CurseForge', group: 'Operate', blurb: 'How CurseForge works in Moss, with its limits explained.' },
  { slug: 'hangar', title: 'Hangar plugins', group: 'Operate', blurb: 'Browse and install plugins from PaperMC Hangar, no key needed.' },
  { slug: 'game-mods', title: 'Game mods', group: 'Operate', blurb: 'Mods for Valheim, Factorio, Garry\'s Mod and CS2.' },
  { slug: 'player-lists', title: 'Shared player lists', group: 'Operate', blurb: 'Whitelists and ban lists managed once, applied to many servers.' },
  { slug: 'maps', title: 'Live maps', group: 'Operate', blurb: 'Web map plugins in the Map tab and on status pages.' },
  { slug: 'push', title: 'Web Push and install', group: 'Operate', blurb: 'Install the web app and get push notifications.' },
  { slug: 'runtimes', title: 'Runtimes', group: 'Operate', blurb: 'What you can run and how each runtime is verified.' },
  { slug: 'recovery', title: 'Recovery', group: 'Operate', blurb: 'Locked out, stuck jobs, integrity checks.' },
  { slug: 'security', title: 'Security model', group: 'Operate', blurb: 'What Moss protects, and what it does not.' },
  { slug: 'threat-model', title: 'Threat model', group: 'Reference', blurb: 'Assets, attackers and mitigations in detail.' },
  { slug: 'webhooks', title: 'Event webhooks', group: 'Operate', blurb: 'Signed outbound events and how to verify them.' },
  { slug: 'desktop', title: 'Desktop app', group: 'Operate', blurb: 'The desktop shell: what it does and its current status.' },
  { slug: 'security-review', title: 'Security review', group: 'Reference', blurb: 'Findings and fixes from the internal review.' },
  { slug: 'api-policy', title: 'API policy', group: 'Reference', blurb: 'What is frozen and what counts as a breaking change.' },
  { slug: 'architecture', title: 'Architecture', group: 'Reference', blurb: 'How servers survive controller restarts.' },
  { slug: 'api', title: 'HTTP API', group: 'Reference', blurb: 'The REST, WebSocket and SSE reference.' },
];

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/docs/', label: 'Docs' },
  { href: '/download/', label: 'Download' },
  { href: '/changelog/', label: 'Changelog' },
  { href: '/roadmap/', label: 'Roadmap' },
];
