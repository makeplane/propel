import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, CircleHelp } from "lucide-react";
import { expect } from "storybook/test";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionPanelContent,
  AccordionTrigger,
  AccordionTriggerIcon,
  AccordionTriggerIndicator,
  AccordionTriggerTitle,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// accordion behavior parts graft them via `render`. This composes the ATOMIC parts (each renders a
// single element) — the title, the disclosure indicator, and the panel's padded content are their
// own parts, so the trigger and panel hold no raw layout. The components-tier `Accordion` story
// shows the ready-made trigger (auto title + chevron) and padded panel.
const meta = {
  title: "Elements/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionTriggerIcon,
    AccordionTriggerTitle,
    AccordionTriggerIndicator,
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
    value: "what",
    label: "What is Plane?",
    body: "An open-source project management tool.",
  },
  {
    value: "pricing",
    label: "How does pricing work?",
    body: "Free to self-host.",
  },
  {
    value: "import",
    label: "Can I import my data?",
    body: "Yes, from common trackers.",
  },
];

/** Assemble the atomic parts: Root › Item › Header › Trigger, plus Panel. */
export const Default: Story = {
  render: () => (
    <BaseAccordion.Root render={<Accordion />}>
      {ITEMS.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} render={<AccordionItem />}>
          <BaseAccordion.Header render={<AccordionHeader />}>
            <BaseAccordion.Trigger render={<AccordionTrigger />}>
              <AccordionTriggerIcon>
                <CircleHelp />
              </AccordionTriggerIcon>
              <AccordionTriggerTitle>{item.label}</AccordionTriggerTitle>
              <AccordionTriggerIndicator>
                <ChevronDown />
              </AccordionTriggerIndicator>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel render={<AccordionPanel />}>
            <AccordionPanelContent>{item.body}</AccordionPanelContent>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  ),
};

/**
 * Interaction test: clicking a collapsed trigger expands its panel. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag — so a browsing user never
 * sees a panel expand on its own.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const triggers = canvas.getAllByRole("button");
    await expect(triggers[0]).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(triggers[0]);
    await expect(triggers[0]).toHaveAttribute("aria-expanded", "true");
  },
};

/** `multiple` lets several panels stay open at once. */
export const Multiple: Story = {
  render: () => (
    <BaseAccordion.Root multiple defaultValue={["what", "pricing"]} render={<Accordion />}>
      {ITEMS.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} render={<AccordionItem />}>
          <BaseAccordion.Header render={<AccordionHeader />}>
            <BaseAccordion.Trigger render={<AccordionTrigger />}>
              <AccordionTriggerTitle>{item.label}</AccordionTriggerTitle>
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel render={<AccordionPanel />}>
            <AccordionPanelContent>{item.body}</AccordionPanelContent>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  ),
};
