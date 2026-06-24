import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Collapsible } from "./index";

// Components-tier story: the ready-made `<Collapsible trigger=… indicator>body</Collapsible>`
// wrapper that wires the trigger and panel for the 90% case. The UI-tier story assembles the
// atomic parts. `indicator` is a required prop — set to `true` for the chevron, `false` to omit.
const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  args: {
    trigger: "Recent activity",
    children: "3 work items updated in the last hour.",
    indicator: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The default disclosure: collapsed on mount, click the trigger to reveal the body. */
export const Default: Story = {};

/** `defaultOpen` renders the panel expanded on mount. */
export const DefaultOpen: Story = {
  args: { defaultOpen: true },
};

/** Without the rotating chevron — `indicator={false}` omits it entirely. */
export const WithoutIndicator: Story = {
  args: { indicator: false },
};

/** Behavior test: the trigger toggles `aria-expanded` and shows/hides the body. */
export const Toggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { trigger: "Toggle", children: "Panel content" },
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Toggle" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText("Panel content")).toBeVisible();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};
