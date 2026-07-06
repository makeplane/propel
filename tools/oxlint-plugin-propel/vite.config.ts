import { defineConfig } from "vite-plus";

const taskInput = [
  { auto: true },
  "!**/.agents/**",
  "!**/.claude/**",
  "!dist/**",
  "!node_modules/.vite-temp/**",
];

export default defineConfig({
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
  run: {
    tasks: {
      build: {
        command: "vp pack",
        input: taskInput,
        output: ["dist/**"],
      },
      check: {
        command: "vp check",
        input: taskInput,
        output: [],
      },
      test: {
        command: "vp test",
        input: taskInput,
        output: [],
      },
    },
  },
});
