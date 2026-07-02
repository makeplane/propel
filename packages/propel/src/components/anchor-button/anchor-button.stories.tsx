import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowUpRight, Plus } from "lucide-react";
import { expect, fn } from "storybook/test";

import { AnchorButton, type AnchorButtonMagnitude, type AnchorButtonProminence } from "./index";

const PROMINENCES: AnchorButtonProminence[] = ["primary", "secondary"];
const MAGNITUDES: AnchorButtonMagnitude[] = ["sm", "md", "lg", "xl"];

// A <button> (action) that reads as an inline link — the "action that looks like a link" (e.g.
// "Show more"); render it as an <a> (nativeButton={false} + render) for a real navigation link.
const meta = {
  title: "Components/AnchorButton",
  component: AnchorButton,
  args: { children: "Show more", prominence: "primary", magnitude: "md" },
} satisfies Meta<typeof AnchorButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** `prominence`: `primary` is the blue link; `secondary` the muted gray inline link. */
export const Prominences: Story = {
  argTypes: { prominence: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {PROMINENCES.map((prominence) => (
        <AnchorButton key={prominence} {...args} prominence={prominence}>
          {prominence} action
        </AnchorButton>
      ))}
    </div>
  ),
};

/** Text sizes (Figma S/Base/L/XL map to sm/md/lg/xl). */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false }, children: { control: false } },
  render: (args) => (
    <div className="flex items-center gap-4">
      {MAGNITUDES.map((magnitude) => (
        <AnchorButton key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </AnchorButton>
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
    <AnchorButton {...args} nativeButton={false} render={<a href="#work-items" />}>
      View all work items
    </AnchorButton>
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
      <AnchorButton prominence="primary" magnitude="md" startIcon={<Plus />}>
        Add condition
      </AnchorButton>
      <AnchorButton prominence="secondary" magnitude="md" endIcon={<ArrowUpRight />}>
        View docs
      </AnchorButton>
    </div>
  ),
};

/** The `loading` spinner replaces the leading icon and dims the label. */
export const Loading: Story = {
  args: { prominence: "primary", magnitude: "md", loading: true },
  render: (args) => <AnchorButton {...args}>Saving…</AnchorButton>,
};
