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
  { slug: 'getting-started', title: 'Getting started', group: 'Start', blurb: 'Install Moss, try dev mode, and run it as a service.' },
  { slug: 'configuration', title: 'Configuration', group: 'Start', blurb: 'Every flag, variable and the data layout.' },
  { slug: 'supabase', title: 'Sign-in with Supabase', group: 'Operate', blurb: 'Set up login, owners, invites and roles.' },
  { slug: 'curseforge', title: 'CurseForge', group: 'Operate', blurb: 'Set up CurseForge, with limits and terms explained.' },
  { slug: 'runtimes', title: 'Runtimes', group: 'Operate', blurb: 'What you can run and how each runtime is verified.' },
  { slug: 'security', title: 'Security model', group: 'Operate', blurb: 'What Moss protects, and what it does not yet.' },
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
