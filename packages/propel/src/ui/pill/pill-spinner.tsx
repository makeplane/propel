import type * as React from "react";

import { pillSpinnerVariants } from "./variants";

export type PillSpinnerProps = Omit<React.ComponentPropsWithoutRef<"span">, "className" | "style">;

/**
 * The busy spinner shown in place of a leading/trailing node while a pill is loading. A node-slot:
 * it sizes and spins its single child (the ready-made pills pass a `LoaderCircle`), sized to the
 * pill's inherited `--node-size`. Decorative, so it is `aria-hidden`.
 */
export function PillSpinner(props: PillSpinnerProps) {
  return <span aria-hidden className={pillSpinnerVariants()} {...props} />;
}
