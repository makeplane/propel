import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "./index";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  subcomponents: { AccordionItem, AccordionTrigger, AccordionPanel },
  tags: ["ai-generated"],
  // Give the centered canvas a sensible width so the full-width accordion has room.
  decorators: [
    (Story) => (
      <div className="w-[474px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2053-281",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const ITEMS = [
  {
    value: "what",
    label: "What is Plane?",
    body: "Plane is an open-source project management tool for tracking issues, sprints, and product roadmaps.",
  },
  {
    value: "pricing",
    label: "How does pricing work?",
    body: "Plane is free to self-host. Managed plans add hosting, backups, and support.",
  },
  {
    value: "import",
    label: "Can I import my existing data?",
    body: "Yes — Plane can import work items from common trackers so you can migrate without losing history.",
  },
];

/** The default single-open accordion: opening one item collapses the others. */
export const Default: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={["what"]}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.label}</AccordionTrigger>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/** With `multiple`, several panels can stay open at the same time. */
export const MultipleItems: Story = {
  args: { multiple: true },
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Accordion {...args} defaultValue={["what", "pricing"]}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.label}</AccordionTrigger>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/**
 * Behavior test: clicking a collapsed trigger expands its panel and flips
 * `aria-expanded` to true (a `region` appears); clicking again collapses it.
 */
export const Interaction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Accordion>
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionPanel>Panel A content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Section A" });
    // Starts collapsed: no expanded state and the trigger controls nothing yet.
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).not.toHaveAttribute("aria-controls");

    // Click expands: aria-expanded flips and the trigger now points at its panel
    // region (Base UI sets aria-controls only while open).
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const panelId = trigger.getAttribute("aria-controls");
    await expect(panelId).toBeTruthy();
    // The controlled panel is a `region` exposing the item's content.
    const region = canvas.getByRole("region", { name: "Section A" });
    await expect(region).toHaveAttribute("id", panelId);

    // Click again collapses.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};
