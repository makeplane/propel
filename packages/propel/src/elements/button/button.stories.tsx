import { Button as BaseButton } from "@base-ui/react/button";
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

// elements-tier story (rule 2b): `Button` is a Base-UI-agnostic styled `<button>`; Base UI's `Button`
// grafts the action behavior onto it via `render` (behavior part outer, styled part the render
// target) — the same wiring the `components` ready-made composes. The atomic button has no
// inline-node slots or `loading` spinner; for those, see the ready-made `Button`
// (Components/Button), which composes this primitive.
const meta = {
  title: "Elements/Button",
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
  render: ({ prominence, tone, magnitude, sizing, children, onClick, disabled }) => (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      render={<Button prominence={prominence} tone={tone} magnitude={magnitude} sizing={sizing} />}
    >
      <ButtonLabel>{children}</ButtonLabel>
    </BaseButton>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every prominence (Figma "Type") side by side at the default magnitude. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: ({ tone, magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      {PROMINENCES.map((prominence) => (
        <BaseButton
          key={prominence}
          render={
            <Button prominence={prominence} tone={tone} magnitude={magnitude} sizing={sizing} />
          }
        >
          <ButtonLabel>{prominence}</ButtonLabel>
        </BaseButton>
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
  render: ({ magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      <BaseButton
        render={
          <Button tone="neutral" prominence="primary" magnitude={magnitude} sizing={sizing} />
        }
      >
        <ButtonLabel>Neutral</ButtonLabel>
      </BaseButton>
      <BaseButton
        render={<Button tone="danger" prominence="primary" magnitude={magnitude} sizing={sizing} />}
      >
        <ButtonLabel>Danger fill</ButtonLabel>
      </BaseButton>
      <BaseButton
        render={
          <Button tone="danger" prominence="secondary" magnitude={magnitude} sizing={sizing} />
        }
      >
        <ButtonLabel>Danger outline</ButtonLabel>
      </BaseButton>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: ({ prominence, tone, sizing }) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <BaseButton
          key={magnitude}
          render={
            <Button prominence={prominence} tone={tone} magnitude={magnitude} sizing={sizing} />
          }
        >
          <ButtonLabel>{magnitude}</ButtonLabel>
        </BaseButton>
      ))}
    </div>
  ),
};

/** `sizing="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  argTypes: { sizing: { control: false }, children: { control: false } },
  render: ({ prominence, tone, magnitude }) => (
    <div className="flex w-64 flex-col gap-2">
      <BaseButton
        render={<Button prominence={prominence} tone={tone} magnitude={magnitude} sizing="hug" />}
      >
        <ButtonLabel>Auto width</ButtonLabel>
      </BaseButton>
      <BaseButton
        render={<Button prominence={prominence} tone={tone} magnitude={magnitude} sizing="fill" />}
      >
        <ButtonLabel>Full width</ButtonLabel>
      </BaseButton>
    </div>
  ),
};

/**
 * The atomic button is composed from named parts: `ButtonIcon` sizes a decorative leading/trailing
 * node to the button's `--node-size`, `ButtonLabel` holds the text (and dims under `aria-busy`),
 * and `ButtonSpinner` is the loading indicator. The ready-made `Button` (Components/Button) lays
 * these out for you; here they are composed by hand onto Base UI's `Button` behavior.
 */
export const Anatomy: Story = {
  args: { children: undefined },
  argTypes: { children: { control: false } },
  render: ({ prominence, tone, magnitude, sizing }) => (
    <div className="flex items-center gap-3">
      <BaseButton
        render={
          <Button prominence={prominence} tone={tone} magnitude={magnitude} sizing={sizing} />
        }
      >
        <ButtonIcon>
          <Plus />
        </ButtonIcon>
        <ButtonLabel>With icon</ButtonLabel>
      </BaseButton>
      {/* The busy state mirrors the ready-made Button: it is `aria-busy` AND soft-disabled
          (Base UI `disabled` + `focusableWhenDisabled`), so the disabled palette applies while the
          button stays focusable. */}
      <BaseButton
        aria-busy
        disabled
        focusableWhenDisabled
        render={
          <Button prominence={prominence} tone={tone} magnitude={magnitude} sizing={sizing} />
        }
      >
        <ButtonSpinner>
          <LoaderCircle />
        </ButtonSpinner>
        <ButtonLabel>Loading</ButtonLabel>
      </BaseButton>
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
