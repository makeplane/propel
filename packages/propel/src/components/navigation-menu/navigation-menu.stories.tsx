import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { expect, waitFor } from "storybook/test";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./index";

// Components-tier story: the ready-made `NavigationMenuPanel` collapses the Portal › Positioner ›
// Popup surface into one part, so the consumer only nests `NavigationMenuViewport` inside it. The
// UI-tier story assembles that portal chain by hand.
const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  subcomponents: {
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuPanel,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2053-281",
    },
  },
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const PRODUCT_LINKS = [
  {
    href: "#issues",
    title: "Issues",
    description: "Track work items across projects.",
  },
  {
    href: "#cycles",
    title: "Cycles",
    description: "Time-boxed sprints for your team.",
  },
  {
    href: "#modules",
    title: "Modules",
    description: "Group related work into modules.",
  },
  {
    href: "#pages",
    title: "Pages",
    description: "Rich documents that live with your work.",
  },
];

const RESOURCE_LINKS = [
  {
    href: "#docs",
    title: "Documentation",
    description: "Guides and API references.",
  },
  {
    href: "#changelog",
    title: "Changelog",
    description: "What shipped recently.",
  },
];

// The demo links carry real hrefs for correct anchor semantics, but cancel navigation:
// the Vitest browser runner shares one page across story files, so an activated link
// navigates the page, tears down the iframe, and fails unrelated stories.
const cancelNavigation = (event: React.MouseEvent) => event.preventDefault();

/** Two dropdown items plus a bare top-level link, opening into the shared `NavigationMenuPanel`. */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <TriggerRow>Product</TriggerRow>
          <NavigationMenuContent>
            <ul className="grid w-md grid-cols-2 gap-1 p-2">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink render={<a href={item.href} onClick={cancelNavigation} />}>
                    <span className="block text-14 font-medium text-primary">{item.title}</span>
                    <span className="block text-12 text-tertiary">{item.description}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <TriggerRow>Resources</TriggerRow>
          <NavigationMenuContent>
            <ul className="flex w-72 flex-col gap-1 p-2">
              {RESOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink render={<a href={item.href} onClick={cancelNavigation} />}>
                    <span className="block text-14 font-medium text-primary">{item.title}</span>
                    <span className="block text-12 text-tertiary">{item.description}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink render={<a href="#pricing" onClick={cancelNavigation} />}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPanel>
        <NavigationMenuViewport />
      </NavigationMenuPanel>
    </NavigationMenu>
  ),
};

/**
 * Behavior test: clicking a trigger opens its content into the portaled panel; the content's links
 * become reachable by their unique text once open.
 */
export const OpenContent: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: {
    a11y: {
      // While the popup is open Base UI's NavigationMenu emits two internal patterns that axe flags
      // as static-analysis false-positives:
      //   * `aria-hidden-focus`: the visually-hidden focus-guard `<span tabindex="0" aria-hidden>`
      //     sentinels that bracket the popup to wrap focus — intentional, not author markup.
      //   * `landmark-unique`: the portaled popup renders a second `<nav>` landmark alongside the
      //     root menu's `<nav>`; both are Base UI internals with no author-supplied label.
      // Suppress just these two rules for this open-popup story.
      config: {
        rules: [
          { id: "aria-hidden-focus", enabled: false },
          { id: "landmark-unique", enabled: false },
        ],
      },
    },
  },
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <TriggerRow>Product</TriggerRow>
          <NavigationMenuContent>
            <ul className="flex w-72 flex-col gap-1 p-2">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink render={<a href={item.href} onClick={cancelNavigation} />}>
                    {item.title}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPanel>
        <NavigationMenuViewport />
      </NavigationMenuPanel>
    </NavigationMenu>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /Product/ });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // The popup is portaled, so query the document body after opening.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await waitFor(async () => {
      await expect(document.body).toHaveTextContent("Cycles");
    });
  },
};

/** A trigger row that pairs the label with the rotating disclosure caret. */
function TriggerRow({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenuTrigger>
      {children}
      <NavigationMenuIcon>
        <ChevronDown aria-hidden />
      </NavigationMenuIcon>
    </NavigationMenuTrigger>
  );
}
