import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index.tsx"],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
});
