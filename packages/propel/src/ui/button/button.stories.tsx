import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { expect, fn, userEvent as baseUserEvent } from "storybook/test";

import {
  Button,
  ButtonIcon,
  ButtonLabel,
  type ButtonMagnitude,
  ButtonSpinner,
  type ButtonVariant,
} from "./index";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "tertiary", "ghost", "link"];
const MAGNITUDES: ButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// UI-tier story: the ATOMIC button — a single accessible `<button>` with `variant` /
// `tone` / `magnitude` (and link-only `emphasis`). It has no inline-node slots or
// `loading` spinner; for those, see the ready-made `Button` (Components/Button), which
// composes this primitive.
const meta = {
  title: "UI/Button",
  component: Button,
  // The button's anatomy parts; the ready-made Button (Components/Button) composes them.
  subcomponents: { ButtonIcon, ButtonLabel, ButtonSpinner },
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
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error"). Danger shows as a
 * solid fill and a bordered outline.
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
 * `emphasis` is link-only (Figma "Emphasis"): `solid` is the blue `link/primary` affordance,
 * `subtle` is the muted gray inline link. Every non-link variant ignores it.
 */
export const LinkEmphasis: Story = {
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

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
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

/** `stretch="full"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  argTypes: { stretch: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Button {...args} stretch="auto">
        Auto width
      </Button>
      <Button {...args} stretch="full">
        Full width
      </Button>
    </div>
  ),
};

/**
 * The atomic button is composed from named parts: `ButtonIcon` sizes a decorative leading/trailing
 * node to the button's `--node-size`, `ButtonLabel` holds the text (and dims under `aria-busy`),
 * and `ButtonSpinner` is the loading indicator. The ready-made `Button` (Components/Button) lays
 * these out for you; here they are composed by hand.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args}>
        <ButtonIcon>
          <Plus />
        </ButtonIcon>
        <ButtonLabel>With icon</ButtonLabel>
      </Button>
      {/* The busy state mirrors the ready-made Button: it is `aria-busy` AND soft-disabled
          (Base UI `disabled` + `focusableWhenDisabled`), so the disabled palette applies. */}
      <Button {...args} aria-busy disabled focusableWhenDisabled>
        <ButtonSpinner />
        <ButtonLabel>Loading</ButtonLabel>
      </Button>
    </div>
  ),
};

/**
 * Clicking the button fires `onClick`. Tagged out of the sidebar/docs/manifest but still runs under
 * the default `test` tag.
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

/** A `disabled` button does not fire `onClick` and is removed from the tab order. */
export const DisabledBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeDisabled();
    // A disabled button sets `pointer-events: none`, so the default user-event guard
    // refuses to click it. Disable that guard so the click is dispatched at the element;
    // the native disabled button must still ignore it and never fire `onClick`.
    const user = baseUserEvent.setup({ pointerEventsCheck: 0 });
    await user.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
