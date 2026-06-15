import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, userEvent, within } from "storybook/test";
import { ExpandableSearch, Search } from "./index";

const meta = {
  title: "Components/Search",
  component: Search,
  subcomponents: { ExpandableSearch },
  args: { placeholder: "Search" },
  // The field fills its container; give it a width to render in.
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1393-45336",
    },
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty search field — leading magnifier + placeholder, no clear button yet. */
export const Default: Story = {};

/** With a value: the clear (✕) button appears at the trailing edge. */
export const Filled: Story = {
  args: { defaultValue: "Product" },
};

/** Disabled field. */
export const Disabled: Story = {
  args: { defaultValue: "Product", disabled: true },
};

/** Controlled: drive the value with `value` + `onValueChange`. */
export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col gap-2">
        <Search value={value} onValueChange={setValue} />
        <p className="text-12 text-tertiary">Query: {value || "(empty)"}</p>
      </div>
    );
  },
};

/**
 * `ExpandableSearch` collapses to a magnifier icon and expands into a full search input
 * while focused — the toolbar/header pattern. The input itself is the only control, so it
 * stays a real searchbox; it collapses again when blurred empty (or on `Escape`).
 */
export const Expandable: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ExpandableSearch />,
};

/** `ExpandableSearch` with an initial value renders expanded (with the clear button). */
export const ExpandableFilled: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ExpandableSearch defaultValue="Roadmap" />,
};

/**
 * `ExpandableSearch` is a single searchbox that renders collapsed and expands on focus —
 * there is no separate toggle button. Focusing it (clicking the magnifier focuses the
 * field) expands it; blurring it empty or pressing `Escape` collapses it, and a value
 * keeps it open. Tagged out of the sidebar/docs/manifest but still run under the default
 * `test` tag.
 */
export const ExpandAndCollapse: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <div className="flex flex-col gap-2">
      <ExpandableSearch />
      {/* A focusable sibling to blur onto, so the collapse-on-blur path is testable. */}
      <button type="button">elsewhere</button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The field is always a real searchbox (no separate toggle); it just renders collapsed
    // until focused. `data-expanded` on its box reflects the open state.
    const input = canvas.getByRole("searchbox", { name: "Search" });
    const box = input.closest("label");
    await expect(box).not.toHaveAttribute("data-expanded");

    // Focus opens it (clicking the box focuses the input); blurring it empty collapses it.
    await userEvent.click(input);
    await expect(input).toHaveFocus();
    await expect(box).toHaveAttribute("data-expanded");
    await userEvent.click(canvas.getByRole("button", { name: "elsewhere" }));
    await expect(box).not.toHaveAttribute("data-expanded");

    // A value keeps it open; Escape clears the field first, then (empty) collapses it.
    await userEvent.click(input);
    await userEvent.type(input, "Roadmap");
    await userEvent.keyboard("{Escape}");
    await expect(input).toHaveValue("");
    await expect(box).toHaveAttribute("data-expanded");
    await userEvent.keyboard("{Escape}");
    await expect(box).not.toHaveAttribute("data-expanded");

    // The field is never removed from the document — it just collapses.
    await expect(canvas.getByRole("searchbox", { name: "Search" })).toBeInTheDocument();
  },
};

/**
 * Typing reveals the clear button; clicking it empties the field and returns focus to
 * the input. Tagged out of the sidebar/docs/manifest but still run under the default
 * `test` tag.
 */
export const TypeAndClear: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("searchbox", { name: "Search" });

    // No clear button while empty.
    await expect(canvas.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();

    await userEvent.type(input, "Roadmap");
    await expect(input).toHaveValue("Roadmap");

    // The clear button now appears; clicking it empties the field and refocuses it.
    const clear = canvas.getByRole("button", { name: "Clear search" });
    await userEvent.click(clear);
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
    await expect(canvas.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  },
};
