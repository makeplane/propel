import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { SwitchFieldControl } from "./index";
import { SwitchField } from "./index";

// A switch laid out as a field row (Field + SwitchFieldControl + label/helper).
const meta = {
  title: "Components/SwitchField",
  component: SwitchField,
  subcomponents: { SwitchFieldControl },
  args: { name: "restartOnFailure", label: "Restart on failure", magnitude: "md" },
} satisfies Meta<typeof SwitchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { description: "Automatically restart the service after a crash.", defaultChecked: true },
};

export const RendersSwitch: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("switch", { name: "Restart on failure" })).toBeInTheDocument();
  },
};
