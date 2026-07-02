import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import {
  SelectField,
  SelectItemIndicator,
  SelectLabel,
  SelectScrollDownArrow,
  SelectScrollUpArrow,
  SelectTrigger,
  type SelectTriggerMagnitude,
  SelectValue,
} from "./index";

const SERVER_TYPES = ["General purpose", "Compute optimized", "Memory optimized"];
const MAGNITUDES: SelectTriggerMagnitude[] = ["sm", "md", "lg"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the popup laid out inline (it is just a styled div; Base UI
// only positions it) and every visual state pinned statically via the `data-*`/aria attributes
// Base UI's select would set (`data-highlighted=""`, `data-selected=""`, `data-disabled=""`,
// `data-invalid=""`) or the native `disabled` attribute. Grafting, keyboard, and aria behavior are
// demonstrated AND tested in the components-tier story (Components/Select). The scroll-arrow parts
// carry no styling of their own yet, so they are documented as subcomponents without a pinned
// showcase.
const meta = {
  title: "Elements/Select",
  component: SelectTrigger,
  subcomponents: {
    SelectField,
    SelectLabel,
    SelectValue,
    SelectItemIndicator,
    SelectScrollUpArrow,
    SelectScrollDownArrow,
    ListboxPopup,
    ListboxItem,
  },
  args: { magnitude: "md" },
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: `SelectField` stacks the `SelectLabel` over the
 * `SelectTrigger` (which wraps the `SelectValue` text and a trailing secondary-tinted chevron
 * `Icon`); below it, the internal `ListboxPopup` surface holds `ListboxItem` rows at
 * `layout="indicator"` — the leading 1rem grid column reserved for the `SelectItemIndicator` check,
 * which stays mounted on every row and shows its glyph only where `data-selected=""` is pinned (the
 * attribute Base UI's `ItemIndicator` graft sets). The second row pins `data-highlighted=""` — the
 * attribute Base UI sets on the active option — and the trigger takes the label's name via
 * `aria-labelledby`, the wiring Base UI performs. The popup's anchor-derived sizing vars
 * (`--anchor-width`, `--available-height`) are supplied by the wrapper, standing in for Base UI's
 * positioner.
 */
export const Default: Story = {
  render: ({ magnitude }) => (
    <div className="flex w-fit flex-col gap-2 [--anchor-width:12rem] [--available-height:18rem]">
      <SelectField>
        <SelectLabel id="select-server-type-label">Server type</SelectLabel>
        <SelectTrigger magnitude={magnitude} aria-labelledby="select-server-type-label">
          <SelectValue>General purpose</SelectValue>
          <Icon tint="secondary">
            <ChevronsUpDown />
          </Icon>
        </SelectTrigger>
      </SelectField>
      <ListboxPopup>
        {SERVER_TYPES.map((label, index) => (
          <ListboxItem
            key={label}
            layout="indicator"
            magnitude={magnitude}
            data-highlighted={index === 1 ? "" : undefined}
          >
            <SelectItemIndicator data-selected={index === 0 ? "" : undefined}>
              <Check aria-hidden />
            </SelectItemIndicator>
            {label}
          </ListboxItem>
        ))}
      </ListboxPopup>
    </div>
  ),
};

/**
 * The control magnitude scale (Figma S/Base/L map to sm 28px · md 32px · lg 36px): each step sets
 * the trigger height, its text size, and the glyph `--node-size` together, and the option rows
 * track the same step (`ListboxItem` factors the row height and text to the same axis).
 */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex items-start gap-6 [--anchor-width:12rem] [--available-height:18rem]">
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} className="flex flex-col gap-2">
          <SelectField>
            <SelectLabel id={`select-magnitude-${magnitude}-label`}>{magnitude}</SelectLabel>
            <SelectTrigger
              magnitude={magnitude}
              aria-labelledby={`select-magnitude-${magnitude}-label`}
            >
              <SelectValue>General purpose</SelectValue>
              <Icon tint="secondary">
                <ChevronsUpDown />
              </Icon>
            </SelectTrigger>
          </SelectField>
          <ListboxPopup>
            {SERVER_TYPES.slice(0, 2).map((label, index) => (
              <ListboxItem key={label} layout="indicator" magnitude={magnitude}>
                <SelectItemIndicator data-selected={index === 0 ? "" : undefined}>
                  <Check aria-hidden />
                </SelectItemIndicator>
                {label}
              </ListboxItem>
            ))}
          </ListboxPopup>
        </div>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the trigger:
 *
 * - **Rest** — the subtle border over the `layer-2` fill.
 * - **Hover** / **Focused** — CSS pseudo-classes (`:hover`, `:focus-visible` — the trigger is itself
 *   the focusable element), forced by the pseudo-states addon: the hover border/fill shift, and the
 *   accent border + soft ring while focused.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to the trigger; the surface recolors to danger via its own `data-invalid:` selector
 *   (the trigger IS the focusable control) — no `tone` prop.
 * - **Disabled** — the native `disabled` plus the `data-disabled=""` Base UI mirrors onto the
 *   trigger: not-allowed cursor and dimmed text.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#select-trigger-hover",
      focusVisible: "#select-trigger-focus",
    },
  },
  render: ({ magnitude }) => (
    <div className="flex w-fit flex-col gap-3">
      <SelectTrigger magnitude={magnitude} id="select-trigger-rest">
        <SelectValue>Rest</SelectValue>
        <Icon tint="secondary">
          <ChevronsUpDown />
        </Icon>
      </SelectTrigger>
      <SelectTrigger magnitude={magnitude} id="select-trigger-hover">
        <SelectValue>Hover</SelectValue>
        <Icon tint="secondary">
          <ChevronsUpDown />
        </Icon>
      </SelectTrigger>
      <SelectTrigger magnitude={magnitude} id="select-trigger-focus">
        <SelectValue>Focused</SelectValue>
        <Icon tint="secondary">
          <ChevronsUpDown />
        </Icon>
      </SelectTrigger>
      <SelectTrigger magnitude={magnitude} id="select-trigger-invalid" aria-invalid data-invalid="">
        <SelectValue>Invalid</SelectValue>
        <Icon tint="secondary">
          <ChevronsUpDown />
        </Icon>
      </SelectTrigger>
      <SelectTrigger magnitude={magnitude} disabled data-disabled="">
        <SelectValue>Disabled</SelectValue>
        <Icon tint="secondary">
          <ChevronsUpDown />
        </Icon>
      </SelectTrigger>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-invalid` trigger recolors its border (`data-invalid:border-danger-strong`) away from the
 * resting trigger's. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const borderColor = (id: string) => {
      const trigger = canvasElement.querySelector(`#${id}`);
      if (!(trigger instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(trigger).borderColor;
    };
    await expect(borderColor("select-trigger-invalid")).not.toBe(
      borderColor("select-trigger-rest"),
    );
  },
};

/**
 * The listbox surface rendered statically (Base UI only positions it — the popup is a styled div):
 * `ListboxItem` rows at `layout="indicator"`, the `SelectItemIndicator` mounted on every row (the
 * `keepMounted` semantics — the 1rem grid column is positional, so the marker must occupy it even
 * while unselected). The first row pins `data-selected=""` on the marker, which is what reveals the
 * accent check (`not-data-selected:invisible`); the others pin the active-option
 * `data-highlighted=""` and the `data-disabled=""` row states.
 */
export const Popup: Story = {
  parameters: {
    controls: { disable: true },
    a11y: {
      // Pinning hover/disabled state attributes makes axe evaluate visuals it never sees live
      // (it does not test :hover, and WCAG 1.4.3 exempts disabled controls). The tertiary-text-
      // on-hover-fill contrast is a design-token question flagged for the design pass, not a
      // story bug.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
  render: () => (
    <div className="flex w-72 flex-col [--anchor-width:18rem] [--available-height:18rem]">
      <ListboxPopup>
        <ListboxItem layout="indicator" magnitude="md">
          <SelectItemIndicator id="select-item-indicator-selected" data-selected="">
            <Check aria-hidden />
          </SelectItemIndicator>
          General purpose
        </ListboxItem>
        <ListboxItem layout="indicator" magnitude="md" data-highlighted="">
          <SelectItemIndicator>
            <Check aria-hidden />
          </SelectItemIndicator>
          Compute optimized
        </ListboxItem>
        <ListboxItem layout="indicator" magnitude="md">
          <SelectItemIndicator id="select-item-indicator-rest">
            <Check aria-hidden />
          </SelectItemIndicator>
          Memory optimized
        </ListboxItem>
        <ListboxItem layout="indicator" magnitude="md" data-disabled="">
          <SelectItemIndicator>
            <Check aria-hidden />
          </SelectItemIndicator>
          Storage optimized
        </ListboxItem>
      </ListboxPopup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the family's own indicator selector actually compiled — the
 * `data-selected` marker computes `visibility: visible` while the resting row's marker hides
 * (`not-data-selected:invisible`) yet keeps its grid column. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const PopupCanary: Story = {
  ...Popup,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const visibility = (id: string) => {
      const indicator = canvasElement.querySelector(`#${id}`);
      if (!(indicator instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(indicator).visibility;
    };
    await expect(visibility("select-item-indicator-selected")).toBe("visible");
    await expect(visibility("select-item-indicator-rest")).toBe("hidden");
  },
};
