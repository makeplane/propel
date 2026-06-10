import type { Meta, StoryObj } from "@storybook/react-vite";
import { Layers } from "lucide-react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import {
  Breadcrumb,
  BreadcrumbDropdown,
  BreadcrumbDropdownItem,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbMenu,
  BreadcrumbMenuContent,
  BreadcrumbMenuItem,
  BreadcrumbMenuTrigger,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./index";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  // A Breadcrumb is assembled from these parts, so document them alongside it
  // (adds tabs to the args table + records the relationship in the manifest).
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbDropdown,
    BreadcrumbDropdownItem,
    BreadcrumbMenu,
    BreadcrumbMenuTrigger,
    BreadcrumbMenuContent,
    BreadcrumbMenuItem,
  },
  tags: ["ai-generated"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1143-19575",
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A three-level trail ending in the current page. */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Plane</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Projects</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Design</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Work items</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    // The trail exposes its accessible landmark name, and the last crumb is the
    // current page.
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    const current = canvas.getByText("Work items");
    await expect(current).toHaveAttribute("aria-current", "page");
  },
};

/**
 * When the trail is too long, collapse the middle crumbs behind a dropdown. The
 * ellipsis trigger opens a menu of the hidden crumbs.
 */
export const WithDropdown: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Plane</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbDropdown>
          <BreadcrumbDropdownItem render={<a href="#" />}>Projects</BreadcrumbDropdownItem>
          <BreadcrumbDropdownItem render={<a href="#" />}>Design</BreadcrumbDropdownItem>
        </BreadcrumbDropdown>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Play test for the collapsed crumb: clicking the ellipsis trigger opens the
 * menu and its items become visible as `menuitem`s. Hidden from the sidebar,
 * docs, and the AI manifest — it's a behavior canary, not a designer example —
 * but still runs under the default `test` tag.
 */
export const DropdownInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Plane</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbDropdown>
          <BreadcrumbDropdownItem render={<a href="#" />}>Projects</BreadcrumbDropdownItem>
          <BreadcrumbDropdownItem render={<a href="#" />}>Design</BreadcrumbDropdownItem>
        </BreadcrumbDropdown>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    // The current crumb is marked for assistive tech.
    await expect(canvas.getByText("Breadcrumb")).toHaveAttribute("aria-current", "page");
    // The menu is closed until the trigger is clicked.
    const trigger = canvas.getByRole("button", { name: "Show more breadcrumbs" });
    await userEvent.click(trigger);
    // Once open, the collapsed crumbs are real menu items (Base UI portals the
    // menu to <body>, so query the page document, not just the story canvas).
    const menu = await within(document.body).findByRole("menu");
    const items = within(menu).getAllByRole("menuitem");
    await expect(items).toHaveLength(2);
    await expect(items[0]).toHaveTextContent("Projects");
    await expect(items[1]).toHaveTextContent("Design");
  },
};

/**
 * A crumb that *is* a dropdown — the Figma "Dropdown" crumb. The crumb label opens a
 * menu to switch the current step between sibling pages/contexts (here, switching the
 * "Plane Design" project to a sibling project) without leaving the trail. The trailing
 * chevron points right and rotates down while the menu is open.
 */
export const WithMenuCrumb: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Plane</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbMenu>
          <BreadcrumbMenuTrigger icon={<Layers className="size-4" />}>
            Plane Design
          </BreadcrumbMenuTrigger>
          <BreadcrumbMenuContent>
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Plane Web" />
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Plane Mobile" />
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Plane Server" />
          </BreadcrumbMenuContent>
        </BreadcrumbMenu>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Components</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * The menu crumb composes propel's `Dropdown` rows, so it supports the full row
 * vocabulary — here a single-select list (the current sibling carries `selected`,
 * showing the trailing check) for switching the active view.
 */
export const MenuCrumbSelected: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Plane</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Work items</BreadcrumbPage>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbMenu>
          <BreadcrumbMenuTrigger>List</BreadcrumbMenuTrigger>
          <BreadcrumbMenuContent>
            <BreadcrumbMenuItem variant="default" selected render={<a href="#" />} label="List" />
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Board" />
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Calendar" />
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Spreadsheet" />
          </BreadcrumbMenuContent>
        </BreadcrumbMenu>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};

/**
 * Keyboard a11y canary for the breadcrumb (deferred from the keyboard pass). Tabs
 * through the crumbs — links are focusable, the current page is not — then drives the
 * menu crumb entirely from the keyboard: ArrowDown opens it, arrow-nav + Enter
 * selects, Escape closes and returns focus to the trigger. Hidden from the sidebar,
 * docs, and the AI manifest; runs under the default `test` tag. Flake-safe via
 * `waitFor` for the portaled menu opening/closing.
 */
export const KeyboardNavigation: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Plane</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbMenu>
          <BreadcrumbMenuTrigger icon={<Layers className="size-4" />}>
            Plane Design
          </BreadcrumbMenuTrigger>
          <BreadcrumbMenuContent>
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Plane Web" />
            <BreadcrumbMenuItem variant="default" render={<a href="#" />} label="Plane Mobile" />
          </BreadcrumbMenuContent>
        </BreadcrumbMenu>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Components</BreadcrumbPage>
      </BreadcrumbItem>
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
      await waitFor(() => expect(body.getByRole("menu")).toBeInTheDocument());
    });

    await step("arrow-nav + Enter selects a sibling", async () => {
      const menu = body.getByRole("menu");
      const items = within(menu).getAllByRole("menuitem");
      await expect(items).toHaveLength(2);
      // Opening with ArrowDown highlights the first item; one more ArrowDown moves to
      // the second ("Plane Mobile").
      await userEvent.keyboard("{ArrowDown}");
      await waitFor(() => expect(items[1]).toHaveAttribute("data-highlighted"));
      await userEvent.keyboard("{Enter}");
      // Selecting closes the menu.
      await waitFor(() => expect(body.queryByRole("menu")).toBeNull());
    });

    await step("Escape closes the menu and returns focus to the trigger", async () => {
      trigger.focus();
      await userEvent.keyboard("{Enter}");
      await waitFor(() => expect(body.getByRole("menu")).toBeInTheDocument());
      await userEvent.keyboard("{Escape}");
      await waitFor(() => expect(body.queryByRole("menu")).toBeNull());
      await expect(trigger).toHaveFocus();
    });
  },
};
