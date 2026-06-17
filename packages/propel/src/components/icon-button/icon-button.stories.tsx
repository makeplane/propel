import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { expect, fn } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { IconButton, type IconButtonMagnitude, type IconButtonVariant } from "./index";

const VARIANTS: IconButtonVariant[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: IconButtonMagnitude[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  // Icon picker control for the single glyph (the button's `children`).
  argTypes: { children: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1720-3036",
    },
  },
  args: {
    variant: "primary",
    tone: "neutral",
    magnitude: "md",
    children: <Plus />,
    "aria-label": "Add item",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Every Figma "Type" side by side. The neutral fills are `primary`/`secondary`/ `tertiary`/`ghost`;
 * the two Error types are the `danger` tone of `primary` (Error fill) and `secondary` (Error
 * outline) — see {@link Tones}.
 */
export const Variants: Story = {
  argTypes: { variant: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <IconButton key={variant} {...args} variant={variant} aria-label={`${variant} action`} />
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
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} tone="neutral" variant="primary" aria-label="Neutral" />
      <IconButton {...args} tone="danger" variant="primary" aria-label="Danger fill" />
      <IconButton {...args} tone="danger" variant="secondary" aria-label="Danger outline" />
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <IconButton
          key={magnitude}
          {...args}
          magnitude={magnitude}
          aria-label={`${magnitude} add`}
        />
      ))}
    </div>
  ),
};

/** The loading state shows a spinner, sets `aria-busy`, and blocks interaction. */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <IconButton {...args} variant="primary" aria-label="Saving" loading />
      <IconButton {...args} variant="secondary" aria-label="Loading" loading />
      <IconButton {...args} variant="tertiary" aria-label="Refreshing" loading />
    </div>
  ),
};

/** A disabled icon button does not fire `onClick`. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <IconButton
          key={variant}
          {...args}
          variant={variant}
          aria-label={`${variant} disabled`}
          disabled
        />
      ))}
    </div>
  ),
};

/**
 * An IconButton exposes its `aria-label` as the accessible name. Tagged
 * `!dev`/`!autodocs`/`!manifest` so it's hidden from the sidebar, docs, and AI manifest — it's a
 * behavior test, not an example — but still runs under `test`.
 */
export const HasAccessibleName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <IconButton variant="primary" tone="neutral" magnitude="md" aria-label="Add item">
      <Plus />
    </IconButton>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  },
};

/**
 * Tab moves focus onto the icon button (queryable by its `aria-label`), then **Enter** activates it
 * (fires `onClick`).
 */
export const EnterActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Add item" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** With the icon button focused, **Space** activates it (fires `onClick`). */
export const SpaceActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Add item" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/**
 * A `disabled` icon button is removed from the tab order: Tab does not land on it and keyboard
 * activation (Enter/Space) never fires `onClick`.
 */
export const DisabledNotKeyboardActivatable: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Add item" });
    await expect(button).toBeDisabled();
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
    button.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
