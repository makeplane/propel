import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Switch, type SwitchMagnitude, SwitchThumb } from "./index";

const MAGNITUDES: SwitchMagnitude[] = ["lg", "md", "sm"];

// UI-tier story: composes the atomic track + thumb. `Switch` is the track (Base UI
// `Switch.Root`, `role="switch"`); the sliding knob is a `SwitchThumb` child that sizes
// itself from the track's `magnitude`. The components-tier story shows the ready-made
// `Switch` that composes both for you.
const meta = {
  title: "UI/Switch",
  component: Switch,
  subcomponents: { SwitchThumb },
  args: { magnitude: "md", "aria-label": "Notifications" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Track + thumb composed; the thumb sizes itself from the track's magnitude. */
export const Default: Story = {
  args: { magnitude: "md", defaultChecked: true },
  render: (args) => (
    <Switch {...args}>
      <SwitchThumb />
    </Switch>
  ),
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/** The three track sizes; each thumb sizes itself from its track. */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Switch
          key={magnitude}
          magnitude={magnitude}
          defaultChecked
          aria-label={`Size ${magnitude}`}
        >
          <SwitchThumb />
        </Switch>
      ))}
    </div>
  ),
};
