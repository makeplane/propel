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

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the `data-*`/aria
// attributes Base UI's collapsible would set (`data-panel-open=""` on the trigger,
// `data-starting-style=""`/`data-ending-style=""` on the panel) or the native `disabled`
// attribute. The collapsible is a structural disclosure primitive with no variant axes (see
// variants.ts), so the state matrix IS the whole configuration space. The Root is behavior-only
// (it renders no element), so it has no styled part here. Grafting, keyboard, and aria behavior
// are demonstrated and tested in the components-tier story (Components/Collapsible).
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

/**
 * The full anatomy assembled statically: `CollapsibleTrigger` (growing `CollapsibleTriggerTitle`,
 * trailing internal `DisclosureIndicator`), plus `CollapsiblePanel` › `CollapsiblePanelContent`
 * (the padding lives on the content so the panel's height animation measures cleanly). The
 * disclosure is pinned open: `data-panel-open=""` on the trigger rotates the caret (the trigger
 * carries `group`; the indicator reads `group-data-panel-open`) and the panel renders — a closed
 * disclosure renders no panel, matching Base UI's unmount-while-closed default.
 */
export const Default: Story = {
  render: () => (
    <div>
      <CollapsibleTrigger aria-expanded data-panel-open="">
        <CollapsibleTriggerTitle>Recent activity</CollapsibleTriggerTitle>
        <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
          <ChevronDown />
        </DisclosureIndicator>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>3 work items updated in the last hour.</CollapsiblePanelContent>
      </CollapsiblePanel>
    </div>
  ),
};

/** Without an indicator — the trigger content is adjustable; the disclosure caret is optional. */
export const WithoutIndicator: Story = {
  render: () => (
    <div>
      <CollapsibleTrigger aria-expanded data-panel-open="">
        <CollapsibleTriggerTitle>Toggle section</CollapsibleTriggerTitle>
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <CollapsiblePanelContent>Content with no caret in the trigger.</CollapsiblePanelContent>
      </CollapsiblePanel>
    </div>
  ),
};

/**
 * Every pinnable state side by side:
 *
 * - **Closed** — the resting row; the caret points inline-end (`-rotate-90`, RTL-mirrored) and no
 *   panel renders.
 * - **Open** — `data-panel-open=""` rotates the caret to point down and the panel shows at its
 *   natural height.
 * - **Panel entering** — `data-starting-style=""` pins the panel at the height-0 endpoint of its
 *   open/close transition, so the row looks closed while the caret already points down.
 * - **Panel exiting** — `data-ending-style=""` pins the same height-0 endpoint on the way closed;
 *   Base UI has already dropped `data-panel-open`, so the caret rests inline-end again.
 * - **Disabled** — the native `disabled` attribute dims the row and swaps the cursor.
 *
 * Hover and focus-visible are CSS pseudo-classes, not attributes, so they cannot be pinned here.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <CollapsibleTrigger aria-expanded={false}>
          <CollapsibleTriggerTitle>Closed</CollapsibleTriggerTitle>
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </CollapsibleTrigger>
      </div>
      <div>
        <CollapsibleTrigger aria-expanded data-panel-open="">
          <CollapsibleTriggerTitle>Open</CollapsibleTriggerTitle>
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <CollapsiblePanelContent>
            The expanded panel at its natural height.
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </div>
      <div>
        <CollapsibleTrigger aria-expanded data-panel-open="">
          <CollapsibleTriggerTitle>Panel entering</CollapsibleTriggerTitle>
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </CollapsibleTrigger>
        <CollapsiblePanel data-starting-style="">
          <CollapsiblePanelContent>
            Pinned at the height-0 transition endpoint.
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </div>
      <div>
        <CollapsibleTrigger aria-expanded={false}>
          <CollapsibleTriggerTitle>Panel exiting</CollapsibleTriggerTitle>
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </CollapsibleTrigger>
        <CollapsiblePanel data-ending-style="">
          <CollapsiblePanelContent>
            Pinned at the height-0 transition endpoint.
          </CollapsiblePanelContent>
        </CollapsiblePanel>
      </div>
      <div>
        <CollapsibleTrigger disabled aria-expanded={false}>
          <CollapsibleTriggerTitle>Disabled</CollapsibleTriggerTitle>
          <DisclosureIndicator motion="disclose" tint="secondary" magnitude="inherit">
            <ChevronDown />
          </DisclosureIndicator>
        </CollapsibleTrigger>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-panel-open` trigger rotates its caret relative to the closed one, and the
 * `data-starting-style`/`data-ending-style` panels compute to height 0. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, canvasElement }) => {
    const caretRotate = (name: string) => {
      const caret = canvas.getByRole("button", { name }).querySelector("[aria-hidden]");
      if (!(caret instanceof HTMLElement)) throw new Error(`missing caret in "${name}" trigger`);
      return getComputedStyle(caret).rotate;
    };
    // The compiled `group-data-panel-open:rotate-0` selector rotates the open caret away from the
    // closed caret's resting `-rotate-90`.
    await expect(caretRotate("Open")).not.toBe(caretRotate("Closed"));

    // The compiled `data-starting-style:h-0` / `data-ending-style:h-0` selectors pin the
    // entering and exiting panels at height 0.
    for (const selector of ["[data-starting-style]", "[data-ending-style]"]) {
      const panel = canvasElement.querySelector(selector);
      if (!(panel instanceof HTMLElement)) {
        throw new Error(`missing pinned ${selector} panel`);
      }
      await expect(getComputedStyle(panel).height).toBe("0px");
    }
  },
};
