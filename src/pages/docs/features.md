---
layout: ../../layouts/Docs.astro
title: "Features"
description: "Everything Moss can do today."
slug: features
---

# Features

**Servers** · Vanilla, Paper, Purpur, Folia, Fabric, Quilt, Forge, NeoForge and Velocity from official metadata, checksum-verified where upstream publishes one · start, graceful stop, restart, force stop with escalation · crash detection with backoff and a crash-loop breaker · autostart · per-server memory, flags profile and port · **import an existing server** from a folder, zip or tar.zst · **blueprints** to create new servers from a saved recipe · EULA acceptance is an explicit, audited step.

**Isolation and limits** · optional **container mode** (Docker or Podman): one mounted folder, no capabilities, read-only root, memory/CPU/process limits, Java provided by the image · on Linux, cgroup limits without containers · servers survive controller restarts in both modes.

**Console** · live WebSocket console shared by any number of viewers, command history, bounded buffers, survives controller restarts · sensitive commands are redacted in the activity log.

**Files and config** · browse, upload, download, edit, rename, delete, confined to the server folder · form-based `server.properties` · **structured editors with history and diffs for Paper, Spigot, Bukkit, Purpur and Velocity config files** (comments kept, raw editor always available) · undo for every save.

**Content (Modrinth and CurseForge)** · search filtered by runtime, loader and game version · dependency resolution · inventory read from the jars · enable/disable · identify unknown files by hash · compatibility panel · update-all with a reviewed plan and pinning · **staged updates on a test copy** with health-gated promotion.

**Modpacks** · import `.mrpack` and CurseForge packs into a new or existing server, export `.mrpack`, **update to a newer pack version with a diff**, pin a pack version.

**Version upgrades** · plan and run a Minecraft/loader upgrade with per-mod verdicts, backup and rollback; optionally try it on a copy first.

**Backups** · manual and scheduled, checksummed `tar.zst`, verify, lock, world-aware listing, restore as a new server, in place or per world · **restore preview, or restore to a staging folder and promote after comparing** · **remote destinations**: a folder (for example a NAS mount) or any S3-compatible storage (AWS, Backblaze B2, Cloudflare R2, MinIO), with upload retries, checksums and remote retention.

**Schedules, operations, notifications** · backup, start, stop, restart and console-command schedules in an IANA time zone (daylight-saving aware) · every long job is a persisted, cancellable operation · in-app inbox plus optional Discord or generic webhook (HTTPS, SSRF-safe).

**Monitoring** · live CPU, memory and players, long-term history (1 h to 30 d) per server and for the host · support bundle with secrets redacted.

**Interface** · dark, light, system and high-contrast themes with a **theme editor** (live preview, contrast checker, import/export) · accent and density options · saved views for lists · command palette that searches servers, backups, content and files (<kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd>) · keyboard first, responsive, axe-checked in CI.

**Access and recovery** · roles and per-server grants enforced everywhere · personal API tokens · login throttling · optional MFA requirement · activity log · **`moss recover`** command line for locked-out owners, stuck operations and integrity checks.
