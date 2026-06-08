import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Breadcrumb,
  BreadcrumbDropdown,
  BreadcrumbDropdownItem,
  BreadcrumbItem,
  BreadcrumbLink,
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
  },
  tags: ["ai-generated"],
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
