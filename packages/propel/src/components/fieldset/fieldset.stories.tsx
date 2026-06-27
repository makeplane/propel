import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { InputField } from "../input-field/index";
import { Fieldset } from "./index";

// Components-tier story: the ready-made `<Fieldset legend=…>` plus same-tier field controls.
const meta = {
  title: "Components/Fieldset",
  component: Fieldset,
  args: { legendMagnitude: "md", bordered: false },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2053-281",
    },
  },
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Fieldset groups related fields under one accessible legend. */
export const Default: Story = {
  args: {
    legend: "Billing details",
    children: (
      <>
        <InputField
          magnitude="md"
          orientation="vertical"
          name="company"
          label="Company"
          placeholder="Acme Inc."
        />
        <InputField
          magnitude="md"
          orientation="vertical"
          name="taxId"
          label="Tax ID"
          placeholder="US-123"
        />
      </>
    ),
  },
};

/**
 * A bordered fieldset draws a visible boundary around the group, useful when the group sits among
 * other content.
 */
export const Bordered: Story = {
  args: {
    bordered: true,
    legend: "Billing details",
    description: "Enter your billing information below.",
    children: (
      <>
        <InputField
          magnitude="md"
          orientation="vertical"
          name="company"
          label="Company"
          placeholder="Acme Inc."
        />
        <InputField
          magnitude="md"
          orientation="vertical"
          name="taxId"
          label="Tax ID"
          placeholder="US-123"
        />
      </>
    ),
  },
};

/** The legend names the group landmark for assistive tech. */
export const GroupSemantics: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    legend: "Shipping address",
    children: <InputField magnitude="md" orientation="vertical" name="city" label="City" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("group", { name: "Shipping address" })).toBeInTheDocument();
    await expect(canvas.getByRole("textbox", { name: "City" })).toHaveAttribute("name", "city");
  },
};
