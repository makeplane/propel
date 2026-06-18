import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { expect } from "storybook/test";

import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "./index";

// UI-tier story: composes the ATOMIC collapsible parts (Root › Trigger / Panel). Each part owns its
// own chrome (no `className` at the boundary), so the trigger lays its label and chevron out itself.
// The components-tier `Collapsible` story shows the ready-made `<Collapsible trigger=…>` wrapper.
const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  subcomponents: { CollapsibleTrigger, CollapsiblePanel },
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

/** Assemble the atomic parts: Root › Trigger, plus Panel. */
export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>
        <span className="flex-1">Recent activity</span>
        <ChevronDown
          aria-hidden
          className="size-3.5 shrink-0 text-icon-secondary transition-transform group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="pt-2 text-tertiary">3 work items updated in the last hour.</p>
      </CollapsiblePanel>
    </Collapsible>
  ),
};

/** `defaultOpen` renders the panel expanded on mount. */
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>
        <span className="flex-1">Description</span>
        <ChevronDown
          aria-hidden
          className="size-3.5 shrink-0 text-icon-secondary transition-transform group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <p className="pt-2 text-tertiary">
          The roadmap groups upcoming work into quarterly milestones.
        </p>
      </CollapsiblePanel>
    </Collapsible>
  ),
};

/** Behavior test: the trigger toggles `aria-expanded` and shows/hides the panel. */
export const Toggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsiblePanel>Panel content</CollapsiblePanel>
    </Collapsible>
  ),
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
