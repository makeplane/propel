import { LoaderCircle } from "lucide-react";

import { pillSpinnerVariants } from "./variants";

/**
 * The busy spinner shown in place of a leading/trailing node while a pill is loading. Sized to the
 * pill's inherited `--node-size`; decorative, so it is `aria-hidden`.
 */
export function PillSpinner() {
  return <LoaderCircle aria-hidden className={pillSpinnerVariants()} />;
}
