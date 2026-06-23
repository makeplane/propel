import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
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
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuTriggerLabel,
  NavigationMenuViewport,
} from "./index";

// UI-tier story: assembles the ATOMIC navigation-menu parts by hand — Root › List › Item(s), then
// the shared Portal › Positioner › Popup › Viewport surface. The components-tier story uses the
// ready-made `NavigationMenuPanel` to collapse that portal chain into one part.
const meta = {
  title: "UI/NavigationMenu",
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
    NavigationMenuViewport,
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
      <NavigationMenuLink variant="card" render={<a href={href} onClick={cancelNavigation} />}>
        <NavigationMenuLinkTitle>{title}</NavigationMenuLinkTitle>
        <NavigationMenuLinkDescription>{description}</NavigationMenuLinkDescription>
      </NavigationMenuLink>
    </li>
  );
}

/** A trigger row that pairs the label with the rotating disclosure caret. */
function NavigationMenuTriggerRow({ children }: { children: React.ReactNode }) {
  return (
    <NavigationMenuTrigger>
      <NavigationMenuTriggerLabel>{children}</NavigationMenuTriggerLabel>
      <NavigationMenuIcon>
        <ChevronDown aria-hidden />
      </NavigationMenuIcon>
    </NavigationMenuTrigger>
  );
}

/** A menu with two dropdown items and a bare top-level link. */
export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTriggerRow>Product</NavigationMenuTriggerRow>
          <NavigationMenuContent>
            <ul className="grid w-md grid-cols-2 gap-1 p-2">
              {PRODUCT_LINKS.map((item) => (
                <ContentLink key={item.href} {...item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTriggerRow>Resources</NavigationMenuTriggerRow>
          <NavigationMenuContent>
            <NavigationMenuContentList>
              {RESOURCE_LINKS.map((item) => (
                <ContentLink key={item.href} {...item} />
              ))}
            </NavigationMenuContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink
            variant="item"
            render={<a href="#pricing" onClick={cancelNavigation} />}
          >
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={6}>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  ),
};

/**
 * Behavior test: hovering/clicking a trigger opens its content in the shared popup; the content's
 * links are reachable by their unique text once open.
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
          <NavigationMenuTriggerRow>Product</NavigationMenuTriggerRow>
          <NavigationMenuContent>
            <NavigationMenuContentList>
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink
                    variant="card"
                    render={<a href={item.href} onClick={cancelNavigation} />}
                  >
                    <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                  </NavigationMenuLink>
                </li>
              ))}
            </NavigationMenuContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPortal>
        <NavigationMenuPositioner sideOffset={6}>
          <NavigationMenuPopup>
            <NavigationMenuViewport />
          </NavigationMenuPopup>
        </NavigationMenuPositioner>
      </NavigationMenuPortal>
    </NavigationMenu>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: /Product/ });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    // Clicking the trigger opens its content; the popup is portaled, so query the document body.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await waitFor(async () => {
      await expect(document.body).toHaveTextContent("Cycles");
    });
  },
};
