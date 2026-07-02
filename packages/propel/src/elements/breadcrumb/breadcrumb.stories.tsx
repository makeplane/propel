import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronRight, Ellipsis, Layers } from "lucide-react";

import { DisclosureIndicator } from "../../internal/disclosure-indicator";
import { Icon } from "../../internal/icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrigger,
} from "./index";

// elements-tier story (rule 2b): a pure UI-configuration showcase of the atomic breadcrumb parts
// (each a Base-UI-agnostic `useRender` element rendering a single element). Nothing from Base UI is
// wired here — the state Base UI would set is pinned statically (`data-popup-open=""` on the
// trigger; `aria-current="page"` is baked into `BreadcrumbPage`) and hover is forced via the
// pseudo-states addon. Menu grafting, keyboard, and aria behavior are demonstrated AND tested in
// Components/Breadcrumb. `meta.component` is a no-variant, no-required-prop part so Storybook
// forces nothing into `args`.
const meta = {
  title: "Elements/Breadcrumb",
  component: BreadcrumbList,
  subcomponents: {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbTrigger,
  },
} satisfies Meta<typeof BreadcrumbList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Root › List › Item › (Link | Page), with Separator between crumbs. The `elements` separator is a
 * bare slot, so the divider glyph is passed as `children`; `BreadcrumbPage` bakes
 * `aria-current="page"` onto the last, non-navigable crumb.
 */
export const Default: Story = {
  render: () => (
    <Breadcrumb aria-label="Breadcrumb">
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
};

/**
 * The menu-crumb chrome assembled from atoms: `BreadcrumbTrigger` (`group` adds the `group/trigger`
 * marker) holding an internal `Icon`, the label, and a `DisclosureIndicator` chevron. In the app,
 * Base UI's `Menu.Trigger` grafts onto it and sets `data-popup-open` while its menu is open — here
 * that attribute is pinned statically, which both shifts the pill to the open palette and rotates
 * the chevron down. The icon-only form (no `group`, no indicator) is the collapsed-crumbs ellipsis
 * crumb; being icon-only it requires an `aria-label`.
 */
export const Trigger: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <BreadcrumbTrigger group>
        <Icon tint="tertiary" magnitude="md">
          <Layers />
        </Icon>
        Plane Design
        <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
          <ChevronDown />
        </DisclosureIndicator>
      </BreadcrumbTrigger>
      <BreadcrumbTrigger group data-popup-open="">
        <Icon tint="tertiary" magnitude="md">
          <Layers />
        </Icon>
        Plane Design
        <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
          <ChevronDown />
        </DisclosureIndicator>
      </BreadcrumbTrigger>
      <BreadcrumbTrigger aria-label="Show more breadcrumbs">
        <Icon tint="tertiary" magnitude="md">
          <Ellipsis />
        </Icon>
      </BreadcrumbTrigger>
    </div>
  ),
};

/**
 * Every interaction state of the interactive crumbs, side by side. Hover on the link and trigger is
 * forced via the pseudo-states addon; the trigger's open state is pinned with the
 * `data-popup-open=""` attribute Base UI's `Menu.Trigger` would set; the current page is the static
 * `BreadcrumbPage` (non-interactive, `aria-current="page"` baked in).
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: ["#breadcrumb-link-hover", "#breadcrumb-trigger-hover"] },
  },
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
          Link
        </BreadcrumbLink>
        <BreadcrumbLink
          id="breadcrumb-link-hover"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          Link hover
        </BreadcrumbLink>
        <BreadcrumbPage>Current page</BreadcrumbPage>
      </div>
      <div className="flex items-center gap-3">
        <BreadcrumbTrigger group>
          Trigger
          <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </BreadcrumbTrigger>
        <BreadcrumbTrigger id="breadcrumb-trigger-hover" group>
          Trigger hover
          <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </BreadcrumbTrigger>
        <BreadcrumbTrigger group data-popup-open="">
          Trigger open
          <DisclosureIndicator motion="disclose" tint="tertiary" magnitude="sm">
            <ChevronDown />
          </DisclosureIndicator>
        </BreadcrumbTrigger>
      </div>
    </div>
  ),
};
