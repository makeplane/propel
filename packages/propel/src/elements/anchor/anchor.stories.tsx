import type { Meta, StoryObj } from "@storybook/react-vite";

import { Anchor, type AnchorMagnitude, type AnchorProminence } from "./index";

const PROMINENCES: AnchorProminence[] = ["primary", "secondary"];
const MAGNITUDES: AnchorMagnitude[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `Anchor` is a single styled
// `<a>` — the inline text link — rendered directly, with `prominence` (primary blue / secondary
// gray) and `magnitude` (text size). Its interaction states are CSS (`hover:`/`focus-visible:`)
// plus the `aria-disabled` attribute a consumer sets on the element, so `States` pins them
// statically (pseudo-states addon + the attribute). Behavior (it navigates, carries `href`) is
// demonstrated and tested in Components/Anchor. For a link that looks like a button, see
// `AnchorButton`; for an action that looks like a link, `ButtonAnchor`.
const meta = {
  title: "Elements/Anchor",
  component: Anchor,
  args: { children: "Anchor", href: "#", prominence: "primary", magnitude: "md" },
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` is the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <Anchor key={prominence} {...args} prominence={prominence}>
          {prominence} link
        </Anchor>
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
        <Anchor key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </Anchor>
      ))}
    </div>
  ),
};

/**
 * Every visual state of the link chrome, per prominence, pinned statically: hover recolors the text
 * (forced via the pseudo-states addon), focus-visible draws the accent ring (also forced), and
 * `aria-disabled="true"` — the attribute a consumer sets on a disabled `<a>` — drops the underline
 * and dims to the disabled text color.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#anchor-primary-hover", "#anchor-secondary-hover"],
      focusVisible: ["#anchor-primary-focus", "#anchor-secondary-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {PROMINENCES.map((prominence) => (
        <div key={prominence} className="flex items-center gap-4">
          <Anchor href="#" prominence={prominence} magnitude="md">
            Default
          </Anchor>
          <Anchor id={`anchor-${prominence}-hover`} href="#" prominence={prominence} magnitude="md">
            Hover
          </Anchor>
          <Anchor id={`anchor-${prominence}-focus`} href="#" prominence={prominence} magnitude="md">
            Focus visible
          </Anchor>
          <Anchor href="#" prominence={prominence} magnitude="md" aria-disabled="true">
            Disabled
          </Anchor>
        </div>
      ))}
    </div>
  ),
};
