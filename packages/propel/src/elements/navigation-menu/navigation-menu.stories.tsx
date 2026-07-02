import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown } from "lucide-react";
import type * as React from "react";
import { expect } from "storybook/test";

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

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the anchored popup laid out inline (Base UI only portals and
// positions it; the surface is just a styled <nav>) and every visual state pinned statically via
// the `data-*`/aria attributes Base UI's navigation menu would set (`data-popup-open=""` +
// `aria-expanded` on a trigger, `data-starting-style=""`/`data-ending-style=""` on the popup).
// Hover/focus are CSS pseudo-classes, forced by the pseudo-states addon. The Root, Item, Portal,
// Positioner, and Content are behavior/structural roles with no styled element, so they have no
// part here — grafting, keyboard, and aria behavior are demonstrated AND tested in
// Components/NavigationMenu. `meta.component` is a no-variant, no-required-prop part so Storybook
// forces nothing into `args`.
const meta = {
  title: "Elements/NavigationMenu",
  component: NavigationMenuList,
  subcomponents: {
    NavigationMenuTrigger,
    NavigationMenuTriggerLabel,
    NavigationMenuIcon,
    NavigationMenuLink,
    NavigationMenuLinkTitle,
    NavigationMenuLinkDescription,
    NavigationMenuContentList,
    NavigationMenuPopup,
    NavigationMenuViewport,
  },
} satisfies Meta<typeof NavigationMenuList>;

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

/**
 * The full anatomy assembled statically: the `NavigationMenuList` row of top-level entries — two
 * triggers (each a `NavigationMenuTriggerLabel` beside the `NavigationMenuIcon` caret slot) and an
 * `item`-presentation link — above the `NavigationMenuPopup` surface rendered inline (Base UI would
 * portal and anchor it). The first trigger pins the `data-popup-open=""` + `aria-expanded` Base UI
 * sets while its content shows, which swaps the pill to the selected fill and rotates the caret via
 * the trigger's `group` state. Inside the popup, the `NavigationMenuViewport` morph container holds
 * a `NavigationMenuContentList` of `card` links; Base UI measures the active content into
 * `--popup-width`/`--popup-height`, stood in for by the wrapper's pinned width and an `auto` height
 * so the static content sizes itself.
 */
export const Default: Story = {
  render: () => (
    <div className="flex w-max flex-col items-start gap-2 [--popup-height:auto] [--popup-width:18rem]">
      <NavigationMenuList>
        <li>
          <NavigationMenuTrigger aria-expanded data-popup-open="">
            <NavigationMenuTriggerLabel>Product</NavigationMenuTriggerLabel>
            <NavigationMenuIcon>
              <ChevronDown aria-hidden />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
        </li>
        <li>
          <NavigationMenuTrigger aria-expanded={false}>
            <NavigationMenuTriggerLabel>Resources</NavigationMenuTriggerLabel>
            <NavigationMenuIcon>
              <ChevronDown aria-hidden />
            </NavigationMenuIcon>
          </NavigationMenuTrigger>
        </li>
        <li>
          <NavigationMenuLink href="#pricing" presentation="item" onClick={cancelNavigation}>
            Pricing
          </NavigationMenuLink>
        </li>
      </NavigationMenuList>

      <NavigationMenuPopup>
        <NavigationMenuViewport>
          <NavigationMenuContentList>
            {PRODUCT_LINKS.map((item) => (
              <li key={item.href}>
                <NavigationMenuLink href={item.href} presentation="card" onClick={cancelNavigation}>
                  <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                  <NavigationMenuLinkDescription>{item.description}</NavigationMenuLinkDescription>
                </NavigationMenuLink>
              </li>
            ))}
          </NavigationMenuContentList>
        </NavigationMenuViewport>
      </NavigationMenuPopup>
    </div>
  ),
};

/**
 * The link's `presentation` axis — its only variant: `item` is a top-level pill sharing the
 * trigger's chrome, and `card` stacks a `NavigationMenuLinkTitle` over an optional
 * `NavigationMenuLinkDescription` inside a content panel. The description-less card keeps the same
 * padding and simply hugs its title.
 */
export const Presentations: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <NavigationMenuLink href="#pricing" presentation="item" onClick={cancelNavigation}>
        Pricing
      </NavigationMenuLink>
      <NavigationMenuLink href="#docs" presentation="card" onClick={cancelNavigation}>
        <NavigationMenuLinkTitle>Documentation</NavigationMenuLinkTitle>
        <NavigationMenuLinkDescription>Guides and API references.</NavigationMenuLinkDescription>
      </NavigationMenuLink>
      <NavigationMenuLink href="#changelog" presentation="card" onClick={cancelNavigation}>
        <NavigationMenuLinkTitle>Changelog</NavigationMenuLinkTitle>
      </NavigationMenuLink>
    </div>
  ),
};

