---
layout: ../../layouts/Docs.astro
title: "Security model"
description: "What Moss protects, what it does not yet, and how to report a problem."
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
- **CurseForge key never leaves the server side.** The edge function confirms a real signed-in user with Supabase Auth before using it.
- **Single-use stream tickets** instead of tokens in URLs; strict CSP; `nosniff`, no-referrer, no framing.
- **No shell exposure.** The UI cannot run commands on the host. Game processes are launched from an argument array. The one exception is the **admin-only Custom runtime**, which by definition runs an administrator-supplied command as the Moss user; grant admin accordingly.
- **No isolation yet (important).** Game servers, and any plugin or mod they load, run as the same OS user as Moss with that user's file access. The Forge/NeoForge/Quilt installers are third-party code run the same way. Run Moss as a dedicated unprivileged user (the shipped systemd unit does, with sandboxing), and treat plugins and mods as code you are trusting. Linux cgroup limits cap memory, CPU and process counts per server but do not isolate files or the network. Container isolation is on the roadmap.

Report security issues privately through GitHub's *Report a vulnerability* on this repository.
