import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import { expect } from "storybook/test";

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./index";

// UI-tier story: composes the ATOMIC accordion parts (each renders a single element).
// The components-tier `Accordion` story shows the ready-made trigger (auto chevron) and
// padded panel. Here you assemble the raw parts and supply your own chevron / panel padding.
const meta = {
  title: "UI/Accordion",
  component: Accordion,
  subcomponents: { AccordionItem, AccordionHeader, AccordionTrigger, AccordionPanel },
  decorators: [
    (Story) => (
      <div className="w-[474px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  { value: "what", label: "What is Plane?", body: "An open-source project management tool." },
  { value: "pricing", label: "How does pricing work?", body: "Free to self-host." },
  { value: "import", label: "Can I import my data?", body: "Yes, from common trackers." },
];

/** Assemble the atomic parts: Root › Item › Header › Trigger, plus Panel. */
export const Default: Story = {
  render: () => (
    <Accordion>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>
              <span className="flex-1">{item.label}</span>
              <ChevronDown
                aria-hidden
                className="size-3.5 shrink-0 text-icon-secondary transition-transform group-data-panel-open:rotate-180"
              />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <div className="px-3 pb-3 text-14 text-secondary">{item.body}</div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
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
    <Accordion multiple defaultValue={["what", "pricing"]}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>
              <span className="flex-1">{item.label}</span>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <div className="px-3 pb-3 text-14 text-secondary">{item.body}</div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