/**
 * Every pinnable state of the interactive parts. Trigger row: rest, hover and focus-visible (CSS
 * pseudo-classes forced by the pseudo-states addon), and open — the `data-popup-open=""` +
 * `aria-expanded` Base UI sets while the item's content shows, shifting the pill to the selected
 * fill and rotating the caret through the trigger's `group` state. Link row: the shared pill chrome
 * on the `item` presentation — rest, hover, and the focus-visible accent ring (`card` links carry
 * the identical selectors).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: ["#navigation-menu-trigger-hover", "#navigation-menu-link-hover"],
      focusVisible: ["#navigation-menu-trigger-focus", "#navigation-menu-link-focus"],
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <NavigationMenuTrigger id="navigation-menu-trigger-rest" aria-expanded={false}>
          <NavigationMenuTriggerLabel>Rest</NavigationMenuTriggerLabel>
          <NavigationMenuIcon>
            <ChevronDown aria-hidden />
          </NavigationMenuIcon>
        </NavigationMenuTrigger>
        <NavigationMenuTrigger id="navigation-menu-trigger-hover" aria-expanded={false}>
          <NavigationMenuTriggerLabel>Hover</NavigationMenuTriggerLabel>
          <NavigationMenuIcon>
            <ChevronDown aria-hidden />
          </NavigationMenuIcon>
        </NavigationMenuTrigger>
        <NavigationMenuTrigger id="navigation-menu-trigger-focus" aria-expanded={false}>
          <NavigationMenuTriggerLabel>Focus-visible</NavigationMenuTriggerLabel>
          <NavigationMenuIcon>
            <ChevronDown aria-hidden />
          </NavigationMenuIcon>
        </NavigationMenuTrigger>
        <NavigationMenuTrigger id="navigation-menu-trigger-open" aria-expanded data-popup-open="">
          <NavigationMenuTriggerLabel>Open</NavigationMenuTriggerLabel>
          <NavigationMenuIcon>
            <ChevronDown aria-hidden />
          </NavigationMenuIcon>
        </NavigationMenuTrigger>
      </div>
      <div className="flex items-center gap-3">
        <NavigationMenuLink href="#rest" presentation="item" onClick={cancelNavigation}>
          Rest
        </NavigationMenuLink>
        <NavigationMenuLink
          id="navigation-menu-link-hover"
          href="#hover"
          presentation="item"
          onClick={cancelNavigation}
        >
          Hover
        </NavigationMenuLink>
        <NavigationMenuLink
          id="navigation-menu-link-focus"
          href="#focus"
          presentation="item"
          onClick={cancelNavigation}
        >
          Focus-visible
        </NavigationMenuLink>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned `data-popup-open` selectors actually compiled — the open
 * trigger's background computes away from the resting trigger's, and its caret picks up the
 * `group-data-popup-open` 180° rotation the resting caret lacks. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const triggerBackground = (id: string) => {
      const trigger = canvasElement.querySelector(`#${id}`);
      if (!(trigger instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(trigger).backgroundColor;
    };
    const caretTransform = (id: string) => {
      const caret = canvasElement.querySelector(`#${id} [aria-hidden="true"]`);
      if (!(caret instanceof HTMLElement)) throw new Error(`missing caret in #${id}`);
      // Tailwind v4's rotate-* compiles to the standalone CSS `rotate` property.
      return getComputedStyle(caret).rotate;
    };
    await expect(triggerBackground("navigation-menu-trigger-open")).not.toBe(
      triggerBackground("navigation-menu-trigger-rest"),
    );
    await expect(caretTransform("navigation-menu-trigger-open")).not.toBe(
      caretTransform("navigation-menu-trigger-rest"),
    );
  },
};

/**
 * The popup surface's transition poses, rendered inline (Base UI would portal and anchor it):
 *
 * - **Resting** — the open pose: the shared raised popup card with the navigation menu's `p-2`
 *   padding, holding the `NavigationMenuViewport` and a `NavigationMenuContentList` of `card`
 *   links.
 * - **Entering** — `data-starting-style=""` pins the pre-open endpoint of the transition (`opacity-0
 *   scale-95`), so the card is intentionally invisible while holding its layout
 *   (`data-ending-style` mirrors it on the way closed).
 *
 * The popups render `<nav>` landmarks, so each carries an `aria-label` to keep the two distinct.
 */
export const Popup: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-6 [--popup-height:auto] [--popup-width:18rem]">
      <NavigationMenuPopup id="navigation-menu-popup-resting" aria-label="Resources">
        <NavigationMenuViewport>
          <NavigationMenuContentList>
            {RESOURCE_LINKS.map((item) => (
              <li key={item.href}>
                <NavigationMenuLink href={item.href} presentation="card" onClick={cancelNavigation}>
                  <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                  <NavigationMenuLinkDescription>{item.description}</NavigationMenuLinkDescription>
                </NavigationMenuLink>
              </li>
            ))}
          </NavigationMenuContentList>
        </NavigationMenuViewport>
      </NavigationMenuPopup>

      <NavigationMenuPopup
        id="navigation-menu-popup-entering"
        aria-label="Resources entering"
        data-starting-style=""
      >
        <NavigationMenuViewport>
          <NavigationMenuContentList>
            {RESOURCE_LINKS.map((item) => (
              <li key={item.href}>
                <NavigationMenuLink href={item.href} presentation="card" onClick={cancelNavigation}>
                  <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                  <NavigationMenuLinkDescription>{item.description}</NavigationMenuLinkDescription>
                </NavigationMenuLink>
              </li>
            ))}
          </NavigationMenuContentList>
        </NavigationMenuViewport>
      </NavigationMenuPopup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned transition-endpoint selector actually compiled — the
 * `data-starting-style` popup computes to opacity 0 while the resting popup stays fully opaque.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const PopupCanary: Story = {
  ...Popup,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const popupOpacity = (id: string) => {
      const popup = canvasElement.querySelector(`#${id}`);
      if (!(popup instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(popup).opacity;
    };
    await expect(popupOpacity("navigation-menu-popup-resting")).toBe("1");
    await expect(popupOpacity("navigation-menu-popup-entering")).toBe("0");
  },
};
