import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is fully static and never revalidates.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
