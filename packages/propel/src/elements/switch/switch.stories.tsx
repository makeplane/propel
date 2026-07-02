import { Switch as BaseSwitch } from "@base-ui/react/switch";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Switch, type SwitchMagnitude, SwitchThumb } from "./index";

const MAGNITUDES: SwitchMagnitude[] = ["lg", "md", "sm"];

// elements-tier story (rule 2b): the styled track + thumb are Base-UI-agnostic `useRender` elements; Base
// UI's `Switch` behavior grafts them via `render`. `Switch` (the track) carries the required
// `magnitude` variant, so this in-tier story uses the no-variant `SwitchThumb` as `meta.component`
// and wires the behavior straight from `@base-ui/react`. The components-tier story shows the
// ready-made `Switch` that composes both for you.
const meta = {
  title: "Elements/Switch",
  component: SwitchThumb,
  subcomponents: { Switch },
} satisfies Meta<typeof SwitchThumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Track + thumb composed; the thumb sizes itself from the track's magnitude. */
export const Default: Story = {
  render: () => (
    <BaseSwitch.Root render={<Switch magnitude="md" />} defaultChecked aria-label="Notifications">
      <BaseSwitch.Thumb render={<SwitchThumb />} />
    </BaseSwitch.Root>
  ),
};

/**
 * Interaction test: clicking the switch flips its checked state. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/** The three track sizes; each thumb sizes itself from its track. */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <BaseSwitch.Root
          key={magnitude}
          render={<Switch magnitude={magnitude} />}
          defaultChecked
          aria-label={`Size ${magnitude}`}
        >
          <BaseSwitch.Thumb render={<SwitchThumb />} />
        </BaseSwitch.Root>
      ))}
    </div>
  ),
};
