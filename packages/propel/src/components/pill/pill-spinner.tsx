import { LoaderCircle } from "lucide-react";

export function PillSpinner() {
  return <LoaderCircle aria-hidden className="size-(--node-size) shrink-0 animate-spin" />;
}
