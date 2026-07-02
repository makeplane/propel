import type { Meta, StoryObj } from "@storybook/react-vite";

import { ButtonAnchor, type ButtonAnchorMagnitude, type ButtonAnchorProminence } from "./index";

const PROMINENCES: ButtonAnchorProminence[] = ["primary", "secondary"];
const MAGNITUDES: ButtonAnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase of the styled `<button>` wearing
// the inline-link look, rendered directly. Its interaction states are CSS (`hover:`/
// `focus-visible:`) plus the `disabled`/`aria-disabled` attributes Base UI's `Button` sets, so
// `States` pins them statically (pseudo-states addon + the attributes). The Base UI `Button` graft
// (clicks, `disabled`, keyboard) is demonstrated and tested in Components/ButtonAnchor. For a nav
// `<a>` styled as a button see `AnchorButton`; for a real inline link, `Anchor`.
const meta = {
  title: "Elements/ButtonAnchor",
  component: ButtonAnchor,
  args: { children: "Show more", prominence: "primary", magnitude: "md" },
} satisfies Meta<typeof ButtonAnchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` is the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <ButtonAnchor key={prominence} {...args} prominence={prominence}>
          {prominence} action
        </ButtonAnchor>
      ))}
    </div>
  ),
};

/** Text sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <ButtonAnchor key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </ButtonAnchor>
      ))}
    </div>
  ),
};

/**
 * Every visual state of the link chrome, per prominence, pinned statically: hover recolors the text
 * (forced via the pseudo-states addon), focus-visible draws the accent ring (also forced), native
 * `disabled` — what Base UI's `Button` sets by default — and `aria-disabled="true"` — the
 * soft-disabled state it sets under `focusableWhenDisabled` — both drop the underline and dim to
 * the disabled text color with `cursor-not-allowed`.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: PROMINENCES.map((prominence) => `#button-anchor-${prominence}-hover`),
      focusVisible: PROMINENCES.map((prominence) => `#button-anchor-${prominence}-focus`),
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {PROMINENCES.map((prominence) => (
        <div key={prominence} className="flex items-center gap-4">
          <ButtonAnchor prominence={prominence} magnitude="md">
            Default
          </ButtonAnchor>
          <ButtonAnchor
            id={`button-anchor-${prominence}-hover`}
            prominence={prominence}
            magnitude="md"
          >
            Hover
          </ButtonAnchor>
          <ButtonAnchor
            id={`button-anchor-${prominence}-focus`}
            prominence={prominence}
            magnitude="md"
          >
            Focus visible
          </ButtonAnchor>
          <ButtonAnchor prominence={prominence} magnitude="md" disabled>
            Disabled
          </ButtonAnchor>
          <ButtonAnchor prominence={prominence} magnitude="md" aria-disabled="true">
            Soft-disabled
          </ButtonAnchor>
        </div>
      ))}
    </div>
  ),
};
