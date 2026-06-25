import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRight, Layers } from "lucide-react";
import { expect } from "storybook/test";

import { BreadcrumbMenuTrigger } from "../../components/breadcrumb";
import { MenuContent } from "../../components/menu";
import { Menu, MenuItem } from "../menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrigger,
  BreadcrumbTriggerIcon,
  BreadcrumbTriggerIndicator,
} from "./index";

// UI-tier story: composes the ATOMIC breadcrumb parts (each renders a single element).
// The components-tier `Breadcrumb` story shows the ready-made menu crumbs (which
// compose propel's Menu). Here you assemble the raw crumb chrome: the landmark + list, links,
// the current page, separators, and the bare menu-trigger surface (without an attached menu)
// with its own leading icon and trailing indicator parts.
const meta = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbTrigger,
    BreadcrumbTriggerIcon,
    BreadcrumbTriggerIndicator,
    Menu,
    MenuItem,
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Root › List › Item › (Link | Page), with Separator between crumbs. */
export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
            Plane
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
            Design
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Work items</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  play: async ({ canvas }) => {
    // The trail exposes its accessible landmark name, and the last crumb is the current page.
    await expect(canvas.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    await expect(canvas.getByText("Work items")).toHaveAttribute("aria-current", "page");
  },
};

// A non-navigating anchor for the `render` prop of crumb menu items. Activating a
// bare `href="#"` performs a full document navigation, which tears down the test page in the
// browser runner — so swallow the default click. Real apps pass a router link here instead.
const inertAnchor = () => <a href="#" onClick={(event) => event.preventDefault()} />;

/**
 * A menu-style crumb built from the raw `BreadcrumbTrigger` (`group` adds the open-state marker so
 * the indicator can rotate), composing the atomic `BreadcrumbTriggerIcon` and
 * `BreadcrumbTriggerIndicator` parts. The UI tier styles just the trigger surface — wiring it to a
 * real menu via the `render` prop is a components-tier concern, so no separator follows it.
 */
export const MenuTrigger: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
            Plane
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRight />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbMenuTrigger icon={<Layers />}>Plane Design</BreadcrumbMenuTrigger>
            <MenuContent>
              <MenuItem render={inertAnchor()} layout={"default"}>
                Plane Web
              </MenuItem>
              <MenuItem render={inertAnchor()} layout={"default"}>
                Plane Mobile
              </MenuItem>
              <MenuItem render={inertAnchor()} layout={"default"}>
                Plane Server
              </MenuItem>
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
