---
layout: ../../layouts/Docs.astro
title: Getting started
description: Install Moss, try it in dev mode, and run it as a systemd service.
slug: getting-started
---

# Getting started

Moss targets **Linux x86-64**. Windows and macOS hosts are not supported. You manage it from any browser.

## From a release

Download the tarball from [Releases](https://github.com/T1nkiePlayz/Moss/releases) and verify it:

```bash
sha256sum -c SHA256SUMS.txt
gh attestation verify moss-*-linux-x86_64.tar.gz --repo T1nkiePlayz/Moss
tar xzf moss-*-linux-x86_64.tar.gz && cd moss-*-linux-x86_64
```

## Try it without any account (development mode)

```bash
MOSS_AUTH=dev ./moss serve        # http://127.0.0.1:8420 , no login, refuses non-loopback binds
```

Open the panel, create a server, accept the EULA, and (if you have no Java installed) use **Settings → Java → Install** to let Moss fetch a Temurin runtime.

## Production-style install

```bash
sudo useradd --system --home /var/lib/moss --create-home --shell /usr/sbin/nologin moss
sudo install -m 0755 moss /usr/local/bin/moss
sudo install -d -m 0750 -o root -g moss /etc/moss
sudo install -m 0640 -o root -g moss moss.env.example /etc/moss/moss.env   # edit: Supabase + owner email
sudo install -m 0644 moss.service /etc/systemd/system/moss.service
sudo systemctl enable --now moss
```

Then put a TLS reverse proxy in front (Caddy example):

```caddyfile
moss.example.com {
    reverse_proxy 127.0.0.1:8420
}
```

WebSockets and Server-Sent Events work through Caddy as is. For nginx, disable response buffering on `/api/v1/events` (`proxy_buffering off;`) and forward `Upgrade`/`Connection` headers. Game ports are separate and are never proxied.

`moss doctor` checks the data directory, disk, ports, Java and auth configuration.

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
