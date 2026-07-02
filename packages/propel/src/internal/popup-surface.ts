import { cx } from "class-variance-authority";

/**
 * The shared anchored-popup surface (rule 4a): the raised overlay card — `layer-1` fill, subtle
 * border, overlay shadow — animated from its pointer-anchored transform origin with the standard
 * 150ms scale/fade. Before this, five families re-spelled it verbatim (menu, context-menu,
 * navigation-menu, popover, preview-card); each now composes this and adds only its own width cap
 * and padding. The listbox popup (`internal/listbox-popup`) and tooltip stay separate surfaces by
 * design (anchor-width sizing / the smaller `layer-2` card).
 */
export const popupSurfaceClass = cx(
  "rounded-lg border-sm border-subtle bg-layer-1 shadow-overlay-100 outline-none",
  "origin-(--transform-origin) transition-[opacity,transform] duration-150",
  "data-starting-style:scale-95 data-starting-style:opacity-0",
  "data-ending-style:scale-95 data-ending-style:opacity-0",
);
