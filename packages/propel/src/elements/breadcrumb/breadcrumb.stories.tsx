import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, ChevronRight, Ellipsis, Layers } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrigger,
  BreadcrumbTriggerIndicator,
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
 * marker) holding an internal `Icon`, the label, and a `BreadcrumbTriggerIndicator` chevron. In the
 * app, Base UI's `Menu.Trigger` grafts onto it and sets `data-popup-open` while its menu is open —
 * here that attribute is pinned statically, which shifts the pill to the open palette, rotates the
 * chevron down, and shifts the chevron from `icon-secondary` to `icon-primary` (the active crumb).
 * The icon-only form (no `group`, no indicator) is the collapsed-crumbs ellipsis crumb; being
 * icon-only it requires an `aria-label`.
 */
export const Trigger: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <BreadcrumbTrigger group>
        <Icon tint="secondary">
          <Layers />
        </Icon>
        Plane Design
        <BreadcrumbTriggerIndicator>
          <ChevronDown />
        </BreadcrumbTriggerIndicator>
      </BreadcrumbTrigger>
      <BreadcrumbTrigger group data-popup-open="">
        <Icon tint="secondary">
          <Layers />
        </Icon>
        Plane Design
        <BreadcrumbTriggerIndicator>
          <ChevronDown />
        </BreadcrumbTriggerIndicator>
      </BreadcrumbTrigger>
      <BreadcrumbTrigger aria-label="Show more breadcrumbs">
        <Icon tint="tertiary">
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
          <BreadcrumbTriggerIndicator>
            <ChevronDown />
          </BreadcrumbTriggerIndicator>
        </BreadcrumbTrigger>
        <BreadcrumbTrigger id="breadcrumb-trigger-hover" group>
          Trigger hover
          <BreadcrumbTriggerIndicator>
            <ChevronDown />
          </BreadcrumbTriggerIndicator>
        </BreadcrumbTrigger>
        <BreadcrumbTrigger group data-popup-open="">
          Trigger open
          <BreadcrumbTriggerIndicator>
            <ChevronDown />
          </BreadcrumbTriggerIndicator>
        </BreadcrumbTrigger>
      </div>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the breadcrumb's RTL-mirrored selectors compiled. The separator
 * chevron mirrors under `dir="rtl"` (`rtl:[&>svg]:-scale-x-100`) and the menu-crumb caret rotates
 * the opposite way (`rtl:rotate-90` vs LTR's `-rotate-90`). Rendered LTR + RTL side by side and
 * compared. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const RTLCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      {(["ltr", "rtl"] as const).map((dir) => (
        <div key={dir} dir={dir}>
          <Breadcrumb aria-label={`Breadcrumb ${dir}`}>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbTrigger group>
                  {dir.toUpperCase()} trigger
                  <BreadcrumbTriggerIndicator>
                    <ChevronDown />
                  </BreadcrumbTriggerIndicator>
                </BreadcrumbTrigger>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{dir.toUpperCase()} page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      ))}
    </>
  ),
  play: async ({ canvas, canvasElement }) => {
    // The compiled `rtl:rotate-90` selector mirrors the closed caret away from LTR's `-rotate-90`.
    const caretRotate = (name: string) => {
      const caret = canvas.getByRole("button", { name }).querySelector("[aria-hidden]");
      if (!(caret instanceof HTMLElement)) throw new Error(`missing caret in "${name}" trigger`);
      return getComputedStyle(caret).rotate;
    };
    await expect(caretRotate("RTL trigger")).not.toBe(caretRotate("LTR trigger"));

    // The compiled `rtl:[&>svg]:-scale-x-100` selector mirrors the separator chevron under RTL.
    const separatorMirror = (dir: string) => {
      const svg = canvasElement.querySelector(`[dir="${dir}"] li[aria-hidden="true"] svg`);
      if (!(svg instanceof SVGElement)) throw new Error(`missing ${dir} separator glyph`);
      const cs = getComputedStyle(svg);
      return `${cs.transform}|${cs.scale}`;
    };
    await expect(separatorMirror("rtl")).not.toBe(separatorMirror("ltr"));
  },
};
