import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Plus, Tag, X } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import { IconPill, PillButton, PillSwitch } from "./index";

const MAGNITUDES = ["sm", "md", "lg"] as const;

// Module-scope spies so the `play` function can assert against the same references the
// `render` wires to the buttons.
const clickSpies = { onClick: fn(), onLoadingClick: fn() };

const meta = {
  title: "Components/Pill",
  component: PillButton,
  subcomponents: { PillSwitch, IconPill },
  args: { magnitude: "md", children: "Label" },
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
  args: { magnitude: "md", inlineStartNode: <Plus />, children: "Add label" },
};

/** Every magnitude (`sm` / `md` / `lg`) of `PillButton`. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <PillButton key={magnitude} magnitude={magnitude} inlineStartNode={<Tag />}>
          {magnitude}
        </PillButton>
      ))}
    </div>
  ),
};

/**
 * `PillButton` states. Default / hover / active are the chip darkening its fill + border (hover and
 * active are forced here via the pseudo-states addon); `disabled` and `loading` drop to a
 * transparent fill with a dimmed label, and `loading` swaps the inline-start node for a spinner.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#pill-hover"], active: ["#pill-active"] },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <PillButton magnitude="md" inlineStartNode={<Tag />}>
        Default
      </PillButton>
      <PillButton id="pill-hover" magnitude="md" inlineStartNode={<Tag />}>
        Hover
      </PillButton>
      <PillButton id="pill-active" magnitude="md" inlineStartNode={<Tag />}>
        Active
      </PillButton>
      <PillButton magnitude="md" inlineStartNode={<Tag />} disabled>
        Disabled
      </PillButton>
      <PillButton magnitude="md" loading>
        Loading
      </PillButton>
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
      <PillSwitch magnitude="md" inlineStartNode={<Tag />}>
        Off
      </PillSwitch>
      <PillSwitch magnitude="md" inlineStartNode={<Check />} defaultPressed>
        On
      </PillSwitch>
    </div>
  ),
};

/**
 * Icon-only square pills. Require an `aria-label`. `disabled` drops to a transparent fill with the
 * disabled icon color, and `loading` swaps the icon for a spinner tinted with that same disabled
 * icon color.
 */
export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconPill key={magnitude} magnitude={magnitude} aria-label={`Close ${magnitude}`}>
          <X />
        </IconPill>
      ))}
      <IconPill magnitude="md" aria-label="Add (disabled)" disabled>
        <Plus />
      </IconPill>
      <IconPill magnitude="md" aria-label="Add (loading)" loading>
        <Plus />
      </IconPill>
    </div>
  ),
};

/**
 * Clicking a `PillButton` fires its handler, and a `loading` pill blocks the click while staying
 * focusable (`aria-busy`). Tagged out of the sidebar/docs/manifest but still run under the default
 * `test` tag.
 */
export const ButtonClicks: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex gap-3">
      <PillButton magnitude="md" onClick={clickSpies.onClick}>
        Click me
      </PillButton>
      <PillButton magnitude="md" loading onClick={clickSpies.onLoadingClick}>
        Busy
      </PillButton>
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
    // The busy pill is focusable but does not act on click.
    await userEvent.click(busy);
    await expect(onLoadingClick).not.toHaveBeenCalled();
  },
};

/**
 * `PillSwitch` reports `aria-pressed` and flips it on click (Base UI `Toggle`). Tagged out of the
 * sidebar/docs/manifest but still run under the default `test` tag.
 */
export const SwitchToggles: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <PillSwitch magnitude="md" inlineStartNode={<Tag />}>
      Toggle me
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
