---
layout: ../../layouts/Docs.astro
title: "Runtimes"
description: "Which server types Moss can install, and how each download is verified."
slug: runtimes
---

# Runtimes

| Runtime | Tier | Content tab | Notes |
|---|---|---|---|
| Vanilla | Stable | Datapacks | Mojang manifest, SHA-1 verified |
| Paper | Stable | Plugins | PaperMC Fill API, SHA-256 verified |
| Purpur | Stable | Plugins | Upstream publishes no checksum; TLS only (logged) |
| Folia | Experimental | Plugins | Only plugins tagged for Folia are offered |
| Fabric | Stable | Mods | Server-side and both-side mods only |
| Quilt | Stable | Mods | Official installer, Fabric mods work too |
| NeoForge | Stable | Mods | Official installer; Minecraft 1.20.2+ |
| Forge | Experimental | Mods | Official installer; Minecraft 1.17+ (older versions use a different launch scheme) |
| Velocity | Stable | Proxy plugins | |
| Custom command | Experimental | – | Admin-only; explicit argv, reduced management |
| Simulated | Dev only | – | Fake server for demos and tests |

A runtime is only offered as installable when it works end to end. Spigot (BuildTools) is intentionally not offered: it cannot be redistributed, use Paper. The Forge, NeoForge and Quilt installers run the official installer jar in the server directory with a cleared environment and a time limit; they are not sandboxed (see [Security model](../security/)).
