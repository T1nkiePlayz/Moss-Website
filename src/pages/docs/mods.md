---
layout: ../../layouts/Docs.astro
title: "Mods and compatibility"
description: "How Moss reads jars, checks compatibility, updates, upgrades and imports modpacks."
slug: mods
---

# Mods and compatibility

What Moss does for mods and plugins, so you do not have to learn it from a crash log:

- **Right content for the right server.** Loader, game version and (Modrinth) server side are filtered before you see a result; CurseForge files tagged client-only are skipped.
- **Reads the jars.** Name, version, authors, loader and environment come from the files themselves, so manually dropped jars are first-class.
- **Checks the whole set.** The compatibility panel lists missing required dependencies, dependency version ranges (Fabric/Quilt semver, Maven ranges), duplicate ids, declared incompatibilities, loader and game-version mismatches, client-only mods and unreadable files, each with a fix button. The same findings are shown in change plans before you install.
- **Identifies unknown files** by SHA-512 (Modrinth) and CurseForge fingerprint so they can be updated like anything else.
- **Enable or disable** a file without deleting it.
- **Update everything** from one reviewed plan, with pinning, one undo snapshot and rollback of already-replaced files if a download fails.
- **Upgrade Minecraft** with a per-mod verdict (ok, update available, no build for that version, unknown) before touching the server.
- **Modpacks** in and out, with a report of anything that could not be fetched (usually CurseForge authors who disabled third-party downloads; Moss never works around that).

Provider notes: CurseForge needs an API key and is rate limited and uncached by design, see [CurseForge setup](../curseforge/).
