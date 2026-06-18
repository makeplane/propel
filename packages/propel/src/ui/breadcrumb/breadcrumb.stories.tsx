import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Layers } from "lucide-react";
import { expect } from "storybook/test";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrigger,
} from "./index";

// UI-tier story: composes the ATOMIC breadcrumb parts (each renders a single element).
// The components-tier `Breadcrumb` story shows the ready-made dropdown/menu crumbs (which
// compose propel's Menu). Here you assemble the raw crumb chrome: links, the current page,
// separators, and the bare menu-trigger surface (without an attached menu).
const meta = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbTrigger,
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root › Item › (Link | Page), with Separator between crumbs. */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
          Plane
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
          Projects
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
          Design
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Work items</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    // The trail exposes its accessible landmark name, and the last crumb is the current page.
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    await expect(canvas.getByText("Work items")).toHaveAttribute("aria-current", "page");
  },
};

/**
 * A menu-style crumb built from the raw `BreadcrumbTrigger` (`group` adds the open-state marker so
 * the chevron can rotate). The UI tier styles just the trigger surface — wiring it to a real menu
 * via the `render` prop is a components-tier concern, so no separator follows it.
 */
export const MenuTrigger: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
          Plane
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbTrigger group>
          <Layers aria-hidden className="size-4 shrink-0 text-icon-secondary" />
          <span>Plane Design</span>
          <ChevronDown
            aria-hidden
            className="size-3.5 shrink-0 text-icon-tertiary transition-transform group-data-popup-open/trigger:rotate-180"
          />
        </BreadcrumbTrigger>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbPage>Components</BreadcrumbPage>
      </BreadcrumbItem>
    </Breadcrumb>
  ),
};
