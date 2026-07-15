import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Plus, Tag, X } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import { Icon } from "../icon";
import { IconPill, PillButton, PillLabel, PillSwitch } from "./index";

const MAGNITUDES = ["sm", "md", "lg"] as const;

// Module-scope spies so the `play` function can assert against the same references the
// `render` wires to the buttons.
const clickSpies = { onClick: fn(), onLoadingClick: fn() };
const iconPillLoadingSpy = fn();

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
 * `PillButton` states for both emphases. Hover / active forced via the pseudo-states addon;
 * `disabled` and `loading` drop to a transparent fill with a dimmed label; `loading` shows a
 * spinner after the label (Figma).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#pill-outline-hover", "#pill-soft-hover"],
      active: ["#pill-outline-active", "#pill-soft-active"],
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <PillButton
          magnitude="md"
          emphasis="outline"
          startIcon={<Icon icon={Tag} />}
          label="outline"
        />
        <PillButton
          id="pill-outline-hover"
          magnitude="md"
          emphasis="outline"
          startIcon={<Icon icon={Tag} />}
          label="outline hover"
        />
        <PillButton
          id="pill-outline-active"
          magnitude="md"
          emphasis="outline"
          startIcon={<Icon icon={Tag} />}
          label="outline active"
        />
        <PillButton
          magnitude="md"
          emphasis="outline"
          startIcon={<Icon icon={Tag} />}
          disabled
          label="outline disabled"
        />
        <PillButton magnitude="md" emphasis="outline" loading label="outline loading" />
      </div>
      <div className="flex items-center gap-3">
        <PillButton magnitude="md" emphasis="soft" startIcon={<Icon icon={Tag} />} label="soft" />
        <PillButton
          id="pill-soft-hover"
          magnitude="md"
          emphasis="soft"
          startIcon={<Icon icon={Tag} />}
          label="soft hover"
        />
        <PillButton
          id="pill-soft-active"
          magnitude="md"
          emphasis="soft"
          startIcon={<Icon icon={Tag} />}
          label="soft active"
        />
        <PillButton
          magnitude="md"
          emphasis="soft"
          startIcon={<Icon icon={Tag} />}
          disabled
          label="soft disabled"
        />
        <PillButton magnitude="md" emphasis="soft" loading label="soft loading" />
      </div>
    </div>
  ),
};

/** Both fill treatments: `outline` (≈ secondary) and `soft` (≈ tertiary). */
export const Emphases: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-3">
      <PillButton
        magnitude="md"
        emphasis="outline"
        startIcon={<Icon icon={Tag} />}
        label="outline"
      />
      <PillButton magnitude="md" emphasis="soft" startIcon={<Icon icon={Tag} />} label="soft" />
    </div>
  ),
};

/**
 * `PillSwitch` is a toggle: the selected look is its pressed state. Use it for segmented on/off
 * choices (e.g. display properties in a settings menu).
 */
export const Switch: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#pill-switch-hover"] },
  },
  render: () => (
    <div className="flex items-center gap-3">
      <PillSwitch magnitude="md" startIcon={<Icon icon={Tag} />} label="Off" />
      <PillSwitch magnitude="md" startIcon={<Icon icon={Check} />} defaultPressed label="On" />
      <PillSwitch
        id="pill-switch-hover"
        magnitude="md"
        startIcon={<Icon icon={Tag} />}
        label="Hover"
      />
      <PillSwitch magnitude="md" startIcon={<Icon icon={Tag} />} disabled label="Disabled" />
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
        label="Engineering Infrastructure Team"
      />
      <PillSwitch
        magnitude="md"
        startIcon={<Icon icon={Tag} />}
        label="Engineering Infrastructure Team"
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
 * Clicking a `PillButton` fires its handler. A `loading` pill is `aria-busy` + `aria-disabled` and
 * blocks clicks, but stays focusable (NOT natively `disabled`) so assistive tech can announce busy.
 * Spinner sits after the label (Figma). Tagged out of sidebar/docs/manifest; still run under
 * `test`.
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
    await expect(busy).toHaveAttribute("aria-disabled", "true");
    // Soft-disabled: remains in the tab order and focusable.
    await expect(busy).not.toBeDisabled();
    busy.focus();
    await expect(busy).toHaveFocus();

    await userEvent.click(busy);
    await expect(onLoadingClick).not.toHaveBeenCalled();

    // Loading spinner sits after the label (Figma).
    const label = busy.querySelector("span[title='Busy']");
    const spinner = busy.querySelector("svg");
    await expect(label).not.toBeNull();
    await expect(spinner).not.toBeNull();
    await expect(
      label!.compareDocumentPosition(spinner!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
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

/**
 * A `loading` `IconPill` is `aria-busy` + `aria-disabled` and blocks activation, but stays
 * focusable (NOT natively `disabled`). Tagged out of sidebar/docs/manifest; still run under
 * `test`.
 */
export const IconLoadingBlocks: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <IconPill
      magnitude="md"
      aria-label="Add item"
      loading
      onClick={iconPillLoadingSpy}
      icon={<Icon icon={Plus} />}
    />
  ),
  play: async ({ canvas }) => {
    iconPillLoadingSpy.mockClear();

    const button = canvas.getByRole("button", { name: "Add item" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expect(button).not.toBeDisabled();

    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await userEvent.click(button);
    await expect(iconPillLoadingSpy).not.toHaveBeenCalled();
  },
};
