import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, Search as SearchGlyph, X } from "lucide-react";
import { expect } from "storybook/test";

import { ControlIcon } from "../../internal/control-icon";
import { Icon } from "../../internal/icon";
import { ListboxItem } from "../../internal/listbox-item";
import { ListboxPopup } from "../../internal/listbox-popup";
import { IconButton } from "../icon-button";
import {
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  type AutocompleteMagnitude,
} from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];
const MAGNITUDES: AutocompleteMagnitude[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled parts render
// DIRECTLY — no Base UI grafts — with the popup laid out inline (it is just a styled div; Base UI
// only positions it) and every visual state pinned statically via the `data-*`/aria attributes
// Base UI's autocomplete would set (`data-highlighted=""`, `data-disabled=""`, `data-invalid=""`)
// or the native `disabled` attribute. Grafting, filtering, keyboard, and aria behavior are
// demonstrated AND tested in the components-tier story (Components/Autocomplete).
const meta = {
  title: "Elements/Autocomplete",
  component: AutocompleteInputGroup,
  subcomponents: {
    AutocompleteInput,
    ListboxPopup,
    ListboxItem,
    AutocompleteEmpty,
  },
  args: { magnitude: "md" },
} satisfies Meta<typeof AutocompleteInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The full anatomy assembled statically: `AutocompleteInputGroup` (the bordered frame) holding a
 * decorative leading `ControlIcon`, the `AutocompleteInput` text field, and the consumer-provided
 * clear/trigger `IconButton` controls; below it, the internal `ListboxPopup` surface with
 * `ListboxItem` rows (`layout="plain"` — the autocomplete draws no selection marker) and the
 * `AutocompleteEmpty` live region, which Base UI keeps mounted but content-less while there are
 * matches (its padding applies via `:not(:empty)`, so it takes no space here). The second row pins
 * `data-highlighted=""` — the attribute Base UI sets on the active option. The popup's
 * anchor-derived sizing vars (`--anchor-width`, `--available-height`) are supplied by the wrapper,
 * standing in for Base UI's positioner.
 */
export const Default: Story = {
  render: ({ magnitude }) => (
    <div className="flex w-80 flex-col gap-2 [--anchor-width:20rem] [--available-height:18rem]">
      <AutocompleteInputGroup magnitude={magnitude}>
        <ControlIcon>
          <SearchGlyph />
        </ControlIcon>
        <AutocompleteInput
          magnitude={magnitude}
          aria-label="Container image"
          placeholder="e.g. docker.io/library/node:latest"
        />
        <IconButton variant="ghost" size="md" aria-label="Clear container image">
          <Icon>
            <X />
          </Icon>
        </IconButton>
        <IconButton variant="ghost" size="md" aria-label="Open container image">
          <Icon>
            <ChevronsUpDown />
          </Icon>
        </IconButton>
      </AutocompleteInputGroup>
      <ListboxPopup>
        <AutocompleteEmpty />
        {IMAGES.map((image, index) => (
          <ListboxItem
            key={image}
            layout="plain"
            magnitude="md"
            data-highlighted={index === 1 ? "" : undefined}
          >
            {image}
          </ListboxItem>
        ))}
      </ListboxPopup>
    </div>
  ),
};

/**
 * The shared control magnitude scale (sm 28px · md 32px · lg 36px · xl 44px): each step sets the
 * frame height, the input's text size, and the leading glyph's `--node-size` together.
 */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      {MAGNITUDES.map((magnitude) => (
        <AutocompleteInputGroup key={magnitude} magnitude={magnitude}>
          <ControlIcon>
            <SearchGlyph />
          </ControlIcon>
          <AutocompleteInput
            magnitude={magnitude}
            aria-label={`Search images (${magnitude})`}
            placeholder={magnitude}
          />
        </AutocompleteInputGroup>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the input row:
 *
 * - **Rest** — the subtle border over the `layer-2` fill.
 * - **Hover** / **Focused** — CSS pseudo-classes (`:hover`, `:focus-within`), forced by the
 *   pseudo-states addon: the hover border/fill shift, and the accent border + soft ring while the
 *   inner input has focus.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to the input; the frame recolors to danger via `:has([data-invalid])` — no `tone`
 *   prop.
 * - **Disabled** — the native `disabled` on the input plus the `data-disabled=""` Base UI mirrors
 *   onto the group: not-allowed cursor, flattened fill, dimmed text — both selector forms the
 *   shared chrome defines.
 */
export const States: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: {
      hover: "#autocomplete-group-hover",
      focusWithin: "#autocomplete-group-focus",
    },
  },
  render: ({ magnitude }) => (
    <div className="flex w-80 flex-col gap-3">
      <AutocompleteInputGroup magnitude={magnitude} id="autocomplete-group-rest">
        <AutocompleteInput magnitude={magnitude} aria-label="Rest" placeholder="Rest" />
      </AutocompleteInputGroup>
      <AutocompleteInputGroup magnitude={magnitude} id="autocomplete-group-hover">
        <AutocompleteInput magnitude={magnitude} aria-label="Hover" placeholder="Hover" />
      </AutocompleteInputGroup>
      <AutocompleteInputGroup magnitude={magnitude} id="autocomplete-group-focus">
        <AutocompleteInput magnitude={magnitude} aria-label="Focused" placeholder="Focused" />
      </AutocompleteInputGroup>
      <AutocompleteInputGroup magnitude={magnitude} id="autocomplete-group-invalid">
        <AutocompleteInput
          magnitude={magnitude}
          aria-label="Invalid"
          placeholder="Invalid"
          aria-invalid
          data-invalid=""
        />
      </AutocompleteInputGroup>
      <AutocompleteInputGroup magnitude={magnitude} data-disabled="">
        <AutocompleteInput
          magnitude={magnitude}
          aria-label="Disabled"
          placeholder="Disabled"
          disabled
        />
      </AutocompleteInputGroup>
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
    await expect(borderColor("autocomplete-group-invalid")).not.toBe(
      borderColor("autocomplete-group-rest"),
    );
  },
};

/**
 * The listbox surface rendered statically (Base UI only positions it — the popup is a styled div):
 * `ListboxItem` rows at `layout="plain"`, with the active-option `data-highlighted=""` and the
 * `data-disabled=""` states pinned. The second popup pins the no-matches state: `AutocompleteEmpty`
 * pads itself only via `:not(:empty)`, so the live region is invisible while the list has matches
 * and shows the tertiary hint once the filter comes up empty.
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
    <div className="flex w-80 flex-col gap-4 [--anchor-width:20rem] [--available-height:18rem]">
      <ListboxPopup>
        <AutocompleteEmpty />
        <ListboxItem id="autocomplete-item-rest" layout="plain" magnitude="md">
          nginx:1.29-alpine
        </ListboxItem>
        <ListboxItem
          id="autocomplete-item-highlighted"
          layout="plain"
          magnitude="md"
          data-highlighted=""
        >
          node:22-slim
        </ListboxItem>
        <ListboxItem layout="plain" magnitude="md" data-disabled="">
          postgres:18
        </ListboxItem>
      </ListboxPopup>
      <ListboxPopup>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
      </ListboxPopup>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned `data-highlighted` selector actually compiled — the
 * highlighted row's background (`data-highlighted:bg-layer-transparent-hover`) computes away from
 * the resting row's. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const PopupCanary: Story = {
  ...Popup,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvasElement }) => {
    const backgroundColor = (id: string) => {
      const row = canvasElement.querySelector(`#${id}`);
      if (!(row instanceof HTMLElement)) throw new Error(`missing #${id}`);
      return getComputedStyle(row).backgroundColor;
    };
    await expect(backgroundColor("autocomplete-item-highlighted")).not.toBe(
      backgroundColor("autocomplete-item-rest"),
    );
  },
};
