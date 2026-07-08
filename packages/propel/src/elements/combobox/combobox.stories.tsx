import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { IconButton } from "../icon-button";
import {
  ComboboxChip,
  ComboboxChipOverflow,
  ComboboxChips,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItemIndicator,
  type ComboboxMagnitude,
} from "./index";

const MAGNITUDES: ComboboxMagnitude[] = ["sm", "md", "lg", "xl"];

// One popup row per pinnable option state: rest, `data-highlighted` (the active option), selected
// (the indicator carries `data-selected`), and `data-disabled`.
const REGION_OPTIONS: {
  value: string;
  highlighted?: boolean;
  selected?: boolean;
  disabled?: boolean;
}[] = [
  { value: "us-central-1" },
  { value: "us-east-1", highlighted: true },
  { value: "eu-central-1", selected: true },
  { value: "ap-west-1", disabled: true },
];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the popup laid out inline (it is just a styled div; Base UI
// only positions it) and every visual state pinned statically via the `data-*`/aria attributes
// Base UI's combobox and field would set (`data-highlighted=""`/`data-disabled=""` on a row,
// `data-selected=""` on the item indicator, `data-invalid=""` on the input) or the native
// `disabled` attribute. Hover/focus are CSS pseudo-classes, forced by the pseudo-states addon.
// Grafting, filtering, keyboard, and aria behavior are demonstrated AND tested in the
// components-tier story (Components/Combobox).
const meta = {
  title: "Elements/Combobox",
  component: ComboboxInputGroup,
  subcomponents: {
    ComboboxInput,
    ComboboxChips,
    ComboboxChip,
    ComboboxChipOverflow,
    ComboboxItemIndicator,
    ComboboxEmpty,
    ListboxPopup,
    ListboxItem,
  },
  args: { magnitude: "md" },
} satisfies Meta<typeof ComboboxInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full single-select anatomy assembled statically: `ComboboxInputGroup` (the bordered frame)
 * holds the `ComboboxInput` plus the consumer-provided clear/trigger `IconButton` controls; below
 * it, the internal `ListboxPopup` surface with the `ComboboxEmpty` live region (mounted but
 * content-less while there are matches — its padding applies via `:not(:empty)`) and one
 * `ListboxItem` row per pinnable state. `layout="indicator"` reserves the leading 1rem column, so
 * every row keeps a `ComboboxItemIndicator` — only the selected row's indicator carries
 * `data-selected` and shows its check. The popup's anchor-derived sizing vars (`--anchor-width`,
 * `--available-height`) are supplied by the story wrapper, standing in for Base UI's positioner.
 */
export const Default: Story = {
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
  render: ({ magnitude }) => (
    <div className="flex w-72 flex-col gap-1.5 [--anchor-width:18rem] [--available-height:18rem]">
      <ComboboxInputGroup magnitude={magnitude}>
        <ComboboxInput aria-label="Region" placeholder="e.g. eu-central-1" />
        <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear region">
          <Icon>
            <X />
          </Icon>
        </IconButton>
        <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
          <Icon>
            <ChevronsUpDown />
          </Icon>
        </IconButton>
      </ComboboxInputGroup>
      <ListboxPopup>
        <ComboboxEmpty />
        {REGION_OPTIONS.map(({ value, highlighted, selected, disabled }) => (
          <ListboxItem
            key={value}
            layout="indicator"
            magnitude="md"
            data-highlighted={highlighted ? "" : undefined}
            data-disabled={disabled ? "" : undefined}
          >
            <ComboboxItemIndicator
              id={selected ? "combobox-indicator-selected" : undefined}
              data-selected={selected ? "" : undefined}
            >
              <Check aria-hidden />
            </ComboboxItemIndicator>
            <span>{value}</span>
          </ListboxItem>
        ))}
      </ListboxPopup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the indicator's `not-data-selected:invisible` selector compiled —
 * the selected row's pinned `data-selected` indicator computes visible while an unselected row's
 * stays hidden (the reserved column holds either way). Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const DefaultCanary: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const visibility = (selector: string) => {
      const indicator = canvasElement.querySelector(selector);
      if (!(indicator instanceof HTMLElement)) throw new Error(`missing ${selector}`);
      return getComputedStyle(indicator).visibility;
    };
    await expect(visibility("#combobox-indicator-selected")).toBe("visible");
    await expect(visibility("[data-highlighted] > :first-child")).toBe("hidden");
  },
};

