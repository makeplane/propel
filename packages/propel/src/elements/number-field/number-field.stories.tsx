import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import { expect } from "storybook/test";

import { Icon } from "../../internal/icon";
import { IconButton } from "../icon-button";
import {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  type NumberFieldMagnitude,
} from "./index";

const MAGNITUDES: NumberFieldMagnitude[] = ["sm", "md", "lg", "xl"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. `NumberField` (the frame),
// `NumberFieldGroup` (the bordered group), and `NumberFieldInput` (the numeric control) are
// Base-UI-agnostic styled elements rendered DIRECTLY — no Base UI grafts — with the −/+ steppers
// as plain ghost `IconButton`s and every visual state pinned statically via the attributes the
// chrome keys off (`data-invalid=""`, `data-disabled=""`, the native `disabled`) or forced by the
// pseudo-states addon (hover/focus-within are CSS pseudo-classes). Grafting, stepping, and aria
// behavior are demonstrated AND tested in the ready-made NumberField (Components/NumberField).
const meta = {
  title: "Elements/NumberField",
  component: NumberField,
  subcomponents: {
    NumberFieldGroup,
    NumberFieldInput,
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The anatomy assembled statically: the `NumberField` frame stacking the `NumberFieldGroup`
 * bordered group, which holds a decrement `IconButton`, the fixed-width centered
 * `NumberFieldInput`, and an increment `IconButton`. The input's `magnitude` matches the stepper
 * buttons' `size` (`xl` = 32px) so the group container stays flush.
 */
export const Default: Story = {
  render: () => (
    <NumberField>
      <NumberFieldGroup>
        <IconButton variant="ghost" size="xl" aria-label="Decrease instances">
          <Icon>
            <Minus />
          </Icon>
        </IconButton>
        <NumberFieldInput magnitude="xl" defaultValue="2" aria-label="Number of instances" />
        <IconButton variant="ghost" size="xl" aria-label="Increase instances">
          <Icon>
            <Plus />
          </Icon>
        </IconButton>
      </NumberFieldGroup>
    </NumberField>
  ),
};

/**
 * All input sizes (sm/md/lg/xl → 20/24/28/32px input heights) side by side. Each step matches the
 * stepper `IconButton`'s `size`, which is what keeps the group container flush — so the two props
 * always change together.
 */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <NumberField key={magnitude}>
          <NumberFieldGroup>
            <IconButton variant="ghost" size={magnitude} aria-label={`Decrease (${magnitude})`}>
              <Icon>
                <Minus />
              </Icon>
            </IconButton>
            <NumberFieldInput
              magnitude={magnitude}
              defaultValue="2"
              aria-label={`Number of instances (${magnitude})`}
            />
            <IconButton variant="ghost" size={magnitude} aria-label={`Increase (${magnitude})`}>
              <Icon>
                <Plus />
              </Icon>
            </IconButton>
          </NumberFieldGroup>
        </NumberField>
      ))}
    </div>
  ),
};

/**
 * Every pinnable state of the group:
 *
 * - **Rest** — the subtle border over the `layer-2` fill.
 * - **Hover** / **Focused** — CSS pseudo-classes (`:hover`, `:focus-within`), forced by the
 *   pseudo-states addon: the hover border/fill shift, and the accent border + soft ring while the
 *   inner input has focus.
 * - **Invalid** — pins the `data-invalid=""` (and `aria-invalid`) Base UI's `Field.Root` would
 *   propagate to the input; the frame recolors to danger via `:has([data-invalid])` — no `tone`
 *   prop.
 * - **Disabled** — the native `disabled` on the input and steppers plus the `data-disabled=""` Base
 *   UI mirrors onto the group: not-allowed cursor, flattened fill, dimmed text — both selector
 *   forms the shared chrome defines.
 */
export const States: Story = {
  parameters: {
    pseudo: {
      hover: "#number-field-group-hover",
      focusWithin: "#number-field-group-focus",
    },
  },
  render: () => (
    <div className="flex flex-col gap-3">
      {(
        [
          { label: "Rest", id: "number-field-group-rest" },
          { label: "Hover", id: "number-field-group-hover" },
          { label: "Focused", id: "number-field-group-focus" },
        ] as const
      ).map(({ label, id }) => (
        <NumberField key={id}>
          <NumberFieldGroup id={id}>
            <IconButton variant="ghost" size="md" aria-label={`Decrease (${label})`}>
              <Icon>
                <Minus />
              </Icon>
            </IconButton>
            <NumberFieldInput magnitude="md" defaultValue="2" aria-label={label} />
            <IconButton variant="ghost" size="md" aria-label={`Increase (${label})`}>
              <Icon>
                <Plus />
              </Icon>
            </IconButton>
          </NumberFieldGroup>
        </NumberField>
      ))}
      <NumberField>
        <NumberFieldGroup id="number-field-group-invalid">
          <IconButton variant="ghost" size="md" aria-label="Decrease (Invalid)">
            <Icon>
              <Minus />
            </Icon>
          </IconButton>
          <NumberFieldInput
            magnitude="md"
            defaultValue="99"
            aria-label="Invalid"
            aria-invalid
            data-invalid=""
          />
          <IconButton variant="ghost" size="md" aria-label="Increase (Invalid)">
            <Icon>
              <Plus />
            </Icon>
          </IconButton>
        </NumberFieldGroup>
      </NumberField>
      <NumberField>
        <NumberFieldGroup data-disabled="">
          <IconButton variant="ghost" size="md" aria-label="Decrease (Disabled)" disabled>
            <Icon>
              <Minus />
            </Icon>
          </IconButton>
          <NumberFieldInput magnitude="md" defaultValue="2" aria-label="Disabled" disabled />
          <IconButton variant="ghost" size="md" aria-label="Increase (Disabled)" disabled>
            <Icon>
              <Plus />
            </Icon>
          </IconButton>
        </NumberFieldGroup>
      </NumberField>
    </div>
  ),
};

/**
 * CSS canary (rule 2b): asserts the pinned attribute selectors actually compiled — the
 * `data-invalid` input recolors its wrapping group's border
 * (`has-[[data-invalid]]:border-danger-strong`) away from the resting group's. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
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
    await expect(borderColor("number-field-group-invalid")).not.toBe(
      borderColor("number-field-group-rest"),
    );
  },
};
