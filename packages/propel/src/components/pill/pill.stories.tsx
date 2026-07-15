import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Plus, Tag, X } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import { Icon } from "../icon";
import { IconPill, PillButton, PillLabel, PillSwitch } from "./index";

const MAGNITUDES = ["sm", "md", "lg"] as const;

// Module-scope spies so the `play` function can assert against the same references the
// `render` wires to the buttons.
const clickSpies = { onClick: fn(), onLoadingClick: fn() };

const meta = {
  title: "Components/Pill",
  component: PillButton,
  subcomponents: { PillSwitch, IconPill, PillLabel },
  args: { magnitude: "md", label: "Label" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1121-11",
    },
  },
} satisfies Meta<typeof PillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A pill-shaped button. Holds a label with optional inline-start/end nodes. */
export const Button: Story = {
  args: { magnitude: "md", startIcon: <Icon icon={Plus} />, label: "Add label" },
};

/** Every magnitude (`sm` / `md` / `lg`) of `PillButton`. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <PillButton
          key={magnitude}
          magnitude={magnitude}
          startIcon={<Icon icon={Tag} />}
          label={magnitude}
        />
      ))}
    </div>
  ),
};

/**
 * `PillButton` states. Default / hover / active darken the chip's fill + border (hover and active
 * forced via the pseudo-states addon); `disabled` and `loading` drop to a transparent fill with a
 * dimmed label, and `loading` swaps the inline-start node for a spinner.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#pill-hover"], active: ["#pill-active"] },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <PillButton magnitude="md" startIcon={<Icon icon={Tag} />} label="Default" />
      <PillButton id="pill-hover" magnitude="md" startIcon={<Icon icon={Tag} />} label="Hover" />
      <PillButton id="pill-active" magnitude="md" startIcon={<Icon icon={Tag} />} label="Active" />
      <PillButton magnitude="md" startIcon={<Icon icon={Tag} />} disabled label="Disabled" />
      <PillButton magnitude="md" loading label="Loading" />
    </div>
  ),
};

/**
 * `PillSwitch` is a toggle: the selected look is its pressed state. Use it for segmented on/off
 * choices (e.g. display properties in a settings menu).
 */
export const Switch: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <PillSwitch magnitude="md" startIcon={<Icon icon={Tag} />} label="Off" />
      <PillSwitch magnitude="md" startIcon={<Icon icon={Check} />} defaultPressed label="On" />
    </div>
  ),
};

/**
 * Icon-only square pills. Require an `aria-label`. `disabled` drops to a transparent fill with the
 * disabled icon color, and `loading` swaps the icon for a spinner tinted with that same color.
 */
export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconPill
          key={magnitude}
          magnitude={magnitude}
          aria-label={`Close ${magnitude}`}
          icon={<Icon icon={X} />}
        />
      ))}
      <IconPill magnitude="md" aria-label="Add (disabled)" disabled icon={<Icon icon={Plus} />} />
      <IconPill magnitude="md" aria-label="Add (loading)" loading icon={<Icon icon={Plus} />} />
    </div>
  ),
};

/**
 * Labels past the 120px cap truncate with an ellipsis. `PillLabel` sets a native `title` from the
 * string label so hover recovers the full text.
 */
export const TruncatedLabel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <PillButton
        magnitude="md"
        startIcon={<Icon icon={Tag} />}
        label="Engineering Infrastructure Team - View"
      />
      <PillSwitch
        magnitude="md"
        startIcon={<Icon icon={Tag} />}
        label="Engineering Infrastructure Team - Toggle"
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole("button", { name: "Engineering Infrastructure Team" });
    await expect(buttons).toHaveLength(2);
    for (const button of buttons) {
      // Icon is also a `<span>`; the label is the one carrying `title`.
      const label = button.querySelector("span[title]");
      await expect(label).toHaveAttribute("title", "Engineering Infrastructure Team");
      await expect(label!.scrollWidth).toBeGreaterThan(label!.clientWidth);
    }
  },
};

/**
 * Clicking a `PillButton` fires its handler, and a `loading` pill blocks the click while staying
 * focusable (`aria-busy`). Tagged out of the sidebar/docs/manifest but still run under `test`.
 */
export const ButtonClicks: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex gap-3">
      <PillButton magnitude="md" onClick={clickSpies.onClick} label="Click me" />
      <PillButton magnitude="md" loading onClick={clickSpies.onLoadingClick} label="Busy" />
    </div>
  ),
  play: async ({ canvas }) => {
    const { onClick, onLoadingClick } = clickSpies;
    onClick.mockClear();
    onLoadingClick.mockClear();

    const button = canvas.getByRole("button", { name: "Click me" });
    await userEvent.click(button);
    await expect(onClick).toHaveBeenCalledTimes(1);

    const busy = canvas.getByRole("button", { name: "Busy" });
    await expect(busy).toHaveAttribute("aria-busy", "true");
    await userEvent.click(busy);
    await expect(onLoadingClick).not.toHaveBeenCalled();
  },
};

/**
 * `PillSwitch` reports `aria-pressed` and flips it on click (Base UI `Toggle`). Tagged out of the
 * sidebar/docs/manifest but still run under `test`.
 */
export const SwitchToggles: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <PillSwitch magnitude="md" startIcon={<Icon icon={Tag} />} label="Toggle me" />,
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button", { name: "Toggle me" });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};
