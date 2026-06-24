import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "./index";

// UI-tier story: composes the ATOMIC scroll-area parts. `ScrollArea` (Base UI
// `ScrollArea.Root`) lays its viewport out as a height-constrained flex column but renders
// no scrollbars itself; you wire the viewport, scrollbar(s), thumb, and corner by hand. The
// ready-made scroller (orientation prop, automatic scrollbars) lives in
// `components/scroll-area`.
const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  subcomponents: {
    ScrollAreaViewport,
    ScrollAreaContent,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaCorner,
  },
  decorators: [
    (Story) => (
      <div className="flex h-64 w-72 flex-col rounded-lg border border-subtle bg-layer-1">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A vertically scrollable region built from atoms: Root › Viewport › Content, plus a vertical
 * Scrollbar › Thumb. The scrollbar is hidden until you hover the area or scroll, then the inset
 * thumb fades in (`visibility="auto"`).
 */
export const Default: Story = {
  render: () => (
    <ScrollArea>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} className="text-13 text-secondary">
                Line {i + 1} of the scrollable content.
              </p>
            ))}
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical" visibility="auto" magnitude="thin">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};

/**
 * Both axes overflow: a vertical and a horizontal Scrollbar (each with its own Thumb) plus the
 * Corner that fills the gap where they meet.
 */
export const BothAxes: Story = {
  render: () => (
    <ScrollArea>
      <ScrollAreaViewport>
        <ScrollAreaContent>
          <div className="flex w-160 flex-col gap-2 p-3">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} className="text-13 whitespace-nowrap text-secondary">
                Line {i + 1} of wide content that overflows horizontally as well as down.
              </p>
            ))}
          </div>
        </ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical" visibility="auto" magnitude="thin">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaScrollbar orientation="horizontal" visibility="auto" magnitude="thin">
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollArea>
  ),
};
