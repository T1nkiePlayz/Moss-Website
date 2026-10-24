---
layout: ../../layouts/Docs.astro
title: "Getting started"
description: "Install Moss on Linux or macOS, try it in dev mode, run it as a service and keep it up to date."
slug: getting-started
---

# Getting started

Moss runs on **Linux (x86-64)** and **macOS 13+ (Apple silicon and Intel)**. Windows hosts are not supported.

## From a release

Releases carry `moss-<tag>-linux-x86_64`, `moss-<tag>-macos-aarch64` and `moss-<tag>-macos-x86_64` tarballs, `SHA256SUMS.txt`, `install.sh` and a Homebrew formula (`moss.rb`). Verify before running:

```bash
sha256sum -c SHA256SUMS.txt                      # macOS: shasum -a 256 -c SHA256SUMS.txt
gh attestation verify moss-*-linux-x86_64.tar.gz --repo T1nkiePlayz/Moss
# the checksum file itself is signed too (cosign, keyless; releases of public repositories):
cosign verify-blob --bundle SHA256SUMS.txt.sigstore.json \
  --certificate-identity-regexp '^https://github\.com/T1nkiePlayz/Moss/\.github/workflows/release\.yml@refs/(tags/v.+|heads/.+)$' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com SHA256SUMS.txt
tar xzf moss-*-linux-x86_64.tar.gz && cd moss-*-linux-x86_64
```

Or use the installer, which verifies the checksum (and the cosign signature when `cosign` is installed; it is never required) and installs one file ([`scripts/install.sh`](https://github.com/T1nkiePlayz/Moss/blob/main/scripts/install.sh); read it first):

```bash
sh install.sh --prefix "$HOME/.local"
```

Then start it and open the panel in your browser. Sign-in is built in, so no config file is needed:

```bash
moss serve   # http://127.0.0.1:8420
```

Moss keeps its data in one place, whichever folder you start it from: `~/.local/share/moss` on Linux (or `$XDG_DATA_HOME/moss`), `~/Library/Application Support/Moss/data` on macOS, or wherever `--data-dir` / `MOSS_DATA_DIR` points. Older versions put data in `./moss-data` under the folder Moss was started from. A Moss database already in `./moss-data`, `~/moss/moss-data` or `~/moss-data` is still used, so existing installs keep their data. To move it, stop Moss and move the folder to the path above.

Sign in, then enter the one-time setup token to become the owner. The token proves you control the machine Moss runs on: on its first start, `moss serve` writes it to `setup-token` in the data folder and prints that path. It is removed once an owner exists. To keep Moss running in the background, use the service below.

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
sudo install -m 0640 -o root -g moss .env /etc/moss/moss.env   # settings file for the unit; sign-in is built in, add options from moss.env.example if you like
sudo install -m 0644 moss.service /etc/systemd/system/moss.service
sudo systemctl enable --now moss
# optional: let administrators install updates from the panel (see Updating)
sudo install -m 0644 moss-update.path moss-update.service /etc/systemd/system/
sudo systemctl enable --now moss-update.path
```

The unit sets `Delegate=yes` so Moss can enforce per-server resource limits (needs systemd 254+). An Arch `PKGBUILD` lives in [`packaging/aur`](https://github.com/T1nkiePlayz/Moss/blob/main/packaging/aur).

## macOS

Install the tarball (or the Homebrew formula from the release), run it as a LaunchAgent/LaunchDaemon with [`packaging/macos/io.moss.controller.plist`](https://github.com/T1nkiePlayz/Moss/blob/main/packaging/macos/io.moss.controller.plist), and read [docs/macos.md](../macos/) for Gatekeeper, Java and what differs from Linux.

## Updating

`moss update` does what the installer does for the binary that is running it. It finds the latest release, verifies the checksum (and the cosign signature when `cosign` is installed), makes sure the new binary starts, and then swaps it in atomically. Then restart the controller; game servers keep running while it restarts.

```bash
moss update --check                                   # show the installed and the latest version
moss update && sudo systemctl restart moss            # asks for your password when /usr/local/bin is root-owned
moss update --version v0.1.1                          # a specific release (also to go back)
moss update --reinstall                               # reinstall the installed release without asking
```

**From the panel.** Moss looks for a new release a minute after it starts and every 6 hours after that. When it finds one, administrators get a notification and a short banner at the bottom of the panel, which hides itself after 15 seconds. **Settings → Updates** installs it with the same checks as `moss update` and then restarts Moss; the panel reconnects by itself. How it installs depends on the setup:

- Moss can write its own binary (a copy in your home folder, a LaunchAgent on macOS): it replaces the binary and restarts in place.
- The systemd unit above stops Moss from writing `/usr/local/bin`. The optional `moss-update.path` and `moss-update.service` units fill that gap. Moss leaves the requested version in `/var/lib/moss/update-request`, and a root service reads it. That service only accepts a release newer than the installed one. It verifies the release, installs it and restarts `moss.service` (logs: `journalctl -u moss-update`).
- Package-managed copies, and setups without write access or the helper, show the command to run on the host instead.

The panel only moves forward; going back is `moss update --version` on the host. Set `MOSS_UPDATE_CHECK=false` to turn the check off.

Like the install script, `moss update` runs as you and uses `sudo` only to copy the new binary into a folder you cannot write, such as `/usr/local/bin`; sudo asks for your password there. The copy is owned by root.

When the latest release is already installed, `moss update` (and the install script) asks whether to reinstall it.

Copies installed by Homebrew, Nix or a system package (for example the AUR) are left to that package manager unless you pass `--force`. Going back to an older release works only until a newer Moss has upgraded the database: an older Moss refuses a newer database rather than touching it (see [docs/recovery.md](../recovery/)).

## Reverse proxy

Put a TLS reverse proxy in front before exposing Moss (Caddy example):

```caddyfile
moss.example.com {
    reverse_proxy 127.0.0.1:8420
}
```

WebSockets and Server-Sent Events work through Caddy as is. For nginx, disable response buffering on `/api/v1/events` (`proxy_buffering off;`) and forward `Upgrade`/`Connection` headers. Set `MOSS_TRUST_PROXY=true` only behind a proxy that sets `X-Forwarded-For`. Game ports are separate and never proxied.

`moss doctor` checks the data directory, disk, ports, Java, auth and CurseForge configuration.
