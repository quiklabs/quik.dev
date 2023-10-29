import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import fileSize from 'rollup-plugin-filesize'
// import { visualizer } from "rollup-plugin-visualizer";

const rollupConfig = defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true
  },
  // external: [/node_modules/],
  plugins: [
    nodeResolve(), 
    commonJs(),
    json(),
    typescript(),
    fileSize(),
    // visualizer({ filename: "dist/stats.html" })
  ],
});

export default rollupConfig;
