import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileText, Layers } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Icon } from "../icon";
import { Menu, MenuContent, MenuItem } from "../menu";
import {
  Breadcrumb,
  BreadcrumbEllipsisTrigger,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenuTrigger,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./index";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  args: { "aria-label": "Breadcrumb" },
  // A Breadcrumb is assembled from these parts, so document them alongside it
  // (adds tabs to the args table + records the relationship in the manifest).
  subcomponents: {
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    Menu,
    BreadcrumbMenuTrigger,
    BreadcrumbEllipsisTrigger,
    MenuContent,
    MenuItem,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1143-19575",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

// A non-navigating anchor for the `render` prop of crumb menu items. Activating a
// bare `href="#"` performs a full document navigation, which tears down the test page in the
// browser runner — so swallow the default click. Real apps pass a router link here instead.
const inertAnchor = () => <a href="#" onClick={(event) => event.preventDefault()} />;

/**
 * A three-level trail ending in the current page.
 *
 * The trail ends on the current-page crumb: there is **no** trailing separator after the last crumb
 * (a separator sits only _between_ crumbs, so a trail of N crumbs has N−1 separators). Figma's
 * example frames show a chevron after the final crumb — that is an authoring artifact of chaining
 * copies of one crumb instance with its `Arrow` toggle left on, not a spec requirement. Don't
 * "restore" a trailing arrow to match the mock.
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Projects" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Design" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage label="Work items" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Interaction test: the trail exposes its landmark name and the last crumb is the current page.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The trail exposes its accessible landmark name, and the last crumb is the
    // current page.
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    const current = canvas.getByText("Work items");
    await expect(current).toHaveAttribute("aria-current", "page");
  },
};

/**
 * Crumbs carry an optional leading `icon`, following the same slot convention as `MenuItem` and the
 * menu crumb: pass a public `<Icon icon={…} tint="secondary" />`. The crumb sizes it to 16×16 via
 * its `--node-size`, so no `magnitude` is needed. Works on both a navigable `BreadcrumbLink` and
 * the current-page `BreadcrumbPage`.
 */
export const WithIcon: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={(event) => event.preventDefault()}
            icon={<Icon icon={Layers} tint="secondary" />}
            label="Plane Design"
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage icon={<Icon icon={FileText} tint="secondary" />} label="Work items" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * A long crumb label stays on a single line. The crumb variants set `whitespace-nowrap`, so a long
 * label keeps the trail's fixed `h-6` height and baseline instead of wrapping onto a second line
 * and breaking the row's alignment. When horizontal space genuinely runs out, collapse the middle
 * crumbs behind a menu (see `WithCollapsedCrumbs`) rather than letting labels wrap — the primitive
 * does not truncate on its own, since a sensible clip width is an app-level decision.
 */
export const WithLongLabel: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={(event) => event.preventDefault()}
            label="Design System and Component Library Documentation"
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage label="Work items" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * When the trail is too long, collapse the middle crumbs behind a menu. The
 * `BreadcrumbEllipsisTrigger` crumb opens a `Menu` of the hidden crumbs — there is no separate
 * "dropdown": it is the same Menu composition, with an ellipsis glyph standing in for a label.
 */
export const WithCollapsedCrumbs: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbEllipsisTrigger aria-label="Show more breadcrumbs" />
            <MenuContent sizing="auto">
              <MenuItem render={inertAnchor()} label="Projects" />
              <MenuItem render={inertAnchor()} label="Design" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Components" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage label="Breadcrumb" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Play test for the collapsed crumb: clicking the ellipsis trigger opens the menu and its items
 * become visible as `menuitem`s. Hidden from the sidebar, docs, and the AI manifest — it's a
 * behavior canary, not a designer example — but still runs under the default `test` tag.
 */
export const CollapsedCrumbsInteraction: Story = {
  ...WithCollapsedCrumbs,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    // The current crumb is marked for assistive tech.
    await expect(canvas.getByText("Breadcrumb")).toHaveAttribute("aria-current", "page");
    // The menu is closed until the trigger is clicked.
    const trigger = canvas.getByRole("button", { name: "Show more breadcrumbs" });
    await userEvent.click(trigger);
    // Once open, the collapsed crumbs are real menu items (Base UI portals the
    // menu to <body>, so query the page document, not just the story canvas).
    const items = await within(document.body).findAllByRole("menuitem");
    await expect(items).toHaveLength(2);
    await expect(items[0]).toHaveTextContent("Projects");
    await expect(items[1]).toHaveTextContent("Design");
  },
};

/**
 * A crumb that opens a menu — the crumb Figma labels "Dropdown" (it's a Base UI `Menu`, not a
 * separate primitive). The crumb label opens a menu to switch the current step between sibling
 * pages/contexts (here, switching the "Plane Design" project to a sibling project) without leaving
 * the trail. The trailing chevron points right and rotates down while the menu is open.
 */
export const WithMenuCrumb: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbMenuTrigger
              icon={<Icon icon={Layers} tint="secondary" />}
              label="Plane Design"
            />
            <MenuContent>
              <MenuItem render={inertAnchor()} label="Plane Web" />
              <MenuItem render={inertAnchor()} label="Plane Mobile" />
              <MenuItem render={inertAnchor()} label="Plane Server" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
        {/* No `BreadcrumbSeparator` after a menu crumb: its own chevron IS the
            breadcrumb chevron (and rotates down while the menu is open), so a
            separate separator would render a second, redundant arrow. */}
        <BreadcrumbItem>
          <BreadcrumbPage label="Components" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * The menu crumb composes propel's `Menu` rows, so it supports the full row vocabulary — here a
 * single-select list (the current sibling carries `selected`, showing the trailing check) for
 * switching the active view.
 */
export const MenuCrumbSelected: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage label="Work items" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbMenuTrigger label="List" />
            <MenuContent>
              <MenuItem selected render={inertAnchor()} label="List" />
              <MenuItem render={inertAnchor()} label="Board" />
              <MenuItem render={inertAnchor()} label="Calendar" />
              <MenuItem render={inertAnchor()} label="Spreadsheet" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Keyboard a11y canary for the breadcrumb (deferred from the keyboard pass). Tabs through the
 * crumbs — links are focusable, the current page is not — then drives the menu crumb entirely from
 * the keyboard: ArrowDown opens it, arrow-nav + Enter selects, Escape closes and returns focus to
 * the trigger. Hidden from the sidebar, docs, and the AI manifest; runs under the default `test`
 * tag. Flake-safe via `waitFor` for the portaled menu opening/closing.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbMenuTrigger
              icon={<Icon icon={Layers} tint="secondary" />}
              label="Plane Design"
            />
            <MenuContent>
              <MenuItem render={inertAnchor()} label="Plane Web" />
              <MenuItem render={inertAnchor()} label="Plane Mobile" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
        {/* Menu crumb's own chevron is the breadcrumb chevron; no separator after it. */}
        <BreadcrumbItem>
          <BreadcrumbPage label="Components" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvas, step }) => {
    const body = within(document.body);

    await step("links are tabbable; the current page is not a link", async () => {
      const link = canvas.getByRole("link", { name: "Plane" });
      link.focus();
      await expect(link).toHaveFocus();
      // The current crumb is a span, not a link, and is marked for assistive tech.
      await expect(canvas.getByText("Components")).toHaveAttribute("aria-current", "page");
      await expect(canvas.queryByRole("link", { name: "Components" })).toBeNull();
    });

    const trigger = canvas.getByRole("button", { name: /Plane Design/ });

    await step("ArrowDown opens the menu crumb from the keyboard", async () => {
      trigger.focus();
      await expect(trigger).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}");
      await expect(await body.findByRole("menuitem", { name: "Plane Web" })).toBeInTheDocument();
    });

    await step("arrow-nav + Enter selects a sibling", async () => {
      const firstItem = await body.findByRole("menuitem", { name: "Plane Web" });
      const menu = firstItem.closest('[role="menu"]');
      if (!(menu instanceof HTMLElement)) throw new Error("breadcrumb menu not found");
      const items = within(menu).getAllByRole("menuitem");
      await expect(items).toHaveLength(2);
      // Opening with ArrowDown highlights the first item; one more ArrowDown moves to
      // the second ("Plane Mobile").
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(items[1]).toHaveAttribute("data-highlighted"));
      await userEvent.keyboard("{Enter}");
      // Selecting closes the menu.
      await waitFor(() =>
        expect(body.queryByRole("menuitem", { name: "Plane Web" })).not.toBeInTheDocument(),
      );
    });

    await step("Escape closes the menu and returns focus to the trigger", async () => {
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      await expect(await body.findByRole("menuitem", { name: "Plane Web" })).toBeInTheDocument();
      await userEvent.keyboard("{Escape}");
      await waitFor(() =>
        expect(body.queryByRole("menuitem", { name: "Plane Web" })).not.toBeInTheDocument(),
      );
      await expect(trigger).toHaveFocus();
    });
  },
};
