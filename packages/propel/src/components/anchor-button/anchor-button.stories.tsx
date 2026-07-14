import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpRight, Plus } from "lucide-react";
import * as React from "react";
import { expect, fn, userEvent as baseUserEvent, waitFor } from "storybook/test";

import { Icon } from "../icon";
import { AnchorButton, type AnchorButtonMagnitude, type AnchorButtonProminence } from "./index";

const PROMINENCES: AnchorButtonProminence[] = ["primary", "secondary"];
const MAGNITUDES: AnchorButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// A <button> (action) that reads as an inline link — the "action that looks like a link" (e.g.
// "Show more"); render it as an <a> (nativeButton={false} + render) for a real navigation link.
const meta = {
  title: "Components/AnchorButton",
  component: AnchorButton,
  args: { label: "Show more", prominence: "primary", magnitude: "md" },
} satisfies Meta<typeof AnchorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <AnchorButton
          key={prominence}
          {...args}
          prominence={prominence}
          label={`${prominence} action`}
        />
      ))}
    </div>
  ),
};

/** Text sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <AnchorButton key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
};

/** It is a `<button>` (an action) — clicking fires `onClick`, not navigation. */
export const ActsNotNavigates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/**
 * A navigation link: `render={<a href=… />}` swaps the element and `nativeButton={false}` applies
 * Base UI's non-native button semantics — announced as a button, while the `<a>` keeps native
 * navigation (Enter follows the href, open-in-new-tab works).
 */
export const AsLink: Story = {
  args: { prominence: "primary", magnitude: "md" },
  render: (args) => (
    <AnchorButton
      {...args}
      nativeButton={false}
      render={<a href="#work-items" />}
      label="View all work items"
    />
  ),
};

/**
 * Interaction test: the rendered element is an `<a>` exposing the link role with its href. Tagged
 * out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const AsLinkInteraction: Story = {
  ...AsLink,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // Base UI's contract for nativeButton={false}: the control is ANNOUNCED as a button
    // (role="button") while the <a> keeps native navigation (Enter follows the href).
    const link = canvas.getByRole("button", { name: "View all work items" });
    await expect(link.tagName).toBe("A");
    await expect(link).toHaveAttribute("href", "#work-items");
  },
};

/** Leading and trailing icons beside the label, sized to the link's `--node-size`. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <AnchorButton
        prominence="primary"
        magnitude="md"
        startIcon={<Icon icon={Plus} />}
        label="Add condition"
      />
      <AnchorButton
        prominence="secondary"
        magnitude="md"
        endIcon={<Icon icon={ArrowUpRight} />}
        label="View docs"
      />
    </div>
  ),
};

/** The `loading` spinner trails the label and mutes via the link chrome. */
export const Loading: Story = {
  args: { prominence: "primary", magnitude: "md", loading: true },
  render: (args) => <AnchorButton {...args} label="Saving…" />,
};

/**
 * An action that enters `loading` after click: spinner + `aria-busy`, blocks re-fires, keeps
 * keyboard focus while soft-disabled, then settles once the work resolves.
 */
export const AsyncSubmit: Story = {
  parameters: { controls: { disable: true } },
  render: function Render(args) {
    const [submitting, setSubmitting] = React.useState(false);
    return (
      <AnchorButton
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

/**
 * Tab moves focus onto the control, then **Enter** activates it (fires `onClick`). Native
 * `<button>` semantics — guards that the Base UI graft keeps them.
 */
export const EnterActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** With the control focused, **Space** activates it (fires `onClick`). */
export const SpaceActivates: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** A `disabled` AnchorButton does not fire `onClick`. */
export const DisabledBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await expect(button).toBeDisabled();
    const user = baseUserEvent.setup({ pointerEventsCheck: 0 });
    await user.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * A `disabled` AnchorButton is removed from the tab order: Tab does not land on it and keyboard
 * activation (Enter/Space) never fires `onClick`.
 */
export const DisabledNotKeyboardActivatable: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
    button.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** A `loading` AnchorButton stays focusable but keyboard activation does not fire `onClick`. */
export const LoadingNotKeyboardActivatable: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("[Space]");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * A `loading` AnchorButton shows the spinner, is `aria-busy` + `aria-disabled`, and blocks clicks —
 * but stays focusable (not natively `disabled`) so assistive tech can announce the busy state.
 */
export const LoadingBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Show more" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expect(button).not.toBeDisabled();
    await expect(button.querySelector("svg")).not.toBeNull();
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * The async-submit cycle keeps focus: activating flips into `loading` without dropping focus, and
 * once the work settles the control is interactive again with focus still in place.
 */
export const AsyncSubmitKeepsFocus: Story = {
  ...AsyncSubmit,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Submit" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAccessibleName("Submitting");
    await expect(button).toHaveFocus();
    await waitFor(() => expect(button).not.toHaveAttribute("aria-busy"), { timeout: 3000 });
    await expect(button).not.toBeDisabled();
    await expect(button).toHaveAccessibleName("Submit");
    await expect(button).toHaveFocus();
  },
};
