import type { Meta, StoryObj } from "@storybook/react-vite";
import { CircleHelp } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../icon";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "./index";

// Design-review convention — when to add a pseudo-states "States" story:
//   * Only components that style interaction via CSS `hover:` / `active:` /
//     `focus-visible:` utilities get a `States` matrix; storybook-addon-pseudo-states
//     can only force CSS pseudo-classes (it rewrites stylesheets), so those are the
//     states it can show. Accordion is the canonical example (see `States` below).
//   * Components with only `focus-visible` styling (checkbox/radio) show a focus
//     column plus their prop-driven states (checked / disabled / error).
//   * Static components with no interaction-state styling (badge / banner / avatar /
//     tooltip-popup) get NO pseudo-states story.
//   * Base UI `data-checked` / `data-disabled` states are NOT forced by the
//     pseudo addon — those are attribute selectors, not pseudo-classes — so they must
//     be shown via real props, not the `pseudo` parameter.
const meta = {
  title: "Components/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionPanel,
  },
  // Give the centered canvas a sensible width so the full-width accordion has room.
  decorators: [
    (Story) => (
      <div className="w-118.5">
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
          <AccordionHeader>
            <AccordionTrigger label={item.label} />
          </AccordionHeader>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/** Each trigger can carry a `icon`, matching the Figma header icon. */
export const WithIcon: Story = {
  render: (args) => (
    <Accordion {...args} defaultValue={["what"]}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger
              icon={<Icon icon={CircleHelp} tint="secondary" />}
              label={item.label}
            />
          </AccordionHeader>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/**
 * The trigger's interaction states side by side. The accordion trigger styles interaction purely
 * with CSS utilities (`hover:bg-layer-transparent-hover` and `focus-visible:ring-2
 * focus-visible:ring-accent-strong`), so storybook-addon-pseudo-states can force them statically —
 * no real pointer/keyboard.
 *
 * One accordion with a row per state: each trigger `<button>` carries a unique id (Base UI forwards
 * it from `AccordionTrigger`), and `parameters.pseudo` maps that id to the pseudo-class to force. A
 * single `Accordion` root keeps a single `region` landmark (multiple roots would collide on the axe
 * `landmark-unique` rule). The Hover row should show the transparent-hover background; the Focus
 * row the accent focus ring.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#trigger-hover",
      focusVisible: "#trigger-focus",
    },
  },
  render: () => (
    <Accordion>
      {(
        [
          ["Default", "trigger-default"],
          ["Hover", "trigger-hover"],
          ["Focus-visible", "trigger-focus"],
        ] as const
      ).map(([label, id]) => (
        <AccordionItem key={label} value={id}>
          <AccordionHeader>
            <AccordionTrigger id={id} label={`${label} — What is Plane?`} />
          </AccordionHeader>
          <AccordionPanel>Plane is an open-source project management tool.</AccordionPanel>
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
          <AccordionHeader>
            <AccordionTrigger label={item.label} />
          </AccordionHeader>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/**
 * Behavior test: clicking a collapsed trigger expands its panel and flips `aria-expanded` to true
 * (a `region` appears); clicking again collapses it.
 */
export const Interaction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Accordion>
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger label="Section A" />
        </AccordionHeader>
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

/**
 * Behavior twin of `MultipleItems`: with `multiple`, both `defaultValue` items start expanded at
 * once, opening a third keeps the first two open (single-open mode would collapse them), and each
 * item still collapses independently.
 */
export const MultipleItemsInteraction: Story = {
  ...MultipleItems,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const what = canvas.getByRole("button", { name: "What is Plane?" });
    const pricing = canvas.getByRole("button", { name: "How does pricing work?" });
    const importData = canvas.getByRole("button", { name: "Can I import my existing data?" });

    // Both defaultValue items start expanded simultaneously.
    await expect(what).toHaveAttribute("aria-expanded", "true");
    await expect(pricing).toHaveAttribute("aria-expanded", "true");
    await expect(importData).toHaveAttribute("aria-expanded", "false");

    // Opening the third item leaves the other two open.
    await userEvent.click(importData);
    await expect(importData).toHaveAttribute("aria-expanded", "true");
    await expect(what).toHaveAttribute("aria-expanded", "true");
    await expect(pricing).toHaveAttribute("aria-expanded", "true");

    // Each item collapses independently without affecting its siblings.
    await userEvent.click(what);
    await expect(what).toHaveAttribute("aria-expanded", "false");
    await expect(pricing).toHaveAttribute("aria-expanded", "true");
    await expect(importData).toHaveAttribute("aria-expanded", "true");
  },
};

/**
 * Keyboard ARIA pattern (WAI-ARIA accordion): Tab moves focus to the trigger and both **Enter** and
 * **Space** toggle `aria-expanded`, showing/hiding the panel region. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardToggle: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Accordion>
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger label="Section A" />
        </AccordionHeader>
        <AccordionPanel>Panel A content</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Section A" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Tab moves focus to the trigger.
    await userEvent.tab();
    await expect(trigger).toHaveFocus();

    // Enter expands the panel (a region appears with the item's content).
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("region", { name: "Section A" })).toBeVisible();

    // Enter again collapses it.
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Space toggles too: expand…
    await userEvent.keyboard(" ");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    // …and collapse.
    await userEvent.keyboard(" ");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  },
};
