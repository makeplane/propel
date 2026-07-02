import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, CircleHelp } from "lucide-react";
import { expect } from "storybook/test";

import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionPanelContent,
  AccordionTrigger,
  AccordionTriggerTitle,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with every visual state pinned statically via the `data-*`/aria
// attributes Base UI's accordion would set (`data-panel-open=""` on the trigger,
// `data-starting-style=""` on the panel) or the native `disabled` attribute. The accordion is a
// structural disclosure primitive with no variant axes (see variants.ts), so the state matrix IS
// the whole configuration space. Grafting, keyboard, and aria behavior are demonstrated and tested
// in the components-tier story (Components/Accordion).
const meta = {
  title: "Elements/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionTriggerTitle,
    AccordionPanel,
    AccordionPanelContent,
  },
  decorators: [
    (Story) => (
      <div className="w-118.5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  {
    label: "What is Plane?",
    body: "An open-source project management tool.",
  },
  {
    label: "How does pricing work?",
    body: "Free to self-host.",
  },
  {
    label: "Can I import my data?",
    body: "Yes, from common trackers.",
  },
];

/**
 * The full anatomy assembled statically: `Accordion` › `AccordionItem` › `AccordionHeader` ›
 * `AccordionTrigger` (leading internal `Icon`, growing `AccordionTriggerTitle`, trailing internal
 * `DisclosureIndicator`), plus `AccordionPanel` › `AccordionPanelContent` (the padding lives on the
 * content so the panel's height animation measures cleanly). The first item is pinned open:
 * `data-panel-open=""` on the trigger rotates the caret (the trigger carries `group`; the indicator
 * reads `group-data-panel-open`) and its panel renders — closed items render no panel, matching
 * Base UI's unmount-while-closed default.
 */
export const Default: Story = {
  render: () => (
    <Accordion>
      {ITEMS.map((item, index) => {
        const open = index === 0;
        return (
          <AccordionItem key={item.label}>
            <AccordionHeader>
              <AccordionTrigger aria-expanded={open} data-panel-open={open ? "" : undefined}>
                <Icon tint="secondary">
                  <CircleHelp />
                </Icon>
                <AccordionTriggerTitle>{item.label}</AccordionTriggerTitle>
                <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
                  <ChevronDown />
                </DisclosureIndicator>
              </AccordionTrigger>
            </AccordionHeader>
            {open ? (
              <AccordionPanel>
                <AccordionPanelContent>{item.body}</AccordionPanelContent>
              </AccordionPanel>
            ) : null}
          </AccordionItem>
        );
      })}
    </Accordion>
  ),
};

/**
 * Every pinnable state side by side, in one `Accordion` frame:
 *
 * - **Closed** — the resting row; the caret points inline-end (`-rotate-90`, RTL-mirrored).
 * - **Open** — `data-panel-open=""` rotates the caret to point down and the panel shows at its
 *   natural height.
 * - **Panel entering** — `data-starting-style=""` pins the panel at the height-0 endpoint of its
 *   open/close transition, so the row looks closed while the caret already points down.
 * - **Panel exiting** — `data-ending-style=""` pins the same height-0 endpoint on the way closed;
 *   Base UI has already dropped `data-panel-open`, so the caret rests inline-end again.
 * - **Disabled** — the native `disabled` attribute dims the row and swaps the cursor.
 *
 * Hover and focus-visible are CSS pseudo-classes, not attributes, so they cannot be pinned here —
 * the components-tier `States` story forces them with the pseudo-states addon.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded={false}>
            <AccordionTriggerTitle>Closed</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded data-panel-open="">
            <AccordionTriggerTitle>Open</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          <AccordionPanelContent>The expanded panel at its natural height.</AccordionPanelContent>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded data-panel-open="">
            <AccordionTriggerTitle>Panel entering</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel data-starting-style="">
          <AccordionPanelContent>Pinned at the height-0 transition endpoint.</AccordionPanelContent>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded={false}>
            <AccordionTriggerTitle>Panel exiting</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel data-ending-style="">
          <AccordionPanelContent>Pinned at the height-0 transition endpoint.</AccordionPanelContent>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger disabled aria-expanded={false}>
            <AccordionTriggerTitle>Disabled</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
      </AccordionItem>
    </Accordion>
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
