---
layout: ../../layouts/Docs.astro
title: "Sign-in and accounts"
description: "Signing in, becoming the owner, roles, two-factor sign-in and API tokens."
slug: sign-in
---

# Sign-in and accounts

Moss uses [Supabase Auth](https://supabase.com/docs/guides/auth) only to prove who someone is; Moss itself decides what they may do. Sign-in works out of the box: the public sign-in settings (the project's Supabase URL and anon key, from the repository's `.env`) are built into Moss, so an installed binary needs no config file. Open the panel, create an account or sign in with a provider, and enter the one-time setup token Moss wrote to `<data dir>/setup-token` to become the owner. Anyone else needs an invite from the owner, even though the sign-in service itself is open.

- Roles: `owner`, `admin`, `user`, plus per-server grants (`manager`, `operator`, `viewer`).
- Pin the owner by e-mail with `MOSS_OWNER_EMAILS`, require two-factor sign-in with `MOSS_REQUIRE_MFA`, and create personal API tokens in **Settings**.
- Locked out? [docs/recovery.md](../recovery/) explains `moss recover`.
- To use your own Supabase project, set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env.local` (secrets and `MOSS_OWNER_EMAILS` belong there, never in `.env`).
