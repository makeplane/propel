// CI runs the browser test suite immediately before the build in the same job, and the build's
// spawn burst (tsdown's dts workers, then attw/publint) lands while chromium's process tree is
// still being reaped — fork intermittently fails with EAGAIN (os error 11). Two defenses:
//
// 1. On CI, settle BEFORE the first attempt so the reap finishes.
// 2. Retry with delays. The sleep must not itself spawn a process (under EAGAIN a child-process
//    sleep fails instantly, retrying straight into the same pressure window — the exact failure
//    mode this script previously had), so it blocks in-process via Atomics.wait.
import { spawnSync } from "node:child_process";
import process from "node:process";

const sleep = (ms) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
};

const pack = () => {
  const result = spawnSync("vp", ["pack"], { stdio: "inherit" });
  if (result.error) console.log(`vp pack failed to spawn: ${result.error.message}`);
  return result.status ?? 1;
};

const ATTEMPTS = 3;
const SETTLE_MS = 10_000;

if (process.env.CI) {
  console.log(`CI: settling ${SETTLE_MS / 1000}s before the build (browser-suite process reap)…`);
  sleep(SETTLE_MS);
}

let status = 1;
for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
  status = pack();
  if (status === 0) break;
  if (attempt < ATTEMPTS) {
    console.log(
      `vp pack attempt ${attempt} failed (status ${status}) — retrying in ${SETTLE_MS / 1000}s…`,
    );
    sleep(SETTLE_MS);
  }
}
process.exit(status);
