---
layout: ../../layouts/Docs.astro
title: "Configuration"
description: "Every flag, environment variable and the data layout."
slug: configuration
---

# Configuration

Flags and environment variables (flags win):

| Variable | Default | Meaning |
|---|---|---|
| `MOSS_BIND` / `MOSS_PORT` | `127.0.0.1` / `8420` | Listener. Keep loopback unless a TLS proxy fronts it. |
| `MOSS_DATA_DIR` | `~/.local/share/moss` (Linux), `~/Library/Application Support/Moss/data` (macOS); an existing `./moss-data`, `~/moss/moss-data` or `~/moss-data` database wins; `./moss-data` without `HOME` | Database, servers, backups, managed Java, cache. |
| `MOSS_UPDATE_CHECK` | `true` | Look for new Moss releases a minute after start and every 6 hours, and offer them in the panel. Dev mode never checks. |
| `MOSS_AUTH` | `supabase` | `supabase` or `dev` (no login, loopback only). |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | built in | Only to use your own sign-in project instead of the default. Setting either one (flag, environment or `.env`) turns the built-in pair off, so set both. |
| `SUPABASE_JWT_SECRET` | – | Only for legacy HS256-signed projects. |
| `MOSS_OWNER_EMAILS` | – | Comma-separated emails that become owner on first verified sign-in. |
| `MOSS_REQUIRE_VERIFIED_EMAIL` | `true` | Require a verified email before matching owner/invite. |
| `MOSS_REQUIRE_MFA` | `off` | `off`, `admins` or `all`: require an MFA (aal2) session. |
| `MOSS_TRUST_PROXY` | `false` | Read the client address from `X-Forwarded-For` (only behind a proxy). |
| `MOSS_ALLOW_PRIVATE_WEBHOOKS` | `false` | Let notification webhooks resolve to private addresses (still HTTPS only). |
| `MOSS_ALLOW_PRIVATE_BACKUP_HOSTS` | `false` | Let an S3 backup destination resolve to a private or loopback address (a MinIO on your LAN). Plain `http` is then accepted for loopback only. |
| `CURSEFORGE_API_KEY` | – | Your own CurseForge key for direct access (secret; `.env.local`). Without it Moss uses the built-in relay, see [docs/curseforge.md](../curseforge/). |
| `MOSS_CURSEFORGE_PROXY` | auto | Relay URL, or `off` to disable CurseForge. |
| `MOSS_CONTAINER_ENGINE` | auto | `docker` or `podman` to force an engine for container isolation. |
| `MOSS_STAGING_PORT_RANGE` | `30000-30999` | Ports used by test copies in staged updates. |
| `MOSS_ALLOW_PRIVATE_BACKUP_HOSTS` | `false` | Let a backup destination resolve to a private address. |
| `MOSS_CURSEFORGE_API_URL` | `https://api.curseforge.com` | API base for direct mode (https, or loopback for tests). |
| `MOSS_DEV_RUNTIMES` | `false` | Expose the simulated server runtime (demos, tests). |
| `RUST_LOG` | `moss=info` | Log filter. |

Data layout: `moss.sqlite`, `servers/<id>/` (game files; Moss metadata in `.moss/`), `backups/<server-id>/<backup-id>.tar.zst`, `java/<major>/`, `removed/` (directories kept on delete/restore), `tmp/` (cleared on start), `setup-token` (until ownership is claimed).
