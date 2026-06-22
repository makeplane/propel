import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { ExpandableSearch, Search } from "./index";

// Components-tier story: the ready-made `Search` / `ExpandableSearch` single components.
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

/** `ExpandableSearch` collapses to a magnifier and expands into a full field while focused. */
export const Expandable: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ExpandableSearch />,
};

/** Typing reveals the clear button; clicking it empties the field and refocuses the input. */
export const TypeAndClear: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const input = canvas.getByRole("searchbox", { name: "Search" });

    await expect(canvas.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();

    await userEvent.type(input, "Roadmap");
    await expect(input).toHaveValue("Roadmap");

    const clear = canvas.getByRole("button", { name: "Clear search" });
    await userEvent.click(clear);
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
    await expect(canvas.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  },
};
