import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "./index";

// elements-tier story (rule 2b): the scroll-area parts are Base-UI-agnostic `useRender` elements; Base
// UI's ScrollArea behavior parts graft them via `render`. The Root, viewport, scrollbar(s), thumb,
// and corner are wired by hand from `@base-ui/react`; the ready-made scroller (orientation prop,
// automatic scrollbars) lives in `components/scroll-area`.
const meta = {
  title: "Elements/ScrollArea",
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
    <BaseScrollArea.Root render={<ScrollArea />}>
      <BaseScrollArea.Viewport render={<ScrollAreaViewport />}>
        <BaseScrollArea.Content render={<ScrollAreaContent />}>
          <div className="flex flex-col gap-2 p-3">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} className="text-13 text-secondary">
                Line {i + 1} of the scrollable content.
              </p>
            ))}
          </div>
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        render={<ScrollAreaScrollbar visibility="auto" magnitude="thin" />}
      >
        <BaseScrollArea.Thumb render={<ScrollAreaThumb />} />
      </BaseScrollArea.Scrollbar>
    </BaseScrollArea.Root>
  ),
};

/**
 * Both axes overflow: a vertical and a horizontal Scrollbar (each with its own Thumb) plus the
 * Corner that fills the gap where they meet.
 */
export const BothAxes: Story = {
  render: () => (
    <BaseScrollArea.Root render={<ScrollArea />}>
      <BaseScrollArea.Viewport render={<ScrollAreaViewport />}>
        <BaseScrollArea.Content render={<ScrollAreaContent />}>
          <div className="flex w-160 flex-col gap-2 p-3">
            {Array.from({ length: 30 }, (_, i) => (
              <p key={i} className="text-13 whitespace-nowrap text-secondary">
                Line {i + 1} of wide content that overflows horizontally as well as down.
              </p>
            ))}
          </div>
        </BaseScrollArea.Content>
      </BaseScrollArea.Viewport>
      <BaseScrollArea.Scrollbar
        orientation="vertical"
        render={<ScrollAreaScrollbar visibility="auto" magnitude="thin" />}
      >
        <BaseScrollArea.Thumb render={<ScrollAreaThumb />} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Scrollbar
        orientation="horizontal"
        render={<ScrollAreaScrollbar visibility="auto" magnitude="thin" />}
      >
        <BaseScrollArea.Thumb render={<ScrollAreaThumb />} />
      </BaseScrollArea.Scrollbar>
      <BaseScrollArea.Corner render={<ScrollAreaCorner />} />
    </BaseScrollArea.Root>
  ),
};
