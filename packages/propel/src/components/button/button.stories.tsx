import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Search, Settings } from "lucide-react";
import { expect, fn, userEvent as baseUserEvent } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
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

const meta = {
  title: "Components/Button",
  component: Button,
  // Anatomy parts the ready-made Button composes (UI tier).
  subcomponents: { ButtonIcon, ButtonLabel, ButtonSpinner },
  // Icon picker controls for the two icon slots.
  argTypes: { startIcon: iconControl, endIcon: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1143-19597",
    },
  },
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
  // Iterates `prominence` and labels each button, so disable just those two controls;
  // the rest stay live and update every button at once.
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
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error"). Danger is shown as a
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

/** Inline-start and inline-end nodes sit beside the label and are decorative. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} startIcon={<Plus />}>
        New
      </Button>
      <Button {...args} prominence="secondary" endIcon={<Settings />}>
        Settings
      </Button>
      <Button {...args} prominence="tertiary" startIcon={<Search />} endIcon={<Plus />}>
        Search
      </Button>
    </div>
  ),
};

/** The loading state shows a spinner, sets `aria-busy`, and blocks interaction. The label dims. */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} loading>
        Saving
      </Button>
      <Button {...args} prominence="secondary" loading>
        Loading
      </Button>
      <Button {...args} prominence="tertiary" loading>
        Please wait
      </Button>
    </div>
  ),
};

/** `sizing="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Button {...args} sizing="fill">
        Full-width
      </Button>
      <Button {...args} prominence="secondary" sizing="fill">
        Full-width outline
      </Button>
    </div>
  ),
};

/**
 * Clicking a button fires `onClick`. Tagged `!dev`/`!autodocs`/`!manifest` so it's hidden from the
 * sidebar, docs, and AI manifest — it's a behavior test, not an example — but still runs under the
 * default `test` tag.
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
 * Tab moves focus onto the button, then **Enter** activates it (fires `onClick`). Native `<button>`
 * semantics — the test guards that the wrapper keeps them.
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

/**
 * A `disabled` button is removed from the tab order: Tab does not land on it and keyboard
 * activation (Enter/Space) never fires `onClick`.
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
 * A `loading` button shows the spinner, is `aria-busy` + `aria-disabled`, and blocks clicks — but
 * stays a real, focusable button (NOT natively `disabled`) so assistive tech can land on it and
 * announce the busy state.
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
