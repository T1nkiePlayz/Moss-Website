---
layout: ../../layouts/Docs.astro
title: "Runtimes"
description: "What you can run and how each runtime is verified."
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
| Forge | Experimental | Mods | Official installer; Minecraft 1.12.2 and newer (Java 8 for 1.16.5 and older) |
| Velocity | Stable | Proxy plugins | |
| Custom command | Experimental | – | Admin-only; explicit argv, reduced management |
| Simulated | Dev only | – | Fake server for demos and tests |

## Other games

| Game | Installed from | Platforms | Players | Notes |
|---|---|---|---|---|
| Minecraft Bedrock | minecraft.net (official server zip) | Linux | From the log | Needs the Minecraft EULA; `server.properties` editor |
| Terraria | terraria.org | Linux, macOS | From the log | Writes `serverconfig.txt`, creates a world on first start |
| Factorio | factorio.com (headless) | Linux | From the log | Stable or experimental; creates a save on install |
| Valheim | SteamCMD | Linux x86-64 | Steam query | Generated password in `moss-game.cfg` |
| Counter-Strike 2, Garry's Mod, Team Fortress 2, Left 4 Dead 2 | SteamCMD | Linux x86-64 | Steam query | CS2 is a 30 GB+ download |
| Counter-Strike: Source, Day of Defeat: Source, Half-Life 2: Deathmatch, Left 4 Dead, No More Room in Hell | SteamCMD | Linux x86-64 | Steam query | RCON admin and `server.cfg` editor like the other Source games |
| ARK: Survival Evolved | SteamCMD | Linux x86-64 | Steam query | About 20 GB; `map`, `password` and `admin_password` in `moss-game.cfg`; stopped with SIGINT |
| 7 Days to Die | SteamCMD | Linux x86-64 | From the log | Moss sets `ServerPort` and `TelnetPort` in `serverconfig.xml` before each start; stopped with SIGINT |
| Rust | SteamCMD | Linux x86-64 | Steam query | |
| Palworld, Satisfactory | SteamCMD | Linux x86-64 | – | Stopped with SIGINT so the world is saved |
| Project Zomboid | SteamCMD | Linux x86-64 | – | Generated admin password in `moss-game.cfg` |

Games get the console, files, backups, schedules, workflows, status pages, config editors and update checks; RCON games also get an online-player list with kick and ban, and Valheim, Factorio, Garry's Mod and CS2 get a Mods tab (see [Game mods](../game-mods/)); their default ports are picked so that two servers of the same game never share the extra ports the game uses. Steam games are downloaded anonymously with SteamCMD (it needs 32-bit libraries, e.g. `lib32gcc-s1`). Container isolation works for games too (Settings → Isolation; Bedrock, SteamCMD and Debian base images). Game installs and launches are covered by unit tests of their commands, download parsers and log rules, but have not all been run against the real servers yet: please report anything that does not start.

A runtime is only offered as installable when it works end to end. Spigot (BuildTools) is intentionally not offered: it cannot be redistributed, use Paper. The Forge, NeoForge and Quilt installers run the official installer jar in the server directory with a cleared environment and a time limit; they are not sandboxed (see [Security model](../security/)).
