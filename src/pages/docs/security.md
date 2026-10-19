---
layout: ../../layouts/Docs.astro
title: Security model
description: What Moss protects, what it does not yet, and how to report a problem.
slug: security
---

# Security model

Moss is designed so that signing in is not the only line of defence. Read this section before exposing it.

- **Loopback by default.** Dev auth mode refuses any other bind. A TLS reverse proxy is required for remote access.
- **Authorisation on every call.** REST, WebSocket console, SSE stream, downloads and undo/restore go through the same per-server permission check. Servers you cannot see return *not found*.
- **Invite-only.** A valid Supabase token is not enough; the account must be the owner or invited, and its email verified.
- **Files confined to the server.** Path normalisation plus a symlink check on every component; `.moss/` is unreachable; uploads are never served inline.
- **Hardened downloads and archives.** HTTPS-only host allow-list re-checked on redirects, size caps, checksum verification, atomic placement; archives reject traversal, links and devices.
- **Single-use stream tickets** instead of tokens in URLs; strict CSP; `nosniff`, no-referrer, no framing.
- **No shell exposure.** The UI cannot run commands on the host. Game processes are launched from an argument array. The one exception is the **admin-only Custom runtime**, which by definition runs an administrator-supplied command as the Moss user; grant admin accordingly.
- **No isolation yet (important).** Game servers, and any plugin or mod they load, run as the same OS user as Moss with that user's file access. Run Moss as a dedicated unprivileged user (the shipped systemd unit does, with sandboxing), and treat plugins as code you are trusting. Container isolation is on the roadmap.

Report security issues privately through GitHub's *Report a vulnerability* on this repository.
