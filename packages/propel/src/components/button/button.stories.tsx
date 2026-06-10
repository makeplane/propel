import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Search, Settings } from "lucide-react";
import { expect, fn } from "storybook/test";
import { iconControl } from "../../storybook/icon-control";
import { Button, type ButtonMagnitude, type ButtonVariant } from "./index";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "tertiary", "ghost", "link"];
const MAGNITUDES: ButtonMagnitude[] = ["xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["ai-generated"],
  // Icon picker controls for the two icon slots.
  argTypes: { leadingIcon: iconControl, trailingIcon: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1143-19597",
    },
  },
  args: {
    children: "Button",
    variant: "primary",
    tone: "neutral",
    magnitude: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every Figma "Type" side by side at the default magnitude. */
export const Variants: Story = {
  // Iterates `variant` and labels each button with the variant name, so disable just
  // those two controls; the rest stay live and update every button at once.
  argTypes: { variant: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/**
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error").
 * Danger is shown as a solid fill and a bordered outline.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} tone="neutral" variant="primary">
        Neutral
      </Button>
      <Button {...args} tone="danger" variant="primary">
        Danger fill
      </Button>
      <Button {...args} tone="danger" variant="secondary">
        Danger outline
      </Button>
    </div>
  ),
};

/**
 * `emphasis` is link-only (Figma "Emphasis"): `solid` is the blue `link/primary`
 * affordance, `subtle` is the muted gray inline link (uses `text-secondary`).
 * Every non-link variant ignores it.
 */
export const LinkEmphasis: Story = {
  // Iterates `emphasis` (link-only, so `variant` is pinned to link) and labels each
  // button, so disable those controls; the rest stay live and update both at once.
  argTypes: {
    emphasis: { control: false },
    variant: { control: false },
    children: { control: false },
  },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} variant="link" emphasis="solid">
        Solid link
      </Button>
      <Button {...args} variant="link" emphasis="subtle">
        Subtle link
      </Button>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl; xs is an extra dense step). */
export const Magnitudes: Story = {
  // Iterates `magnitude` and labels each button with the magnitude name, so disable
  // just those two controls; the rest stay live and update every button at once.
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Button key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </Button>
      ))}
    </div>
  ),
};

/** Leading and trailing icons sit beside the label and are decorative. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} leadingIcon={<Plus />}>
        New
      </Button>
      <Button {...args} variant="secondary" trailingIcon={<Settings />}>
        Settings
      </Button>
      <Button {...args} variant="tertiary" leadingIcon={<Search />} trailingIcon={<Plus />}>
        Search
      </Button>
    </div>
  ),
};

/** The loading state shows a spinner, sets `aria-busy`, and blocks interaction. */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} loading>
        Saving
      </Button>
      <Button {...args} variant="secondary" loading>
        Loading
      </Button>
      <Button {...args} variant="tertiary" loading>
        Please wait
      </Button>
    </div>
  ),
};

/**
 * Clicking a button fires `onClick`. Tagged `!dev`/`!autodocs`/`!manifest` so it's
 * hidden from the sidebar, docs, and AI manifest — it's a behavior test, not an
 * example — but still runs under the default `test` tag.
 */
export const ClickFiresOnClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/**
 * Tab moves focus onto the button, then **Enter** activates it (fires `onClick`).
 * Native `<button>` semantics — the test guards that the wrapper keeps them.
 */
export const EnterActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** With the button focused, **Space** activates it (fires `onClick`). */
export const SpaceActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** A `disabled` button does not fire `onClick`. */
export const DisabledBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * A `disabled` button is removed from the tab order: Tab does not land on it and
 * keyboard activation (Enter/Space) never fires `onClick`.
 */
export const DisabledNotKeyboardActivatable: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
    button.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** A `loading` button stays focusable but keyboard activation does not fire `onClick`. */
export const LoadingNotKeyboardActivatable: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * A `loading` button shows the spinner, is `aria-busy` + `aria-disabled`, and
 * blocks clicks — but stays a real, focusable button (NOT natively `disabled`)
 * so assistive tech can land on it and announce the busy state.
 */
export const LoadingBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    // Not natively disabled: it must remain in the tab order and focusable.
    await expect(button).not.toBeDisabled();
    // The spinner is present (lucide renders an <svg>).
    await expect(button.querySelector("svg")).not.toBeNull();
    // It can receive focus.
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
