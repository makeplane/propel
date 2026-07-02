import type { Meta, StoryObj } from "@storybook/react-vite";
import type * as React from "react";
import { expect, waitFor } from "storybook/test";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentList,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuTrigger,
  NavigationMenuTriggerLabel,
  NavigationMenuViewport,
} from "./index";

// Components-tier story: every part is a ready-made — the root `NavigationMenu`, the
// `NavigationMenuList`/`NavigationMenuItem` row, the `NavigationMenuTrigger` (caret baked in),
// per-item `NavigationMenuContent`, `NavigationMenuLink`, and the `NavigationMenuPanel` (Portal ›
// Positioner › Popup) with `NavigationMenuViewport` nested inside — so nothing is hand-wired from
// Base UI. The elements-tier story assembles the behavior chain by hand.
const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  subcomponents: {
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuTriggerLabel,
    NavigationMenuIcon,
    NavigationMenuContent,
    NavigationMenuContentList,
    NavigationMenuLink,
    NavigationMenuLinkTitle,
    NavigationMenuLinkDescription,
    NavigationMenuPanel,
    NavigationMenuViewport,
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

/** A rich content link pairing a title with a description, wrapped in its list item. */
function ContentLink({ href, title, description }: (typeof PRODUCT_LINKS)[number]) {
  return (
    <li>
      <NavigationMenuLink href={href} presentation="card" onClick={cancelNavigation}>
        <NavigationMenuLinkTitle>{title}</NavigationMenuLinkTitle>
        <NavigationMenuLinkDescription>{description}</NavigationMenuLinkDescription>
      </NavigationMenuLink>
    </li>
  );
}

/** Two menu items plus a bare top-level link, opening into the shared `NavigationMenuPanel`. */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuContentList>
              {PRODUCT_LINKS.map((item) => (
                <ContentLink key={item.href} {...item} />
              ))}
            </NavigationMenuContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuContentList>
              {RESOURCE_LINKS.map((item) => (
                <ContentLink key={item.href} {...item} />
              ))}
            </NavigationMenuContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" presentation="item" onClick={cancelNavigation}>
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
export const DefaultInteraction: Story = {
  ...Default,
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

/**
 * The link's two presentations side by side: `item` is a top-level pill beside the triggers; `card`
 * stacks a `NavigationMenuLinkTitle` over an optional `NavigationMenuLinkDescription` inside a
 * content panel.
 */
export const Presentations: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" presentation="item" onClick={cancelNavigation}>
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs" presentation="card" onClick={cancelNavigation}>
            <NavigationMenuLinkTitle>Documentation</NavigationMenuLinkTitle>
            <NavigationMenuLinkDescription>
              Guides and API references.
            </NavigationMenuLinkDescription>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/** Behavior test: both presentations render real, named links with their hrefs intact. */
export const PresentationsInteraction: Story = {
  ...Presentations,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const item = canvas.getByRole("link", { name: "Pricing" });
    await expect(item).toHaveAttribute("href", "#pricing");

    const card = canvas.getByRole("link", { name: /Documentation/ });
    await expect(card).toHaveAttribute("href", "#docs");
    await expect(card).toHaveTextContent("Guides and API references.");
  },
};
