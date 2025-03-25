import syncDirectory from "sync-directory";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import yaml from "yaml";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse the config file
const userProjectRoot = process.cwd();
const configPath = path.join(userProjectRoot, ".syncdocs.yaml");
const configFile = fs.readFileSync(configPath, "utf8");
const config = yaml.parse(configFile);

// Process each sync configuration
config.syncs.forEach(({ name, source, target, options }) => {
  const sourcePath = path.join(userProjectRoot, source);
  const targetPath = path.join(userProjectRoot, target);

  console.log(`\nSyncing ${name}...`);
  console.log("Source:", sourcePath);
  console.log("Target:", targetPath);

  try {
    // Process options
    const processedOptions = {
      deleteOrphaned: options.deleteOrphaned ?? true,
      type: options.type ?? "copy",
      watch: options.watch ?? false,
      beforeSync: () =>
        console.log(options.logging?.beforeSync ?? `Starting ${name} sync...`),
      afterSync: () =>
        console.log(options.logging?.afterSync ?? `${name} sync complete!`),
      onError: (err) => console.error(`Sync error for ${name}:`, err),
    };

    syncDirectory(sourcePath, targetPath, processedOptions);
  } catch (error) {
    console.error(`Failed to sync ${name}:`, error);
  }
});