/**
 * The full `magnitude` axis of both input frames, one row per step: the single-select
 * `ComboboxInputGroup` beside the multiselect `ComboboxChips` frame. A step sets the frame's
 * min-height, text size, and glyph `--node-size` (the shared control scale: sm 28px · md 32px · lg
 * 36px · xl 44px); the chips keep their fixed height and sit inset like text would.
 */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} className="flex items-start gap-4">
          <ComboboxInputGroup magnitude={magnitude}>
            <ComboboxInput aria-label={`Region (${magnitude})`} placeholder={magnitude} />
          </ComboboxInputGroup>
          <ComboboxChips magnitude={magnitude} layout="wrap">
            <ComboboxChip>
              us-east-1
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="sm"
                aria-label={`Remove us-east-1 (${magnitude})`}
              >
                <Icon>
                  <X />
                </Icon>
              </IconButton>
            </ComboboxChip>
            <ComboboxInput aria-label={`Regions (${magnitude})`} placeholder="Add a region" />
          </ComboboxChips>
        </div>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the input frame, one group per row:
 *
 * - **Rest** — the subtle border over the `layer-2` fill.
 * - **Hover** / **Focused** — CSS pseudo-classes (`:hover`, `:focus-within`), forced by the
 *   pseudo-states addon: the hover border/fill shift, and the accent border + soft ring while the
 *   inner input has focus.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to the input; the frame recolors to danger via `:has([data-invalid])` — no `tone`
 *   prop.
 * - **Invalid focused** — danger wins on focus: the danger border stays and the soft ring turns
 *   danger instead of accent.
 * - **Disabled** — the native `disabled` on the input plus the `data-disabled=""` Base UI mirrors
 *   onto the group: not-allowed cursor, flattened fill, dimmed text — both selector forms the
 *   shared chrome defines.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#combobox-group-hover",
      focusWithin: ["#combobox-group-focus", "#combobox-group-invalid-focus"],
    },
  },
  render: ({ magnitude }) => (
    <div className="flex w-72 flex-col gap-3">
      <ComboboxInputGroup magnitude={magnitude} id="combobox-group-rest">
        <ComboboxInput aria-label="Rest" placeholder="Rest" />
      </ComboboxInputGroup>
      <ComboboxInputGroup magnitude={magnitude} id="combobox-group-hover">
        <ComboboxInput aria-label="Hover" placeholder="Hover" />
      </ComboboxInputGroup>
      <ComboboxInputGroup magnitude={magnitude} id="combobox-group-focus">
        <ComboboxInput aria-label="Focused" placeholder="Focused" />
      </ComboboxInputGroup>
      <ComboboxInputGroup magnitude={magnitude} id="combobox-group-invalid">
        <ComboboxInput aria-label="Invalid" placeholder="Invalid" aria-invalid data-invalid="" />
      </ComboboxInputGroup>
      <ComboboxInputGroup magnitude={magnitude} id="combobox-group-invalid-focus">
        <ComboboxInput
          aria-label="Invalid focused"
          placeholder="Invalid focused"
          aria-invalid
          data-invalid=""
        />
      </ComboboxInputGroup>
      <ComboboxInputGroup magnitude={magnitude} data-disabled="">
        <ComboboxInput aria-label="Disabled" placeholder="Disabled" disabled />
      </ComboboxInputGroup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-invalid` input recolors its wrapping frame's border (`has-[[data-invalid]]:
 * border-danger-strong`) away from the resting frame's. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const StatesCanary: Story = {
  ...States,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const borderColor = (id: string) => {
      const group = canvasElement.querySelector(`#${id}`);
      if (!(group instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(group).borderColor;
    };
    await expect(borderColor("combobox-group-invalid")).not.toBe(
      borderColor("combobox-group-rest"),
    );
  },
};

/**
 * The multiselect anatomy: `ComboboxChips` replaces the input frame, wrapping one `ComboboxChip`
 * per selected value (its label plus the remove control — an `IconButton` the components ready-made
 * grafts onto Base UI's remove behavior) ahead of the inline `ComboboxInput`. Chip states pinned:
 * the third pins the `data-disabled` a disabled root would mirror onto the chip, with its remove
 * natively disabled.
 */
export const Chips: Story = {
  parameters: {
    controls: { disable: true },
    a11y: {
      // Pinning the disabled state attribute makes axe evaluate visuals it never sees live (WCAG
      // 1.4.3 exempts disabled controls). The tertiary-text-on-hover-fill contrast is a design-token
      // question flagged for the design pass, not a story bug.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
  render: () => (
    <div className="flex w-96 flex-col gap-1.5">
      <ComboboxChips magnitude="md" layout="wrap">
        <ComboboxChip>
          us-east-1
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Remove us-east-1"
          >
            <Icon>
              <X />
            </Icon>
          </IconButton>
        </ComboboxChip>
        <ComboboxChip>
          eu-central-1
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Remove eu-central-1"
          >
            <Icon>
              <X />
            </Icon>
          </IconButton>
        </ComboboxChip>
        <ComboboxChip data-disabled="">
          ap-west-1
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Remove ap-west-1"
            disabled
          >
            <Icon>
              <X />
            </Icon>
          </IconButton>
        </ComboboxChip>
        <ComboboxInput aria-label="Regions" placeholder="Add a region" />
      </ComboboxChips>
    </div>
  ),
};

/**
 * The `layout="collapse"` frame: a single clipped row that shows the visible chips (each here with
 * a leading `Icon` slot standing in for a contextual glyph/avatar) followed by a
 * `ComboboxChipOverflow` "+N more" count. The components-tier `ComboboxChips` derives this from its
 * `maxVisible` prop; the hidden values stay managed from the popup.
 */
export const Collapsed: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <ComboboxChips magnitude="md" layout="collapse">
        <ComboboxChip>
          <Icon>
            <Check />
          </Icon>
          Priya Nair
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Remove Priya Nair"
          >
            <Icon>
              <X />
            </Icon>
          </IconButton>
        </ComboboxChip>
        <ComboboxChip>
          <Icon>
            <Check />
          </Icon>
          Marcus Chen
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Remove Marcus Chen"
          >
            <Icon>
              <X />
            </Icon>
          </IconButton>
        </ComboboxChip>
        <ComboboxChipOverflow>+5 more</ComboboxChipOverflow>
        <ComboboxInput aria-label="Assignees" placeholder="" />
      </ComboboxChips>
    </div>
  ),
};

/**
 * The no-matches popup: `ComboboxEmpty` is the live region Base UI keeps mounted inside the popup,
 * and its padding applies via `:not(:empty)` only once it holds the message — while there are
 * matches it renders collapsed (see the Default story's popup), never a dead padded strip.
 */
export const Empty: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-72 flex-col [--anchor-width:18rem] [--available-height:18rem]">
      <ListboxPopup>
        <ComboboxEmpty>No matches</ComboboxEmpty>
      </ListboxPopup>
    </div>
  ),
};
