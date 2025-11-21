import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts", "src/utils/*.ts", "src/render/*.ts"],
    format: ["esm"],
    outDir: "dist",
    external: ["vite", "rollup", "esbuild"],
    dts: true,
    clean: true,
    sourcemap: false,
    minify: false,
  },
]);
