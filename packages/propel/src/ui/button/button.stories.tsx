import type { Meta, StoryObj } from "@storybook/react-vite";
import { LoaderCircle, Plus } from "lucide-react";
import { expect, fn, userEvent as baseUserEvent } from "storybook/test";

import {
  Button,
  ButtonIcon,
  ButtonLabel,
  type ButtonMagnitude,
  ButtonSpinner,
  type ButtonProminence,
} from "./index";

const PROMINENCES: ButtonProminence[] = ["primary", "secondary", "tertiary", "ghost"];
const MAGNITUDES: ButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// UI-tier story: the ATOMIC button — a single accessible `<button>` with `prominence` /
// `tone` / `magnitude` / `sizing`. It has no inline-node slots or
// `loading` spinner; for those, see the ready-made `Button` (Components/Button), which
// composes this primitive.
const meta = {
  title: "UI/Button",
  component: Button,
  // The button's anatomy parts; the ready-made Button (Components/Button) composes them.
  subcomponents: { ButtonIcon, ButtonLabel, ButtonSpinner },
  args: {
    children: "Button",
    prominence: "primary",
    tone: "neutral",
    magnitude: "md",
    sizing: "hug",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every prominence (Figma "Type") side by side at the default magnitude. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <Button key={prominence} {...args} prominence={prominence}>
          {prominence}
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
      <Button {...args} tone="neutral" prominence="primary">
        Neutral
      </Button>
      <Button {...args} tone="danger" prominence="primary">
        Danger fill
      </Button>
      <Button {...args} tone="danger" prominence="secondary">
        Danger outline
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

/** `sizing="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  argTypes: { sizing: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Button {...args} sizing="hug">
        Auto width
      </Button>
      <Button {...args} sizing="fill">
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
        <ButtonSpinner>
          <LoaderCircle />
        </ButtonSpinner>
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
