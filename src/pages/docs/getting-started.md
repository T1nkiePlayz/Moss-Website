---
layout: ../../layouts/Docs.astro
title: "Getting started"
description: "Install Moss on Linux or macOS, try it in dev mode, and run it as a service."
slug: getting-started
---

# Getting started

Moss runs on **Linux (x86-64)** and **macOS 13+ (Apple silicon and Intel)**. Windows hosts are not supported.

## From a release

Releases carry `moss-<tag>-linux-x86_64`, `moss-<tag>-macos-aarch64` and `moss-<tag>-macos-x86_64` tarballs, `SHA256SUMS.txt`, `install.sh` and a Homebrew formula (`moss.rb`). Verify before running:

```bash
sha256sum -c SHA256SUMS.txt                      # macOS: shasum -a 256 -c SHA256SUMS.txt
gh attestation verify moss-*-linux-x86_64.tar.gz --repo T1nkiePlayz/Moss
tar xzf moss-*-linux-x86_64.tar.gz && cd moss-*-linux-x86_64
```

Or use the installer, which verifies the checksum and installs one file ([`scripts/install.sh`](https://github.com/T1nkiePlayz/Moss/blob/main/scripts/install.sh); read it first):

```bash
sh install.sh --prefix "$HOME/.local"
```

## Try it without any account (development mode)

```bash
MOSS_AUTH=dev ./moss serve        # http://127.0.0.1:8420 , no login, refuses non-loopback binds
```

Open the panel, create a server, accept the EULA, and (if you have no Java installed) use **Settings → Java → Install** to let Moss fetch a Temurin runtime.

## Linux: production-style install

```bash
sudo useradd --system --home /var/lib/moss --create-home --shell /usr/sbin/nologin moss
sudo install -m 0755 moss /usr/local/bin/moss
sudo install -d -m 0750 -o root -g moss /etc/moss
sudo install -m 0640 -o root -g moss moss.env.example /etc/moss/moss.env   # edit: Supabase + owner email
sudo install -m 0644 moss.service /etc/systemd/system/moss.service
sudo systemctl enable --now moss
```

The unit sets `Delegate=yes` so Moss can enforce per-server resource limits (needs systemd 254+). An Arch `PKGBUILD` lives in [`packaging/aur`](https://github.com/T1nkiePlayz/Moss/tree/main/packaging/aur).

## macOS

Install the tarball (or the Homebrew formula from the release), run it as a LaunchAgent/LaunchDaemon with [`packaging/macos/io.moss.controller.plist`](https://github.com/T1nkiePlayz/Moss/blob/main/packaging/macos/io.moss.controller.plist), and read [macOS notes](../macos/) for Gatekeeper, Java and what differs from Linux.

## Reverse proxy

Put a TLS reverse proxy in front before exposing Moss (Caddy example):

```caddyfile
moss.example.com {
    reverse_proxy 127.0.0.1:8420
}
```

WebSockets and Server-Sent Events work through Caddy as is. For nginx, disable response buffering on `/api/v1/events` (`proxy_buffering off;`) and forward `Upgrade`/`Connection` headers. Set `MOSS_TRUST_PROXY=true` only behind a proxy that sets `X-Forwarded-For`. Game ports are separate and never proxied.

`moss doctor` checks the data directory, disk, ports, Java, auth and CurseForge configuration.

## From source

Requires Rust (stable) and Node.js (LTS).

```bash
git clone https://github.com/T1nkiePlayz/Moss && cd Moss
(cd web && npm ci && npm run build)       # the binary embeds web/dist
cargo build --release                      # → target/release/moss
```

## Next steps

- Set up login: [Sign-in with Supabase](../supabase/)
- Every setting: [Configuration](../configuration/)
- Read before exposing it: [Security model](../security/)
