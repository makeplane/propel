import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea } from "./index";

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  // ScrollArea fills its parent, so give it a height-constrained box to scroll within.
  decorators: [
    (Story) => (
      <div className="flex h-64 w-72 flex-col rounded-lg border border-subtle bg-layer-1">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=5582-4428",
    },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vertical overflow. The scrollbar is hidden until you hover the area or scroll, then the inset
 * thumb fades in; it darkens on thumb hover and while dragging.
 */
export const Default: Story = {
  args: {
    orientation: "vertical",
    children: (
      <div className="flex flex-col gap-2 p-3">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="text-13 text-secondary">
            Line {i + 1} of the scrollable content.
          </p>
        ))}
      </div>
    ),
  },
};

/** Horizontal overflow only: a single horizontal scrollbar, shown on demand. */
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    children: (
      <div className="flex w-max gap-3 p-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-16 w-40 shrink-0 items-center justify-center rounded-md bg-layer-2 text-13 text-secondary"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    ),
  },
};

/** Both axes overflow: a vertical and a horizontal scrollbar, each shown on demand. */
export const BothAxes: Story = {
  args: {
    orientation: "both",
    children: (
      <div className="flex w-160 flex-col gap-2 p-3">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="text-13 whitespace-nowrap text-secondary">
            Line {i + 1} of wide content that overflows horizontally as well as down.
          </p>
        ))}
      </div>
    ),
  },
};
