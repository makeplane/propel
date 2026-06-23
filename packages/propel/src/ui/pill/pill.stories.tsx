import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Tag, X } from "lucide-react";
import { expect, userEvent } from "storybook/test";

import { IconPill, PillButton, PillIcon, PillLabel, PillSpinner, PillSwitch } from "./index";

const MAGNITUDES = ["sm", "md", "lg"] as const;

// UI-tier story: composes the ATOMIC pill parts (each renders a single element) — the
// container (PillButton / PillSwitch / IconPill), the leading/trailing node slot
// (PillIcon), the single-line PillLabel, and the busy PillSpinner. The components-tier
// `Pill` story shows the ready-made buttons (auto label + node slots + loading).
const meta = {
  title: "UI/Pill",
  component: PillButton,
  subcomponents: { PillSwitch, IconPill, PillIcon, PillLabel, PillSpinner },
  args: { magnitude: "md" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1121-11",
    },
  },
} satisfies Meta<typeof PillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: container › PillIcon › PillLabel. */
export const Button: Story = {
  args: { magnitude: "md" },
  render: (args) => (
    <PillButton {...args}>
      <PillIcon>
        <Tag />
      </PillIcon>
      <PillLabel>Add label</PillLabel>
    </PillButton>
  ),
};

/** Every magnitude (`sm` / `md` / `lg`) of the `PillButton` container. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <PillButton key={magnitude} magnitude={magnitude}>
          <PillIcon>
            <Tag />
          </PillIcon>
          <PillLabel>{magnitude}</PillLabel>
        </PillButton>
      ))}
    </div>
  ),
};

/** The `PillSpinner` part replaces a node while busy; `aria-busy` carries the disabled look. */
export const Spinner: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PillButton magnitude="md" disabled aria-busy>
      <PillSpinner />
      <PillLabel>Loading</PillLabel>
    </PillButton>
  ),
};

/** `PillSwitch` container: the selected look is its pressed state. */
export const Switch: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <PillSwitch magnitude="md">
        <PillIcon>
          <Tag />
        </PillIcon>
        <PillLabel>Off</PillLabel>
      </PillSwitch>
      <PillSwitch magnitude="md" defaultPressed>
        <PillIcon>
          <Check />
        </PillIcon>
        <PillLabel>On</PillLabel>
      </PillSwitch>
    </div>
  ),
};

/** Icon-only `IconPill` containers. Require an `aria-label`. */
export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconPill key={magnitude} magnitude={magnitude} aria-label={`Close ${magnitude}`}>
          <PillIcon>
            <X />
          </PillIcon>
        </IconPill>
      ))}
    </div>
  ),
};

/**
 * `PillSwitch` reports `aria-pressed` and flips it on click (Base UI `Toggle`). Tagged out of the
 * sidebar/docs/manifest but still run under the default `test` tag.
 */
export const SwitchToggles: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <PillSwitch magnitude="md">
      <PillIcon>
        <Tag />
      </PillIcon>
      <PillLabel>Toggle me</PillLabel>
    </PillSwitch>
  ),
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle me" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};
