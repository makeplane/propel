import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { expect } from "storybook/test";

import {
  Collapsible,
  CollapsiblePanel,
  CollapsiblePanelContent,
  CollapsibleTrigger,
  CollapsibleTriggerIndicator,
  CollapsibleTriggerTitle,
} from "./index";

// UI-tier story: composes the ATOMIC collapsible parts (Root › Trigger / Panel). Each part renders a
// single element and owns its own chrome (no `className` at the boundary), so the trigger lays its
// title and indicator out itself and the panel insets its content via `CollapsiblePanelContent`. The
// components-tier `Collapsible` story shows the ready-made `<Collapsible trigger=…>` wrapper.
const meta = {
  title: "UI/Collapsible",
  component: Collapsible,
  subcomponents: {
    CollapsibleTrigger,
    CollapsibleTriggerTitle,
    CollapsibleTriggerIndicator,
    CollapsiblePanel,
    CollapsiblePanelContent,
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

/** Assemble the atomic parts: Root › Trigger (title + indicator), plus Panel › PanelContent. */
export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>
        <CollapsibleTriggerTitle>Recent activity</CollapsibleTriggerTitle>
        <CollapsibleTriggerIndicator>
          <ChevronDown />
        </CollapsibleTriggerIndicator>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>3 work items updated in the last hour.</CollapsiblePanelContent>
      </CollapsiblePanel>
    </Collapsible>
  ),
};

/** `defaultOpen` renders the panel expanded on mount. */
export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>
        <CollapsibleTriggerTitle>Description</CollapsibleTriggerTitle>
        <CollapsibleTriggerIndicator>
          <ChevronDown />
        </CollapsibleTriggerIndicator>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>
          The roadmap groups upcoming work into quarterly milestones.
        </CollapsiblePanelContent>
      </CollapsiblePanel>
    </Collapsible>
  ),
};

/** Without an indicator — the trigger is adjustable content; the indicator is optional. */
export const WithoutIndicator: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>
        <CollapsibleTriggerTitle>Toggle section</CollapsibleTriggerTitle>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>Content with no caret in the trigger.</CollapsiblePanelContent>
      </CollapsiblePanel>
    </Collapsible>
  ),
};

/** Behavior test: the trigger toggles `aria-expanded` and shows/hides the panel. */
export const Toggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>
        <CollapsibleTriggerTitle>Toggle</CollapsibleTriggerTitle>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>Panel content</CollapsiblePanelContent>
      </CollapsiblePanel>
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
