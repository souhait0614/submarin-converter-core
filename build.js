const { build } = require("esbuild")
const { dtsPlugin } = require("esbuild-plugin-d.ts")

build({
  entryPoints: ["./src/index.ts"],
  //outbase: "./src", // outbaseを指定することで指定したディレクトリの構造が出力先ディレクトリに反映されるようになる,
  outfile: "./dist/index.js", // 出力先ディレクトリ
  target: "node14",
  format: "cjs",
  platform: "node", // 'node' 'browser' 'neutral' のいずれかを指定,
  plugins: [dtsPlugin()],
})
