import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
  ScrollArea,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  type ScrollAreaScrollbarMagnitude,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "./index";

const MAGNITUDES: ScrollAreaScrollbarMagnitude[] = ["thin", "standard"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the scrollbar rails laid out statically (Base UI only
// positions them absolutely and sizes the thumb; story wrappers stand in for both) and every
// visual state pinned via the `data-*` attributes Base UI's ScrollArea would set
// (`data-orientation`, `data-hovering=""`, `data-scrolling=""`). Real scrolling, hover reveal,
// and thumb dragging are demonstrated in the components-tier story (Components/ScrollArea).
const meta = {
  title: "Elements/ScrollArea",
  component: ScrollArea,
  subcomponents: {
    ScrollAreaViewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner,
  },
  parameters: { controls: { disable: true } },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: `ScrollArea` (the relative flex-column root) holding
 * `ScrollAreaViewport` › the overflowing content, plus a vertical and a horizontal
 * `ScrollAreaScrollbar` rail (each with its `ScrollAreaThumb`) and the `ScrollAreaCorner` where
 * they meet (transparent by design). The rails pin the `data-orientation` attribute Base UI's
 * Scrollbar would set — the cva keys its axis layout and gutter dimension off it — and use
 * `visibility="always"` so they show at rest. The absolute positioning wrappers and the
 * fixed-length thumb wrappers stand in for Base UI's inline placement and scroll-ratio thumb
 * sizing; the outer box clips, standing in for the viewport's Base-UI-applied `overflow: scroll`.
 */
export const Default: Story = {
  render: () => (
    <div className="flex h-64 w-72 flex-col overflow-hidden rounded-lg border border-subtle bg-layer-1">
      <ScrollArea>
        <ScrollAreaViewport>
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} className="text-13 whitespace-nowrap text-secondary">
                Line {i + 1} of wide content that overflows horizontally as well as down.
              </p>
            ))}
          </div>
        </ScrollAreaViewport>
        <div className="absolute inset-e-0 top-0 bottom-3 flex">
          <ScrollAreaScrollbar visibility="always" magnitude="thin" data-orientation="vertical">
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <div className="absolute inset-s-0 inset-e-3 bottom-0 flex flex-col">
          <ScrollAreaScrollbar visibility="always" magnitude="thin" data-orientation="horizontal">
            <div className="flex w-16 flex-1">
              <ScrollAreaThumb />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <div className="absolute inset-e-0 bottom-0 flex size-3">
          <ScrollAreaCorner />
        </div>
      </ScrollArea>
    </div>
  ),
};

/**
 * Both scrollbar gutter steps, per orientation: `thin` — 12 px gutter (3 px inset padding), for
 * dense UI like menus and pickers; `standard` — 16 px gutter (5 px inset padding), for roomier
 * panels. The thumb stays 6 px in both. Each rail pins `data-orientation` (vertical column,
 * horizontal bar) and shows at rest via `visibility="always"`.
 */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-start gap-8">
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} className="flex flex-col items-center gap-2">
          <p className="text-12 text-tertiary">{magnitude}</p>
          <div className="flex h-40 rounded-md bg-layer-1">
            <ScrollAreaScrollbar
              visibility="always"
              magnitude={magnitude}
              data-orientation="vertical"
            >
              <div className="flex h-16 flex-1">
                <ScrollAreaThumb />
              </div>
            </ScrollAreaScrollbar>
          </div>
          <div className="flex w-40 flex-col rounded-md bg-layer-1">
            <ScrollAreaScrollbar
              visibility="always"
              magnitude={magnitude}
              data-orientation="horizontal"
            >
              <div className="flex w-16 flex-1">
                <ScrollAreaThumb />
              </div>
            </ScrollAreaScrollbar>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the vertical rail and its thumb:
 *
 * - **auto · rest** — `visibility="auto"` hides the rail entirely (`opacity-0`); the empty track
 *   column is the point.
 * - **auto · hovering** / **auto · scrolling** — pin the `data-hovering=""` / `data-scrolling=""`
 *   attributes Base UI sets while the pointer is over the area or the viewport scrolls; either
 *   reveals the rail.
 * - **always** — permanently visible at rest, no state attribute needed.
 * - **thumb hover** / **thumb active** — CSS pseudo-classes (`:hover`, `:active`) forced by the
 *   pseudo-states addon: the thumb steps through `--scrollbar-thumb-hover` and
 *   `--scrollbar-thumb-active`.
 */
export const States: Story = {
  parameters: {
    pseudo: {
      hover: "#scroll-area-thumb-hover",
      active: "#scroll-area-thumb-active",
    },
  },
  render: () => (
    <div className="flex items-start gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-40 rounded-md bg-layer-1">
          <ScrollAreaScrollbar
            id="scroll-area-scrollbar-rest"
            visibility="auto"
            magnitude="thin"
            data-orientation="vertical"
          >
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <p className="text-12 text-tertiary">auto · rest</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-40 rounded-md bg-layer-1">
          <ScrollAreaScrollbar
            id="scroll-area-scrollbar-hovering"
            visibility="auto"
            magnitude="thin"
            data-orientation="vertical"
            data-hovering=""
          >
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <p className="text-12 text-tertiary">auto · hovering</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-40 rounded-md bg-layer-1">
          <ScrollAreaScrollbar
            visibility="auto"
            magnitude="thin"
            data-orientation="vertical"
            data-scrolling=""
          >
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <p className="text-12 text-tertiary">auto · scrolling</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-40 rounded-md bg-layer-1">
          <ScrollAreaScrollbar visibility="always" magnitude="thin" data-orientation="vertical">
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <p className="text-12 text-tertiary">always</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-40 rounded-md bg-layer-1">
          <ScrollAreaScrollbar visibility="always" magnitude="thin" data-orientation="vertical">
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb id="scroll-area-thumb-hover" />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <p className="text-12 text-tertiary">thumb hover</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-40 rounded-md bg-layer-1">
          <ScrollAreaScrollbar visibility="always" magnitude="thin" data-orientation="vertical">
            <div className="flex h-16 flex-1">
              <ScrollAreaThumb id="scroll-area-thumb-active" />
            </div>
          </ScrollAreaScrollbar>
        </div>
        <p className="text-12 text-tertiary">thumb active</p>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-hovering=""` rail's computed opacity (`data-hovering:opacity-100`) differs from the resting
 * `visibility="auto"` rail's (`opacity-0`). Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const opacity = (id: string) => {
      const rail = canvasElement.querySelector(`#${id}`);
      if (!(rail instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(rail).opacity;
    };
    await expect(opacity("scroll-area-scrollbar-hovering")).not.toBe(
      opacity("scroll-area-scrollbar-rest"),
    );
  },
};
