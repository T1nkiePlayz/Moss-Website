---
layout: ../../layouts/Docs.astro
title: "Features"
description: "Everything Moss can do today."
slug: features
---

# Features

**Servers** · Vanilla, Paper, Purpur, Folia, Fabric, Quilt, Forge, NeoForge and Velocity from official metadata, plus [other games](../runtimes/#other-games), checksum-verified where upstream publishes one · start, graceful stop, restart, force stop with escalation · crash detection with backoff and a crash-loop breaker · autostart · per-server memory (capped at this machine's RAM), flags profile and port · **import an existing server** from a folder, zip or tar.zst (drag and drop; its plugins and mods are identified right away) · **blueprints** to create new servers from a saved recipe, shareable as a copy-and-paste code · EULA acceptance is an explicit, audited step: accept when creating or importing, or *skip for now* and accept later from the server page (the server will not start until you do) · install and import logs stay on the server's **Setup** tab.

**Isolation and limits** · optional **container mode** (Docker or Podman): one mounted folder, no capabilities, read-only root, memory/CPU/process limits, Java provided by the image · on Linux, cgroup limits without containers · servers survive controller restarts in both modes.

**Console** · live WebSocket console shared by any number of viewers, command history, bounded buffers, survives controller restarts · sensitive commands are redacted in the activity log.

**Files and config** · browse, upload, download, edit, rename, delete, confined to the server folder · form-based `server.properties` · **structured editors with history and diffs for Paper, Spigot, Bukkit, Purpur and Velocity config files** (comments kept, raw editor always available) · undo for every save.

**Content (Modrinth, CurseForge and Hangar)** · search filtered by runtime, loader and game version · dependency resolution · inventory read from the jars · enable/disable · identify unknown files by hash · compatibility panel · update-all with a reviewed plan and pinning · **staged updates on a test copy** with health-gated promotion.

**Modpacks** · **search Modrinth and CurseForge packs** right from *New server → From modpack* (or paste a link, or upload) · import `.mrpack` and CurseForge packs into a new or existing server, export `.mrpack`, **update to a newer pack version with a diff**, pin a pack version.

**Version upgrades** · plan and run a Minecraft/loader upgrade with per-mod verdicts, backup and rollback; optionally try it on a copy first.

**Backups** · manual and scheduled, checksummed `tar.zst`, verify, lock, world-aware listing, restore as a new server, in place or per world · busy servers are never backed up into a torn file: small files are snapshotted whole and a backup restarts if a large file is cut short · **restore preview, or restore to a staging folder and promote after comparing** · **remote destinations**: a folder (for example a NAS mount) or any S3-compatible storage (AWS, Backblaze B2, Cloudflare R2, MinIO), with upload retries, checksums and remote retention · optional mirroring of safety backups to the remote destination and a per-server size cap on local backups.

**Schedules, operations, notifications** · backup, start, stop, restart and console-command schedules in an IANA time zone (daylight-saving aware) · every long job is a persisted, cancellable operation · in-app inbox (read state is per user) plus optional Discord or generic webhook (HTTPS, SSRF-safe).

**Monitoring** · live CPU, memory and players, long-term history (1 h to 30 d) per server and for the host · "disk full in N days" forecast from the hourly host history · support bundle with secrets redacted.

**Interface** · fourteen themes: dark, light, system and high contrast, plus game-inspired and seasonal ones such as Nether, Synthwave, Amber terminal, Deep sea, Campfire and Cherry blossom, all checked for WCAG AA contrast · a **theme editor** (live preview, contrast checker, import/export) · accent and density options · saved views for lists · command palette that searches servers, backups, content and files (<kbd>Ctrl</kbd>/<kbd>⌘</kbd>+<kbd>K</kbd>) · **accessibility settings** (text size up to 150%, strong focus ring, always-underlined links, wider text spacing, reduced motion and effects, following the system's high-contrast request) · keyboard first, responsive, axe-checked in CI. See [Accessibility](../accessibility/).

**Access and recovery** · roles and per-server grants enforced everywhere · personal API tokens · login throttling · optional MFA requirement · activity log · **`moss recover`** command line for locked-out owners, stuck operations and integrity checks · **`moss update`** to install the latest release in place, verified like the installer.

**Event workflows** · *when this happens, do that*: restart after a crash, greet players, back up after every stop · any webhook event can trigger start, stop, restart, console commands, backups, waits, notifications or a web call · dry run, loop protection, and the creator's permissions re-checked on every run.

**Player analytics** · who played, when and for how long: unique players, peak, playtime, an hourly chart, a weekday-by-hour heatmap and top players, kept 90 days.

**Public status pages** · opt-in pages anyone can open without signing in: chosen servers, online state, players and uptime · server-rendered with a strict CSP and nothing private in them.

**Remote admin for games** · Moss sets up RCON for Source games, Rust, Factorio, Palworld and Project Zomboid with a generated password, shows who is online and can kick or ban them from the Players tab.

**Game mods** · Thunderstore mods with BepInEx for Valheim, the Factorio mod portal, and Steam Workshop collections and maps for Garry's Mod and CS2, see [Game mods](../game-mods/).

**Game updates** · checks Steam build ids, Factorio, Terraria and Bedrock releases · one click (or a `game_update` schedule) updates with a backup first and keeps your configs and worlds.

**Game config editors** · form editors for `server.cfg`, `serverconfig.txt`, `server-settings.json`, `PalWorldSettings.ini`, Zomboid's server ini and `moss-game.cfg`, with a raw view.

**Shared player lists** · allow and ban lists defined once and applied to every subscribed Minecraft Java and Bedrock server · ban lists also reach games with an admin channel while they run, see [Player lists](../player-lists/).

**Live maps** · a web map plugin (BlueMap, Dynmap, squaremap, Pl3xMap) shown in a Map tab and, if you choose, on the public status page, through a sandboxed proxy; a map link stops working as soon as its holder loses access, see [Maps](../maps/).

**Installable app and push** · the panel installs as an app and sends Web Push notifications (crashes, backups, players joining) to phones and desktops, see [Push](../push/).
