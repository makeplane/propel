import { Button as BaseButton } from "@base-ui/react/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import {
  IconButton,
  IconButtonIcon,
  type IconButtonMagnitude,
  IconButtonSpinner,
  type IconButtonProminence,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements — the square
// `IconButton` box, the `IconButtonIcon` glyph slot, and the `IconButtonSpinner` loading indicator.
// Base UI's `Button` behavior grafts onto the styled box via `render`. The components-tier
// `IconButton` story shows the ready-made that swaps the slot for the spinner while `loading`.
const PROMINENCES: IconButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: IconButtonMagnitude[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "Elements/IconButton",
  component: IconButtonIcon,
  subcomponents: { IconButton, IconButtonSpinner },
  // Icon picker control for the single glyph rendered inside the slot.
  argTypes: { children: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1720-3036",
    },
  },
  args: {
    children: <Plus />,
  },
} satisfies Meta<typeof IconButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Graft Base UI `Button` behavior onto the styled `IconButton` box wrapping an `IconButtonIcon`
 * glyph slot.
 */
export const Default: Story = {
  render: (args) => (
    <BaseButton
      render={<IconButton prominence="primary" tone="neutral" magnitude="md" />}
      aria-label="Add item"
    >
      <IconButtonIcon {...args} />
    </BaseButton>
  ),
};

/**
 * Every Figma "Type" side by side. The neutral fills are `primary`/`secondary`/ `tertiary`/`ghost`;
 * the two Error types are the `danger` tone of `primary` (Error fill) and `secondary` (Error
 * outline) — see {@link Tones}.
 */
export const Prominences: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <BaseButton
          key={prominence}
          render={<IconButton prominence={prominence} tone="neutral" magnitude="md" />}
          aria-label={`${prominence} action`}
        >
          <IconButtonIcon>
            <Plus />
          </IconButtonIcon>
        </BaseButton>
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
  render: () => (
    <div className="flex items-center gap-3">
      <BaseButton
        render={<IconButton prominence="primary" tone="neutral" magnitude="md" />}
        aria-label="Neutral"
      >
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </BaseButton>
      <BaseButton
        render={<IconButton prominence="primary" tone="danger" magnitude="md" />}
        aria-label="Danger fill"
      >
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </BaseButton>
      <BaseButton
        render={<IconButton prominence="secondary" tone="danger" magnitude="md" />}
        aria-label="Danger outline"
      >
        <IconButtonIcon>
          <Plus />
        </IconButtonIcon>
      </BaseButton>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <BaseButton
          key={magnitude}
          render={<IconButton prominence="primary" tone="neutral" magnitude={magnitude} />}
          aria-label={`${magnitude} add`}
        >
          <IconButtonIcon>
            <Plus />
          </IconButtonIcon>
        </BaseButton>
      ))}
    </div>
  ),
};

/** Swap the `IconButtonIcon` slot for an `IconButtonSpinner` to show the busy indicator. */
export const Spinner: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <BaseButton
        render={<IconButton prominence="primary" tone="neutral" magnitude="md" />}
        aria-label="Saving"
        aria-busy
      >
        <IconButtonSpinner>
          <LoaderCircle />
        </IconButtonSpinner>
      </BaseButton>
      <BaseButton
        render={<IconButton prominence="secondary" tone="neutral" magnitude="md" />}
        aria-label="Loading"
        aria-busy
      >
        <IconButtonSpinner>
          <LoaderCircle />
        </IconButtonSpinner>
      </BaseButton>
      <BaseButton
        render={<IconButton prominence="tertiary" tone="neutral" magnitude="md" />}
        aria-label="Refreshing"
        aria-busy
      >
        <IconButtonSpinner>
          <LoaderCircle />
        </IconButtonSpinner>
      </BaseButton>
    </div>
  ),
};

/**
 * The grafted `Button` exposes its `aria-label` as the accessible name. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it's hidden from the sidebar, docs, and AI manifest — it's a
 * behavior test, not an example — but still runs under `test`.
 */
export const HasAccessibleName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseButton
      render={<IconButton prominence="primary" tone="neutral" magnitude="md" />}
      aria-label="Add item"
    >
      <IconButtonIcon>
        <Plus />
      </IconButtonIcon>
    </BaseButton>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  },
};
