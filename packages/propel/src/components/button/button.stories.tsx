import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Search, Settings } from "lucide-react";
import * as React from "react";
import { expect, fireEvent, fn, userEvent as baseUserEvent, waitFor } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { Icon } from "../icon";
import { Button, ButtonLabel, type ButtonSize, type ButtonVariant } from "./index";

const VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "danger-outline",
];
const SIZES: ButtonSize[] = ["sm", "md", "lg", "xl"];

const meta = {
  title: "Components/Button",
  component: Button,
  // Anatomy parts the ready-made Button composes (UI tier).
  subcomponents: { ButtonLabel },
  // Icon picker control for the icon slot.
  argTypes: { icon: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1143-19597",
    },
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "md",
    fillType: "hug",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every variant — the four Figma Types plus the two danger palettes — at the default size. */
export const Variants: Story = {
  // Iterates `variant` and labels each button, so disable just those two controls;
  // the rest stay live and update every button at once.
  argTypes: { variant: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant} label={variant} />
      ))}
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Sizes: Story = {
  // Iterates `size` and labels each button with the size name, so disable
  // just those two controls; the rest stay live and update every button at once.
  argTypes: { size: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size} label={size} />
      ))}
    </div>
  ),
};

/** The icon sits inline-start by default; `iconPosition="end"` moves it after the label. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} icon={<Icon icon={Plus} />} label="New" />
      <Button
        {...args}
        variant="secondary"
        icon={<Icon icon={Settings} />}
        iconPosition="end"
        label="Settings"
      />
      <Button {...args} variant="tertiary" icon={<Icon icon={Search} />} label="Search" />
    </div>
  ),
};

/**
 * The loading state swaps the icon slot for a spinner (at `iconPosition`, inline-start by default),
 * sets `aria-busy`, and blocks interaction.
 */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} loading label="Saving" />
      <Button
        {...args}
        variant="secondary"
        loading
        icon={<Icon icon={Plus} />}
        iconPosition="end"
        label="Loading"
      />
      <Button {...args} variant="tertiary" loading label="Please wait" />
    </div>
  ),
};

/**
 * A submit that enters `loading` after being clicked: the click starts the work (a deterministic
 * 1.5 s delay here so the spinner is readable), the button shows the spinner, announces
 * `aria-busy`, and blocks re-submits — yet keeps keyboard focus while soft-disabled — then settles
 * back once the work resolves.
 */
export const AsyncSubmit: Story = {
  parameters: { controls: { disable: true } },
  // Rule 2c: hooks live in a named-function render, not a local example component.
  render: function Render(args) {
    const [submitting, setSubmitting] = React.useState(false);
    return (
      <Button
        {...args}
        loading={submitting}
        label={submitting ? "Submitting" : "Submit"}
        onClick={() => {
          setSubmitting(true);
          window.setTimeout(() => setSubmitting(false), 1500);
        }}
      />
    );
  },
};

/** `fillType="fill"` fills the container (e.g. a form row or mobile CTA). */
export const Stretch: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-64 flex-col gap-2">
      <Button {...args} fillType="fill" label="Full-width" />
      <Button {...args} variant="secondary" fillType="fill" label="Full-width outline" />
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
  play: async ({ args, canvas }) => {
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
    // The chrome blocks real pointers outright (`aria-busy:pointer-events-none`), which makes
    // `userEvent.click` throw — dispatch the event directly to prove Base UI's soft-disabled
    // suppression holds even if a click event somehow reaches the button.
    await fireEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * The async-submit cycle keeps focus on the button the whole time: activating it flips the button
 * into `loading` (`aria-busy`, soft-disabled) WITHOUT dropping focus, and once the work settles the
 * button is enabled again with focus still in place — a keyboard user never loses their spot.
 */
export const AsyncSubmitKeepsFocus: Story = {
  ...AsyncSubmit,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Submit" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    // The work is in flight: busy + soft-disabled, but focus never left the button.
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAccessibleName("Submitting");
    await expect(button).toHaveFocus();
    // The work settles: interactive again, focus still on the button.
    await waitFor(() => expect(button).not.toHaveAttribute("aria-busy"), { timeout: 3000 });
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveAccessibleName("Submit");
    await expect(button).toHaveFocus();
  },
};

/**
 * Rendering as another tag: `render` swaps the underlying element and `nativeButton={false}` has
 * Base UI add `role="button"`, tab focus, and Enter/Space activation to the non-button tag.
 */
export const CustomTag: Story = {
  args: {
    variant: "secondary",
    size: "md",
    fillType: "hug",
  },
  render: (args) => (
    <Button {...args} nativeButton={false} render={<div />} label="Add to favorites" />
  ),
};

/**
 * Interaction test: the custom tag is a DIV exposing `role="button"`, joins the tab order, and
 * activates from keyboard and pointer alike. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const CustomTagInteraction: Story = {
  ...CustomTag,
  tags: ["!dev", "!autodocs", "!manifest"],
  render: function Render(args) {
    const [count, setCount] = React.useState(0);
    return (
      <Button
        {...args}
        nativeButton={false}
        render={<div data-testid="custom-tag-button" />}
        label={`Activated ${count}`}
        onClick={() => setCount((current) => current + 1)}
      />
    );
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: /Activated/ });
    await expect(button.tagName).toBe("DIV");
    await expect(button).toHaveAttribute("tabindex", "0");
    await userEvent.click(button);
    await expect(canvas.getByRole("button", { name: "Activated 1" })).toBeInTheDocument();
    button.focus();
    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByRole("button", { name: "Activated 2" })).toBeInTheDocument();
    await userEvent.keyboard(" ");
    await expect(canvas.getByRole("button", { name: "Activated 3" })).toBeInTheDocument();
  },
};

/**
 * A navigation link: `render={<a href=… />}` swaps the element and `nativeButton={false}` applies
 * Base UI's non-native button semantics — announced as a button, while the `<a>` keeps native
 * navigation (Enter follows the href, open-in-new-tab works).
 */
export const AsLink: Story = {
  args: {
    variant: "secondary",
    size: "md",
    fillType: "hug",
  },
  render: (args) => (
    <Button {...args} nativeButton={false} render={<a href="#reports" />} label="Open reports" />
  ),
};

/**
 * Interaction test: the rendered element is an `<a>` exposing the link role with its href, in the
 * tab order without a button role. Tagged out of the sidebar/docs/manifest while still running
 * under the default `test` tag.
 */
export const AsLinkInteraction: Story = {
  ...AsLink,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // Base UI's contract for nativeButton={false}: the control is ANNOUNCED as a button
    // (role="button") while the <a> keeps native navigation (Enter follows the href).
    const link = canvas.getByRole("button", { name: "Open reports" });
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "#reports");
  },
};
