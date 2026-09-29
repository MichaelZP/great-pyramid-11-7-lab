import type { CapacitorConfig } from "@capacitor/cli";
import identity from "./app-identity.json";

const config: CapacitorConfig = {
  appId: identity.appId,
  appName: identity.appName,
  webDir: "dist",
};

export default config;
