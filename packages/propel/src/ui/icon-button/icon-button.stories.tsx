import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import {
  IconButtonIcon,
  IconButton,
  type IconButtonMagnitude,
  IconButtonSpinner,
  type IconButtonProminence,
} from "./index";

// UI-tier story: composes the ATOMIC icon-button parts (each renders a single element) —
// the square `IconButton` box, the `IconButtonIcon` glyph slot, and the
// `IconButtonSpinner` loading indicator. The components-tier `IconButton` story shows the
// ready-made button that swaps the slot for the spinner while `loading`.
const PROMINENCES: IconButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: IconButtonMagnitude[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  subcomponents: { IconButtonIcon, IconButtonSpinner },
  // Icon picker control for the single glyph rendered inside the slot.
  argTypes: { children: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1720-3036",
    },
  },
  args: {
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    "aria-label": "Add item",
    children: (
      <IconButtonIcon>
        <Plus />
      </IconButtonIcon>
    ),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: `IconButton` wrapping an `IconButtonIcon` glyph slot. */
export const Default: Story = {};

/**
 * Every Figma "Type" side by side. The neutral fills are `primary`/`secondary`/ `tertiary`/`ghost`;
 * the two Error types are the `danger` tone of `primary` (Error fill) and `secondary` (Error
 * outline) — see {@link Tones}.
 */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <IconButton
          key={prominence}
          {...args}
          prominence={prominence}
          aria-label={`${prominence} action`}
        >
          <IconButtonIcon>
            <Plus />
          </IconButtonIcon>
        </IconButton>
      ))}
    </div>
  ),
};

/**
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error"). Danger shows as a
 * solid fill (Error fill) and a bordered outline (Error outline).
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} tone="neutral" prominence="primary" aria-label="Neutral">
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </IconButton>
      <IconButton {...args} tone="danger" prominence="primary" aria-label="Danger fill">
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </IconButton>
      <IconButton {...args} tone="danger" prominence="secondary" aria-label="Danger outline">
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </IconButton>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconButton key={magnitude} {...args} magnitude={magnitude} aria-label={`${magnitude} add`}>
          <IconButtonIcon>
            <Plus />
          </IconButtonIcon>
        </IconButton>
      ))}
    </div>
  ),
};

/** Swap the `IconButtonIcon` slot for an `IconButtonSpinner` to show the busy indicator. */
export const Spinner: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} prominence="primary" aria-label="Saving" aria-busy>
        <IconButtonSpinner>
          <LoaderCircle className="animate-spin" />
        </IconButtonSpinner>
      </IconButton>
      <IconButton {...args} prominence="secondary" aria-label="Loading" aria-busy>
        <IconButtonSpinner>
          <LoaderCircle className="animate-spin" />
        </IconButtonSpinner>
      </IconButton>
      <IconButton {...args} prominence="tertiary" aria-label="Refreshing" aria-busy>
        <IconButtonSpinner>
          <LoaderCircle className="animate-spin" />
        </IconButtonSpinner>
      </IconButton>
    </div>
  ),
};

/**
 * The `IconButton` exposes its `aria-label` as the accessible name. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it's hidden from the sidebar, docs, and AI manifest — it's a
 * behavior test, not an example — but still runs under `test`.
 */
export const HasAccessibleName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <IconButton prominence="primary" tone="neutral" magnitude="md" aria-label="Add item">
      <IconButtonIcon>
        <Plus />
      </IconButtonIcon>
    </IconButton>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  },
};
