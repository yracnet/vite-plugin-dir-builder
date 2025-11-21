// import { PluginOption } from "vite";
import { ensureConfig, Options } from "./types";
import { Plugin, PluginOption } from "vite";
import { Config } from "./types";
import { processDir } from "./processDir";
import { writeFileSync } from "fs";

export const generateEntry = (config: Config) => {
  regenerateEntry(config, '*');
  config.render(config).then(content => {
    writeFileSync(config.file, content);
  }).catch(error => {
    console.log("Error on Render:", error);
  });
};

export const regenerateEntry = (config: Config, file: string) => {
  config.entries.filter(it => file === '*' || file.startsWith(it.dir)).forEach(it => {
    const data = processDir({
      cwd: it.dir,
      pattern: it.pattern,
      ignore: it.ignore,
      base: it.base,
    });
    it.render(data, it, config).then(content => {
      writeFileSync(it.file, content);
    }).catch(error => {
      console.log("Error on Render:", error);
    });
  });
};


const pluginDirectory = (opts: Options = {}): PluginOption => {
  const config = ensureConfig(opts);
  const watchDirs = config.entries.map(it => it.dir)
  const onShouldRegenerate = (file: string) => {
    regenerateEntry(config, file);
  };
  generateEntry(config);
  return {
    name: "vite-plugin-scan",
    enforce: "pre",
    config: () => {
      const alias: Record<string, string> = {};
      config.entries.forEach(it => {
        alias[it.alias] = it.file;
      });
      alias[config.alias] = config.file;
      return {
        resolve: {
          alias,
        },
      };
    },
    configureServer: (server) => {
      watchDirs.forEach(dir => {
        server.watcher.add(dir);
      });
      server.watcher.on("add", onShouldRegenerate);
      server.watcher.on("unlink", onShouldRegenerate);
      server.watcher.on("change", onShouldRegenerate);
    },
  };
};

export default pluginDirectory;
