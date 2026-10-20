---
layout: ../../layouts/Docs.astro
title: "Security model"
description: "What Moss protects, what container isolation does, and what it does not."
slug: security
---

# Security model

Moss is designed so that signing in is not the only line of defence. Read this section before exposing it.

- **Loopback by default.** Dev auth mode refuses any other bind. A TLS reverse proxy is required for remote access.
- **Authorisation on every call.** REST, WebSocket console, SSE stream, downloads and undo/restore go through the same per-server permission check. Servers you cannot see return *not found*.
- **Invite-only, setup token, MFA.** A valid Supabase token is not enough; the account must be the owner or invited, with a verified email. Ownership of a fresh instance is claimed with a one-time token, not by being first. `MOSS_REQUIRE_MFA` can demand an MFA session for admins or everyone.
- **API tokens.** Personal tokens (`moss_pat_…`) are stored as SHA-256, shown once, scoped read or full, expire, and can never manage tokens or users.
- **Throttling.** Repeated invalid credentials from one address are rejected with 429.
- **Files confined to the server.** Path normalisation plus a symlink check on every component; `.moss/` is unreachable; uploads are never served inline.
- **Hardened downloads and archives.** HTTPS-only host allow-list re-checked on redirects, size caps, checksum verification, atomic placement; archives and modpacks reject traversal, links and devices; project links from authors are only passed on as http(s).
- **Webhooks are SSRF-safe.** HTTPS only, no redirects, the resolved address must be public.
- **The CurseForge key never reaches your machine.** The relay confirms a real signed-in user before using it.
- **Single-use stream tickets** instead of tokens in URLs; strict CSP; `nosniff`, no-referrer, no framing.
- **No shell exposure.** The UI cannot run commands on the host. Game processes are launched from an argument array. The one exception is the **admin-only Custom runtime**, which by definition runs an administrator-supplied command as the Moss user; grant admin accordingly.
- **Isolation is opt-in.** By default, game servers and the plugins and mods they load run as the same OS user as Moss. Switch a server to **container isolation** (Settings → Isolation, needs Docker or Podman) to run it with one mounted folder, no capabilities, a read-only root, and memory, CPU and process limits. It does not restrict outbound network access. On Linux, cgroup limits are available without containers but do not isolate files or the network. Run Moss as a dedicated unprivileged user (the shipped systemd unit does), and treat plugins and mods as code you are trusting. The full analysis is in [docs/threat-model.md](../threat-model/).

Report security issues privately through GitHub's *Report a vulnerability* on this repository.
