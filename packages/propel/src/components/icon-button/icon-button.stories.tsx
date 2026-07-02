import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { expect, fn } from "storybook/test";

import { IconButton as IconButtonElement } from "../../elements/icon-button";
import { iconControl } from "../../storybook/icon-control";
import { IconButton, type IconButtonMagnitude, type IconButtonProminence } from "./index";

const PROMINENCES: IconButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: IconButtonMagnitude[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  subcomponents: { IconButtonElement },
  argTypes: { children: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1720-3036",
    },
  },
  args: {
    prominence: "primary",
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
 * Every Figma "Type" side by side. The neutral fills are `primary`/`secondary`/`tertiary`/`ghost`;
 * the two Error types are the `danger` tone of `primary` (Error fill) and `secondary` (Error
 * outline) — see {@link Tones}.
 */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, "aria-label": { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <IconButton
          key={prominence}
          {...args}
          prominence={prominence}
          aria-label={`${prominence} action`}
        />
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
      <IconButton {...args} tone="neutral" prominence="primary" aria-label="Neutral" />
      <IconButton {...args} tone="danger" prominence="primary" aria-label="Danger fill" />
      <IconButton {...args} tone="danger" prominence="secondary" aria-label="Danger outline" />
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
      <IconButton {...args} prominence="primary" aria-label="Saving" loading />
      <IconButton {...args} prominence="secondary" aria-label="Loading" loading />
      <IconButton {...args} prominence="tertiary" aria-label="Refreshing" loading />
    </div>
  ),
};

/** A disabled icon button does not fire `onClick`. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <IconButton
          key={prominence}
          {...args}
          prominence={prominence}
          aria-label={`${prominence} disabled`}
          disabled
        />
      ))}
    </div>
  ),
};

/**
 * An IconButton exposes its `aria-label` as the accessible name. Tagged out of the
 * sidebar/docs/manifest but still runs under `test`.
 */
export const HasAccessibleName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <IconButton prominence="primary" tone="neutral" magnitude="md" aria-label="Add item">
      <Plus />
    </IconButton>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  },
};

/** Tab moves focus onto the icon button, then **Enter** activates it (fires `onClick`). */
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

/** A `loading` icon button remains focusable with `aria-busy`, but Base UI suppresses activation. */
export const LoadingBlocksInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Add item" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).not.toBeDisabled();

    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
