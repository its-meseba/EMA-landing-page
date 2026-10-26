## Hosting: Cloudflare Worker via OpenNext (moved off Vercel, 2026-10-26)
- Runtime: Worker `ema-landing-page` (`@opennextjs/cloudflare` 1.20.x, next 15.5.x); bindings ASSETS, IMAGES; incremental cache `static-assets-incremental-cache` (no ISR in the app). No crons.
- Hostname: `ema.solace.com.tr`. Worker URL for testing: https://ema-landing-page.lumiostudio.workers.dev (deployed 2026-10-26; /, /en, /tr, /fblogin, /legal, /api/mailchimp status codes and sizes match production; /robots.txt is now served from `public/`, production's older build had none).
- Status: zone `solace.com.tr` is PENDING in our Cloudflare, so DNS is NOT cut over. Production still resolves through Vercel DNS until the owner switches the nameservers.
- CUTOVER (once the zone is ACTIVE; the script skips hosts on non-active zones):
  `python3 -I ~/dev/work/lumio-studio/scripts/cf-migrate/cutover.py ema-landing-page ema.solace.com.tr`
  Verify: `curl --resolve ema.solace.com.tr:443:104.16.0.1 -L https://ema.solace.com.tr/en` shows `<title>EMA - Speak, EMA understands you` (allow ~1 min, 421/522 meanwhile). Rollback: detach the custom domain, re-add CNAME `cname.vercel-dns.com` (DNS-only).
- Deploy: `pnpm install` then `CI=1 pnpm exec opennextjs-cloudflare build </dev/null` and `CI=1 pnpm exec opennextjs-cloudflare deploy </dev/null` (`pnpm deploy` does both; Cloudflare account m.semihbabacan@gmail.com). Deploying updates production once the hostname is attached.
- Env/secrets: the Vercel project had NO env vars. `/api/mailchimp` reads `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID`; the repo tracks a `.env` that OpenNext bundles into the Worker (same as what Vercel built). If those values are missing or stale, the form answers 500 "Mailchimp yapılandırılmadı": set them with `wrangler secret put`. Consider untracking `.env` (secrets in git history).
- Vercel Analytics was removed from the code (unused component). Vercel is gone: never deploy there.
- Do not: runtime fs reads or `new Function` on Workers; Next 16.4.x with OpenNext 1.20.x; remove the IMAGES binding.
