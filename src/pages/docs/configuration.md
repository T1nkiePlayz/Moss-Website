---
layout: ../../layouts/Docs.astro
title: Configuration
description: Every Moss flag and environment variable, plus the data directory layout.
slug: configuration
---

# Configuration

Flags and environment variables (flags win):

| Variable | Default | Meaning |
|---|---|---|
| `MOSS_BIND` / `MOSS_PORT` | `127.0.0.1` / `8420` | Listener. Keep loopback unless a TLS proxy fronts it. |
| `MOSS_DATA_DIR` | `./moss-data` | Database, servers, backups, managed Java, cache. |
| `MOSS_AUTH` | `supabase` | `supabase` or `dev` (no login, loopback only). |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | – | Your project URL and publishable key. |
| `SUPABASE_JWT_SECRET` | – | Only for legacy HS256-signed projects. |
| `MOSS_OWNER_EMAILS` | – | Comma-separated emails that become owner on first verified sign-in. |
| `MOSS_REQUIRE_VERIFIED_EMAIL` | `true` | Require a verified email before matching owner/invite. |
| `CURSEFORGE_API_KEY` | – | Your own CurseForge key for direct access (secret; `.env.local`). Without it Moss uses the Supabase edge function, see [CurseForge setup](../curseforge/). |
| `MOSS_CURSEFORGE_PROXY` | auto | Edge function URL, or `off` to disable CurseForge. |
| `MOSS_CURSEFORGE_API_URL` | `https://api.curseforge.com` | API base for direct mode (https, or loopback for tests). |
| `MOSS_DEV_RUNTIMES` | `false` | Expose the simulated server runtime (demos, tests). |
| `RUST_LOG` | `moss=info` | Log filter. |

Data layout: `moss.sqlite`, `servers/<id>/` (game files; Moss metadata in `.moss/`), `backups/<server-id>/<backup-id>.tar.zst`, `java/<major>/`, `removed/` (directories kept on delete/restore), `tmp/` (cleared on start).
