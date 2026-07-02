// CI's runner intermittently fails process spawns (fork EAGAIN, os error 11) at the tail of the
// ~120-entry dts build — resource pressure, not a code failure (roughly 1-in-4 runs passed
// before this). `vp run` executes package scripts without a shell, so the retry lives here:
// run `vp pack`, and on failure give the runner a beat to reap the build's worker threads and
// try once more.
import { spawnSync } from "node:child_process";
import process from "node:process";

const run = () => spawnSync("vp", ["pack"], { stdio: "inherit" }).status ?? 1;

let status = run();
if (status !== 0) {
  console.warn("vp pack failed — retrying once after the runner settles…");
  spawnSync(process.execPath, ["-e", "setTimeout(() => {}, 5000)"], { stdio: "ignore" });
  status = run();
}
process.exit(status);
