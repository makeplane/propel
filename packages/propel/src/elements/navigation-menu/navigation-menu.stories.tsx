import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { expect, waitFor } from "storybook/test";

import {
  NavigationMenuContentList,
  NavigationMenuIcon,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuTrigger,
  NavigationMenuTriggerLabel,
  NavigationMenuViewport,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Root, portal, positioner, item, and content are
// behavior/structural roles (they live in `components` or are Base UI's directly), so this in-tier
// story wires them straight from `@base-ui/react`. The components-tier story uses the ready-made
// `NavigationMenuPanel` to collapse the portal chain into one part.
const meta = {
  title: "Elements/NavigationMenu",
  component: NavigationMenuPopup,
  subcomponents: {
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuTriggerLabel,
    NavigationMenuIcon,
    NavigationMenuContentList,
    NavigationMenuLink,
    NavigationMenuLinkTitle,
    NavigationMenuLinkDescription,
    NavigationMenuViewport,
  },
} satisfies Meta<typeof NavigationMenuPopup>;

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
      <BaseNavigationMenu.Link
        href={href}
        onClick={cancelNavigation}
        render={<NavigationMenuLink presentation="card" />}
      >
        <NavigationMenuLinkTitle>{title}</NavigationMenuLinkTitle>
        <NavigationMenuLinkDescription>{description}</NavigationMenuLinkDescription>
      </BaseNavigationMenu.Link>
    </li>
  );
}

/** A trigger row that pairs the label with the rotating disclosure caret. */
function TriggerRow({ children }: { children: React.ReactNode }) {
  return (
    <BaseNavigationMenu.Trigger render={<NavigationMenuTrigger />}>
      <NavigationMenuTriggerLabel>{children}</NavigationMenuTriggerLabel>
      <BaseNavigationMenu.Icon render={<NavigationMenuIcon />}>
        <ChevronDown aria-hidden />
      </BaseNavigationMenu.Icon>
    </BaseNavigationMenu.Trigger>
  );
}

/** A menu with two menu items and a bare top-level link. */
export const Default: Story = {
  render: () => (
    <BaseNavigationMenu.Root>
      <BaseNavigationMenu.List render={<NavigationMenuList />}>
        <BaseNavigationMenu.Item>
          <TriggerRow>Product</TriggerRow>
          <BaseNavigationMenu.Content>
            <ul className="grid w-md grid-cols-2 gap-1 p-2">
              {PRODUCT_LINKS.map((item) => (
                <ContentLink key={item.href} {...item} />
              ))}
            </ul>
          </BaseNavigationMenu.Content>
        </BaseNavigationMenu.Item>

        <BaseNavigationMenu.Item>
          <TriggerRow>Resources</TriggerRow>
          <BaseNavigationMenu.Content>
            <NavigationMenuContentList>
              {RESOURCE_LINKS.map((item) => (
                <ContentLink key={item.href} {...item} />
              ))}
            </NavigationMenuContentList>
          </BaseNavigationMenu.Content>
        </BaseNavigationMenu.Item>

        <BaseNavigationMenu.Item>
          <BaseNavigationMenu.Link
            href="#pricing"
            onClick={cancelNavigation}
            render={<NavigationMenuLink presentation="item" />}
          >
            Pricing
          </BaseNavigationMenu.Link>
        </BaseNavigationMenu.Item>
      </BaseNavigationMenu.List>

      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner sideOffset={6}>
          <BaseNavigationMenu.Popup render={<NavigationMenuPopup />}>
            <BaseNavigationMenu.Viewport render={<NavigationMenuViewport />} />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
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
    <BaseNavigationMenu.Root>
      <BaseNavigationMenu.List render={<NavigationMenuList />}>
        <BaseNavigationMenu.Item>
          <TriggerRow>Product</TriggerRow>
          <BaseNavigationMenu.Content>
            <NavigationMenuContentList>
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <BaseNavigationMenu.Link
                    href={item.href}
                    onClick={cancelNavigation}
                    render={<NavigationMenuLink presentation="card" />}
                  >
                    <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                  </BaseNavigationMenu.Link>
                </li>
              ))}
            </NavigationMenuContentList>
          </BaseNavigationMenu.Content>
        </BaseNavigationMenu.Item>
      </BaseNavigationMenu.List>

      <BaseNavigationMenu.Portal>
        <BaseNavigationMenu.Positioner sideOffset={6}>
          <BaseNavigationMenu.Popup render={<NavigationMenuPopup />}>
            <BaseNavigationMenu.Viewport render={<NavigationMenuViewport />} />
          </BaseNavigationMenu.Popup>
        </BaseNavigationMenu.Positioner>
      </BaseNavigationMenu.Portal>
    </BaseNavigationMenu.Root>
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
