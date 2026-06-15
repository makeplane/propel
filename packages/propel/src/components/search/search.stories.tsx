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
 * `ExpandableSearch` starts as a magnifier icon button and expands into a full search
 * input on click — the toolbar/header pattern. It collapses again when blurred empty.
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
 * Clicking the magnifier expands `ExpandableSearch` and focuses the input; clearing the
 * field and blurring it collapses back to the icon. Tagged out of the sidebar/docs/
 * manifest but still run under the default `test` tag.
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

    // Collapsed: a magnifier icon button, no input yet.
    const trigger = canvas.getByRole("button", { name: "Search" });
    await expect(canvas.queryByRole("searchbox")).not.toBeInTheDocument();

    // Click expands it and focuses the input.
    await userEvent.click(trigger);
    const input = await canvas.findByRole("searchbox", { name: "Search" });
    await expect(input).toHaveFocus();

    // A value keeps it expanded across blur; clearing then blurring collapses it.
    await userEvent.type(input, "Roadmap");
    await userEvent.click(canvas.getByRole("button", { name: "Clear search" }));
    await expect(input).toHaveValue("");
    await userEvent.click(canvas.getByRole("button", { name: "elsewhere" }));
    await expect(canvas.queryByRole("searchbox")).not.toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: "Search" })).toBeInTheDocument();
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
