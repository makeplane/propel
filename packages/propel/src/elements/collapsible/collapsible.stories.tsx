import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { expect } from "storybook/test";

import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import {
  CollapsiblePanel,
  CollapsiblePanelContent,
  CollapsibleTrigger,
  CollapsibleTriggerTitle,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// Collapsible behavior parts graft them via `render`. The Root is behavior-only (it lives in
// `components`), so this in-tier story wires `Collapsible.Root`/`Trigger`/`Panel` straight from
// `@base-ui/react`. The components-tier `Collapsible` story shows the ready-made wrapper.
const meta = {
  title: "Elements/Collapsible",
  component: CollapsibleTrigger,
  subcomponents: {
    CollapsibleTriggerTitle,
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
} satisfies Meta<typeof CollapsibleTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: Root › Trigger (title + indicator), plus Panel › PanelContent. */
export const Default: Story = {
  render: () => (
    <BaseCollapsible.Root>
      <BaseCollapsible.Trigger render={<CollapsibleTrigger />}>
        <CollapsibleTriggerTitle>Recent activity</CollapsibleTriggerTitle>
        <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
          <ChevronDown />
        </DisclosureIndicator>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel render={<CollapsiblePanel />}>
        <CollapsiblePanelContent>3 work items updated in the last hour.</CollapsiblePanelContent>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  ),
};

/** `defaultOpen` renders the panel expanded on mount. */
export const DefaultOpen: Story = {
  render: () => (
    <BaseCollapsible.Root defaultOpen>
      <BaseCollapsible.Trigger render={<CollapsibleTrigger />}>
        <CollapsibleTriggerTitle>Description</CollapsibleTriggerTitle>
        <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
          <ChevronDown />
        </DisclosureIndicator>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel render={<CollapsiblePanel />}>
        <CollapsiblePanelContent>
          The roadmap groups upcoming work into quarterly milestones.
        </CollapsiblePanelContent>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  ),
};

/** Without an indicator — the trigger is adjustable content; the indicator is optional. */
export const WithoutIndicator: Story = {
  render: () => (
    <BaseCollapsible.Root>
      <BaseCollapsible.Trigger render={<CollapsibleTrigger />}>
        <CollapsibleTriggerTitle>Toggle section</CollapsibleTriggerTitle>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel render={<CollapsiblePanel />}>
        <CollapsiblePanelContent>Content with no caret in the trigger.</CollapsiblePanelContent>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
  ),
};

/** Behavior test: the trigger toggles `aria-expanded` and shows/hides the panel. */
export const Toggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseCollapsible.Root>
      <BaseCollapsible.Trigger render={<CollapsibleTrigger />}>
        <CollapsibleTriggerTitle>Toggle</CollapsibleTriggerTitle>
      </BaseCollapsible.Trigger>
      <BaseCollapsible.Panel render={<CollapsiblePanel />}>
        <CollapsiblePanelContent>Panel content</CollapsiblePanelContent>
      </BaseCollapsible.Panel>
    </BaseCollapsible.Root>
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
