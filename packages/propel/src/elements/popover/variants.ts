import { cva } from "class-variance-authority";

// The bare scroll-body popup used inside an elevated panel surface (see the
// components-tier `PopoverContent`, which supplies the surface chrome via the shared
// overlay panel). Carries only the inner padding + focus outline reset — never the
// border / bg / shadow / radius, which would double up with the panel surface.
export const popoverPanelPopupVariants = cva("p-1 outline-none");
