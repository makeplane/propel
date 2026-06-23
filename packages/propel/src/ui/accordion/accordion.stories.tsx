import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleHelp } from "lucide-react";
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

// UI-tier story: composes the ATOMIC accordion parts (each renders a single element) —
// the title, the disclosure indicator, and the panel's padded content are their own
// parts, so the trigger and panel hold no raw layout. The components-tier `Accordion`
// story shows the ready-made trigger (auto title + chevron) and padded panel.
const meta = {
  title: "UI/Accordion",
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
              <AccordionTriggerIcon>
                <CircleHelp />
              </AccordionTriggerIcon>
              <AccordionTriggerTitle>{item.label}</AccordionTriggerTitle>
              <AccordionTriggerIndicator />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionPanelContent>{item.body}</AccordionPanelContent>
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
              <AccordionTriggerTitle>{item.label}</AccordionTriggerTitle>
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <AccordionPanelContent>{item.body}</AccordionPanelContent>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};
