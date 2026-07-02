import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollArea, type ScrollAreaProps } from "./index";

const MAGNITUDES: ScrollAreaProps["magnitude"][] = ["thin", "standard"];

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
    visibility: "auto",
    magnitude: "thin",
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
    visibility: "auto",
    magnitude: "thin",
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
    visibility: "auto",
    magnitude: "thin",
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

/**
 * Always-visible scrollbars, standard magnitude. Useful when the context needs a persistent scroll
 * indicator (e.g. embedded code editors, data tables where users expect a visible rail).
 */
export const AlwaysVisible: Story = {
  args: {
    orientation: "vertical",
    visibility: "always",
    magnitude: "standard",
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

/**
 * Both scrollbar gutter steps side by side: `thin` — 12 px gutter (3 px inset padding), for dense
 * UI like menus and pickers; `standard` — 16 px gutter (5 px inset padding), for roomier panels.
 * The thumb stays 6 px in both. Each panel overflows on both axes so the vertical rail, horizontal
 * rail, and corner are all auditable; shown with `visibility="always"` so the rails are visible at
 * rest.
 */
export const Magnitudes: Story = {
  // Iterates `magnitude` and captions each panel with it, so that control is disabled.
  // `orientation` is fixed to `both` because the showcase content overflows both axes (rendering
  // fewer rails would leave an unscrollbarred overflow); `visibility` stays live and updates both
  // panels at once.
  argTypes: { magnitude: { control: false }, orientation: { control: false } },
  args: {
    orientation: "both",
    visibility: "always",
    magnitude: "thin",
    children: (
      <div className="flex w-max flex-col gap-2 p-3">
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} className="text-13 whitespace-nowrap text-secondary">
            Line {i + 1} of content wide and tall enough to overflow both axes.
          </p>
        ))}
      </div>
    ),
  },
  render: (args) => (
    <div className="flex min-h-0 flex-1 gap-3 p-3">
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="text-12 text-tertiary">{magnitude}</p>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-subtle">
            <ScrollArea {...args} magnitude={magnitude} />
          </div>
        </div>
      ))}
    </div>
  ),
};
