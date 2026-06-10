import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Switch, type SwitchMagnitude } from "./index";

const MAGNITUDES: SwitchMagnitude[] = ["lg", "md", "sm"];

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1838-14347",
    },
  },
  args: {
    magnitude: "md",
    defaultChecked: true,
    "aria-label": "Notifications",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Switch key={magnitude} {...args} magnitude={magnitude} aria-label={`Size ${magnitude}`} />
      ))}
    </div>
  ),
};

/** On, off, and disabled (in both on and off positions) side by side. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Switch {...args} defaultChecked aria-label="On" />
      <Switch {...args} defaultChecked={false} aria-label="Off" />
      <Switch {...args} defaultChecked disabled aria-label="Disabled on" />
      <Switch {...args} defaultChecked={false} disabled aria-label="Disabled off" />
    </div>
  ),
};

/**
 * Real interaction: clicking a switch flips `aria-checked`, and a disabled
 * switch stays put. Tagged so it's hidden from the sidebar, docs, and the
 * AI/MCP manifest while still running under the default `test` tag.
 */
export const TogglesOnClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", defaultChecked: false },
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA switch): Tab moves focus to the switch and
 * **Space** toggles `aria-checked`. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const KeyboardToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", defaultChecked: false },
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");

    // Tab focuses the switch.
    await userEvent.tab();
    await expect(sw).toHaveFocus();

    // Space toggles aria-checked on and off.
    await userEvent.keyboard(" ");
    await expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard(" ");
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};

/** A disabled switch does not toggle when clicked. */
export const DisabledDoesNotToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { magnitude: "md", defaultChecked: false, disabled: true },
  play: async ({ canvas, userEvent }) => {
    const sw = canvas.getByRole("switch");
    await expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "false");
  },
};
