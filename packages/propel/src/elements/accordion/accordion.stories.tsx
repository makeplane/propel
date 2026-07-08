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
  AccordionTriggerIcon,
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
    AccordionTriggerIcon,
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

// A title long enough to wrap onto several lines inside the framed 474px canvas — exercises
// `accordionTriggerTitleVariants` (`min-w-0 flex-1`): the label grows, wraps, and shrinks rather
// than pushing the trailing caret off the row.
const LONG_TITLE =
  "Can I connect Plane to my existing tools and migrate all of my historical project data without losing the relationships between issues, cycles, and modules?";

/**
 * The full anatomy assembled statically: `Accordion` › `AccordionItem` › `AccordionHeader` ›
 * `AccordionTrigger` (leading `AccordionTriggerIcon` wrapping the internal `Icon`, growing
 * `AccordionTriggerTitle`, trailing internal `DisclosureIndicator`), plus `AccordionPanel` ›
 * `AccordionPanelContent` (the padding lives on the content so the panel's height animation
 * measures cleanly). The first item is pinned open: `data-panel-open=""` on the trigger rotates the
 * caret (the trigger carries `group`; the indicator reads `group-data-panel-open`) and its panel
 * renders — closed items render no panel, matching Base UI's unmount-while-closed default.
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
                <AccordionTriggerIcon>
                  <Icon tint="secondary">
                    <CircleHelp />
                  </Icon>
                </AccordionTriggerIcon>
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
          {/* Real accordions disable at the ITEM, so Base UI sets `data-disabled`/`aria-disabled`
              (the trigger stays focusable) — NOT the native `disabled` attribute. Pin that spelling
              so the dimming reflects what ships. */}
          <AccordionTrigger data-disabled="" aria-disabled aria-expanded={false}>
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

    // The compiled `data-disabled:opacity-60` selector dims the disabled row even though Base UI
    // uses `data-disabled` (not the native `disabled` attribute), so `:disabled` alone wouldn't fire.
    const disabled = canvas.getByRole("button", { name: "Disabled" });
    await expect(Number(getComputedStyle(disabled).opacity)).toBeLessThan(1);
  },
};

/**
 * The same anatomy under `dir="rtl"`: the leading `Icon` and the growing title flip to the
 * inline-start (right) edge and the `DisclosureIndicator` to the inline-end (left). The caret's
 * `motion="disclose"` selectors are RTL-mirrored — the closed row's caret points inline-end (left,
 * `rtl:rotate-90`) while the open row's points down (`rtl:group-data-panel-open:rotate-0`).
 */
export const RTL: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div dir="rtl">
      <Accordion>
        <AccordionItem>
          <AccordionHeader>
            <AccordionTrigger aria-expanded data-panel-open="">
              <Icon tint="secondary">
                <CircleHelp />
              </Icon>
              <AccordionTriggerTitle>Open — caret points down</AccordionTriggerTitle>
              <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
                <ChevronDown />
              </DisclosureIndicator>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionPanelContent>
              The panel content, laid out right-to-left.
            </AccordionPanelContent>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader>
            <AccordionTrigger aria-expanded={false}>
              <Icon tint="secondary">
                <CircleHelp />
              </Icon>
              <AccordionTriggerTitle>Closed — caret points inline-end</AccordionTriggerTitle>
              <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
                <ChevronDown />
              </DisclosureIndicator>
            </AccordionTrigger>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the caret's RTL-mirrored selectors compiled — a closed caret
 * rotates the opposite way under `dir="rtl"` (`rtl:rotate-90`) than under LTR (`-rotate-90`).
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const RTLCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <Accordion>
        <AccordionItem>
          <AccordionHeader>
            <AccordionTrigger aria-expanded={false}>
              <AccordionTriggerTitle>LTR closed</AccordionTriggerTitle>
              <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
                <ChevronDown />
              </DisclosureIndicator>
            </AccordionTrigger>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
      <div dir="rtl">
        <Accordion>
          <AccordionItem>
            <AccordionHeader>
              <AccordionTrigger aria-expanded={false}>
                <AccordionTriggerTitle>RTL closed</AccordionTriggerTitle>
                <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
                  <ChevronDown />
                </DisclosureIndicator>
              </AccordionTrigger>
            </AccordionHeader>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  ),
  play: async ({ canvas }) => {
    const caretRotate = (name: string) => {
      const caret = canvas.getByRole("button", { name }).querySelector("[aria-hidden]");
      if (!(caret instanceof HTMLElement)) throw new Error(`missing caret in "${name}" trigger`);
      return getComputedStyle(caret).rotate;
    };
    // The compiled `rtl:rotate-90` selector mirrors the closed caret away from LTR's `-rotate-90`.
    await expect(caretRotate("LTR closed")).not.toBe(caretRotate("RTL closed"));
  },
};

/**
 * A trigger whose title is too long for one line: `accordionTriggerTitleVariants` (`min-w-0
 * flex-1`) wraps it onto multiple lines and keeps it from shoving the trailing caret past the row's
 * edge. The leading icon and caret stay centered against the wrapped block.
 */
export const LongText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded data-panel-open="">
            <Icon tint="secondary">
              <CircleHelp />
            </Icon>
            <AccordionTriggerTitle>{LONG_TITLE}</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          <AccordionPanelContent>
            The panel body sits below the wrapped multi-line title.
          </AccordionPanelContent>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
};

/**
 * CSS canary (rule 2b): asserts the title's `min-w-0 flex-1` actually wraps — a long title makes
 * its row taller than a short one (multi-line), while `min-w-0` keeps the wrapped title from
 * pushing the row wider than its container (no horizontal overflow). Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const LongTextCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  render: () => (
    <Accordion>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded={false}>
            <AccordionTriggerTitle>Short</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
      </AccordionItem>
      <AccordionItem>
        <AccordionHeader>
          <AccordionTrigger aria-expanded={false}>
            <AccordionTriggerTitle>{LONG_TITLE}</AccordionTriggerTitle>
            <DisclosureIndicator motion="disclose" tint="secondary" magnitude="sm">
              <ChevronDown />
            </DisclosureIndicator>
          </AccordionTrigger>
        </AccordionHeader>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvas }) => {
    const short = canvas.getByRole("button", { name: "Short" });
    const long = canvas.getByRole("button", { name: LONG_TITLE });
    // The long title wraps onto multiple lines, making its row taller than the single-line row…
    await expect(long.clientHeight).toBeGreaterThan(short.clientHeight);
    // …while `min-w-0` keeps the wrapped title from pushing the row wider than its container.
    await expect(long.scrollWidth).toBeLessThanOrEqual(long.clientWidth);
  },
};
