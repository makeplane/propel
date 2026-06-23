import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import {
  IconButtonIcon,
  IconButtonRoot,
  type IconButtonMagnitude,
  IconButtonSpinner,
  type IconButtonVariant,
} from "./index";

// UI-tier story: composes the ATOMIC icon-button parts (each renders a single element) —
// the square `IconButtonRoot` box, the `IconButtonIcon` glyph slot, and the
// `IconButtonSpinner` loading indicator. The components-tier `IconButton` story shows the
// ready-made button that swaps the slot for the spinner while `loading`.
const VARIANTS: IconButtonVariant[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: IconButtonMagnitude[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "UI/IconButton",
  component: IconButtonRoot,
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
    variant: "primary",
    tone: "neutral",
    magnitude: "md",
    "aria-label": "Add item",
    children: (
      <IconButtonIcon>
        <Plus />
      </IconButtonIcon>
    ),
  },
} satisfies Meta<typeof IconButtonRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: `IconButtonRoot` wrapping an `IconButtonIcon` glyph slot. */
export const Default: Story = {};

/**
 * Every Figma "Type" side by side. The neutral fills are `primary`/`secondary`/ `tertiary`/`ghost`;
 * the two Error types are the `danger` tone of `primary` (Error fill) and `secondary` (Error
 * outline) — see {@link Tones}.
 */
export const Variants: Story = {
  argTypes: { variant: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <IconButtonRoot key={variant} {...args} variant={variant} aria-label={`${variant} action`}>
          <IconButtonIcon>
            <Plus />
          </IconButtonIcon>
        </IconButtonRoot>
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
      <IconButtonRoot {...args} tone="neutral" variant="primary" aria-label="Neutral">
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </IconButtonRoot>
      <IconButtonRoot {...args} tone="danger" variant="primary" aria-label="Danger fill">
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </IconButtonRoot>
      <IconButtonRoot {...args} tone="danger" variant="secondary" aria-label="Danger outline">
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </IconButtonRoot>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconButtonRoot
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`${magnitude} add`}
        >
          <IconButtonIcon>
            <Plus />
          </IconButtonIcon>
        </IconButtonRoot>
      ))}
    </div>
  ),
};

/** Swap the `IconButtonIcon` slot for an `IconButtonSpinner` to show the busy indicator. */
export const Spinner: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButtonRoot {...args} variant="primary" aria-label="Saving" aria-busy>
        <IconButtonSpinner>
          <LoaderCircle className="animate-spin" />
        </IconButtonSpinner>
      </IconButtonRoot>
      <IconButtonRoot {...args} variant="secondary" aria-label="Loading" aria-busy>
        <IconButtonSpinner>
          <LoaderCircle className="animate-spin" />
        </IconButtonSpinner>
      </IconButtonRoot>
      <IconButtonRoot {...args} variant="tertiary" aria-label="Refreshing" aria-busy>
        <IconButtonSpinner>
          <LoaderCircle className="animate-spin" />
        </IconButtonSpinner>
      </IconButtonRoot>
    </div>
  ),
};

/**
 * The `IconButtonRoot` exposes its `aria-label` as the accessible name. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it's hidden from the sidebar, docs, and AI manifest — it's a
 * behavior test, not an example — but still runs under `test`.
 */
export const HasAccessibleName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <IconButtonRoot variant="primary" tone="neutral" magnitude="md" aria-label="Add item">
      <IconButtonIcon>
        <Plus />
      </IconButtonIcon>
    </IconButtonRoot>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  },
};
