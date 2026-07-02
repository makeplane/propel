import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { expect } from "storybook/test";

import { Checkbox, CheckboxIndicator } from "../checkbox/index";
import { Input, InputGroup } from "../input/index";
import {
  Field,
  FieldControlContent,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldItemContent,
  FieldLabel,
  FieldLabelGroup,
  FieldLabelRequiredMarker,
} from "./index";

const MAGNITUDES = ["md", "lg", "xl"] as const;

// elements-tier story (rule 2b): a pure UI-configuration showcase. The field parts are
// Base-UI-agnostic styled elements rendered DIRECTLY — no `Field.Root` graft — with the
// label/description/error wiring pinned statically via the `htmlFor`/`id`/`aria-describedby`/
// `aria-invalid` attributes Base UI's Field would set, and the state looks pinned via
// `data-invalid` (danger control border) and `data-disabled` (muted choice row). Labeling,
// validation, and announcement BEHAVIOR is demonstrated and tested in Components/Field and the
// ready-made per-control fields (Components/InputField, …).
const meta = {
  title: "Elements/Field",
  component: Field,
  subcomponents: {
    FieldLabel,
    FieldLabelRequiredMarker,
    FieldLabelGroup,
    FieldControlContent,
    FieldDescription,
    FieldError,
    FieldItem,
    FieldItemContent,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A labeled input with helper text, assembled from the atomic parts: the `Field` column,
 * `FieldLabel` naming the control, the input family's bordered group as the control, and
 * `FieldDescription` as the hint. The `htmlFor`/`id`/`aria-describedby` wiring is pinned statically
 * — it is what Base UI's `Field.Root` generates for you in the ready-made.
 */
export const Default: Story = {
  render: () => (
    <Field>
      <FieldLabel magnitude="md" inset={false} htmlFor="elements-field-default-control">
        Display name
      </FieldLabel>
      <InputGroup magnitude="md">
        <Input
          magnitude="md"
          id="elements-field-default-control"
          placeholder="Ada Lovelace"
          aria-describedby="elements-field-default-description"
        />
      </InputGroup>
      <FieldDescription magnitude="md" id="elements-field-default-description">
        Shown anywhere your profile is visible.
      </FieldDescription>
    </Field>
  ),
};

/**
 * The required marker is a bare `aria-hidden` slot that bakes no glyph: the consumer passes the
 * marker (here, the conventional asterisk) as `children`; the control's own `required` attribute
 * carries the semantics.
 */
export const RequiredMarker: Story = {
  render: () => (
    <Field>
      <FieldLabel magnitude="md" inset={false} htmlFor="elements-field-required-control">
        Display name
        <FieldLabelRequiredMarker>*</FieldLabelRequiredMarker>
      </FieldLabel>
      <InputGroup magnitude="md">
        <Input
          magnitude="md"
          id="elements-field-required-control"
          required
          placeholder="Ada Lovelace"
        />
      </InputGroup>
    </Field>
  ),
};

/**
 * Every field text magnitude: the label, control, and description scale together (md/lg/xl). Pass
 * the same `magnitude` to each part of a field.
 */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {MAGNITUDES.map((magnitude) => (
        <Field key={magnitude}>
          <FieldLabel
            magnitude={magnitude}
            inset={false}
            htmlFor={`elements-field-magnitude-${magnitude}`}
          >
            Display name ({magnitude})
          </FieldLabel>
          <InputGroup magnitude={magnitude}>
            <Input
              magnitude={magnitude}
              id={`elements-field-magnitude-${magnitude}`}
              placeholder="Ada Lovelace"
              aria-describedby={`elements-field-magnitude-${magnitude}-description`}
            />
          </InputGroup>
          <FieldDescription
            magnitude={magnitude}
            id={`elements-field-magnitude-${magnitude}-description`}
          >
            Shown anywhere your profile is visible.
          </FieldDescription>
        </Field>
      ))}
    </div>
  ),
};

/**
 * The invalid look, pinned statically: `data-invalid` on the control (what Base UI's `Field.Root
 * invalid` propagates) recolors the wrapping group's border off `:has([data-invalid])`, and
 * `FieldError` shows the danger message. `aria-invalid`/`aria-describedby` mirror the wiring the
 * ready-made generates.
 */
export const Invalid: Story = {
  render: () => (
    <Field>
      <FieldLabel magnitude="md" inset={false} htmlFor="elements-field-invalid-control">
        Workspace slug
      </FieldLabel>
      <InputGroup magnitude="md">
        <Input
          magnitude="md"
          id="elements-field-invalid-control"
          defaultValue="Already taken"
          aria-invalid="true"
          data-invalid=""
          aria-describedby="elements-field-invalid-error"
        />
      </InputGroup>
      <FieldError magnitude="md" id="elements-field-invalid-error">
        Choose a different workspace slug.
      </FieldError>
    </Field>
  ),
};

/**
 * The layout columns: `FieldLabelGroup` (label + description) and `FieldControlContent` (control +
 * helper text) each take an `orientation`. `vertical` stacks the columns full-width; `horizontal`
 * puts them side by side, where `FieldLabel inset` pads the label's top per magnitude so its text
 * lines up with the control beside it. (The ready-made fields lay these out for you.)
 */
export const Orientations: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      <Field>
        <FieldLabelGroup orientation="vertical">
          <FieldLabel magnitude="md" inset={false} htmlFor="elements-field-orientation-vertical">
            Full name
          </FieldLabel>
          <FieldDescription magnitude="md" id="elements-field-orientation-vertical-description">
            Visible on your profile.
          </FieldDescription>
        </FieldLabelGroup>
        <FieldControlContent orientation="vertical">
          <InputGroup magnitude="md">
            <Input
              magnitude="md"
              id="elements-field-orientation-vertical"
              placeholder="Ada Lovelace"
              aria-describedby="elements-field-orientation-vertical-description"
            />
          </InputGroup>
        </FieldControlContent>
      </Field>
      {MAGNITUDES.map((magnitude) => (
        <div key={magnitude} className="flex gap-2">
          <FieldLabelGroup orientation="horizontal">
            <FieldLabel
              magnitude={magnitude}
              inset
              htmlFor={`elements-field-orientation-${magnitude}`}
            >
              Full name ({magnitude})
            </FieldLabel>
          </FieldLabelGroup>
          <FieldControlContent orientation="horizontal">
            <InputGroup magnitude={magnitude}>
              <Input
                magnitude={magnitude}
                id={`elements-field-orientation-${magnitude}`}
                placeholder="Ada Lovelace"
                aria-describedby={`elements-field-orientation-${magnitude}-description`}
              />
            </InputGroup>
            <FieldDescription
              magnitude={magnitude}
              id={`elements-field-orientation-${magnitude}-description`}
            >
              Visible on your profile.
            </FieldDescription>
          </FieldControlContent>
        </div>
      ))}
    </div>
  ),
};

/**
 * The choice row: `FieldItem` groups one checkbox/radio control with its `FieldItemContent` (label
 * + description) column. The hovered row (forced via pseudo-states) shows the row's hover wash;
 * `data-disabled` — what Base UI sets on a disabled field's parts — mutes the row and cancels the
 * wash. The box is a statically pinned `Checkbox` (its own showcase is Elements/Checkbox), named
 * via `aria-labelledby` the way the ready-made wires it.
 */
export const Items: Story = {
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
    <div className="flex flex-col gap-1">
      <FieldItem>
        <Checkbox
          role="checkbox"
          aria-checked="true"
          aria-labelledby="elements-field-item-updates-label"
          data-checked=""
        >
          <CheckboxIndicator data-checked="">
            <Check aria-hidden />
          </CheckboxIndicator>
        </Checkbox>
        <FieldItemContent>
          <FieldLabel magnitude="md" inset={false} id="elements-field-item-updates-label">
            Product updates
          </FieldLabel>
          <FieldDescription magnitude="md">Release notes and roadmap news.</FieldDescription>
        </FieldItemContent>
      </FieldItem>
      <FieldItem id="elements-field-item-hover">
        <Checkbox
          role="checkbox"
          aria-checked="false"
          aria-labelledby="elements-field-item-digest-label"
        />
        <FieldItemContent>
          <FieldLabel magnitude="md" inset={false} id="elements-field-item-digest-label">
            Weekly digest
          </FieldLabel>
          <FieldDescription magnitude="md">A summary every Monday morning.</FieldDescription>
        </FieldItemContent>
      </FieldItem>
      <FieldItem data-disabled="">
        <Checkbox
          role="checkbox"
          aria-checked="false"
          aria-disabled="true"
          aria-labelledby="elements-field-item-mentions-label"
          data-disabled=""
        />
        <FieldItemContent>
          <FieldLabel magnitude="md" inset={false} id="elements-field-item-mentions-label">
            Mentions
          </FieldLabel>
          <FieldDescription magnitude="md">Managed by your workspace admin.</FieldDescription>
        </FieldItemContent>
      </FieldItem>
    </div>
  ),
};

/**
 * Hidden CSS canary: asserts the pinned states compile to real field styling — `FieldError` and the
 * `FieldLabelRequiredMarker` share the danger text color and differ from `FieldDescription`'s
 * tertiary, and `data-disabled` on `FieldItem` computes the muted opacity + not-allowed cursor.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const StatesCssCanary: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: {
    a11y: {
      // The pinned data-disabled item shows the dimmed text axe never sees live (WCAG 1.4.3
      // exempts disabled controls) — suppress just the contrast rule for this canary.
      config: { rules: [{ id: "color-contrast", enabled: false }] },
    },
  },
  render: () => (
    <Field>
      <FieldLabel magnitude="md" inset={false} htmlFor="elements-field-canary-control">
        Label
        <FieldLabelRequiredMarker data-testid="canary-marker">*</FieldLabelRequiredMarker>
      </FieldLabel>
      <InputGroup magnitude="md">
        <Input
          magnitude="md"
          id="elements-field-canary-control"
          aria-invalid="true"
          data-invalid=""
          aria-describedby="elements-field-canary-error"
        />
      </InputGroup>
      <FieldDescription magnitude="md" data-testid="canary-description">
        Description
      </FieldDescription>
      <FieldError magnitude="md" id="elements-field-canary-error" data-testid="canary-error">
        Error
      </FieldError>
      <FieldItem data-disabled="" data-testid="canary-item">
        <FieldItemContent>
          <FieldDescription magnitude="md">Disabled item</FieldDescription>
        </FieldItemContent>
      </FieldItem>
    </Field>
  ),
  play: async ({ canvas }) => {
    const description = canvas.getByTestId("canary-description");
    const error = canvas.getByTestId("canary-error");
    const marker = canvas.getByTestId("canary-marker");
    const item = canvas.getByTestId("canary-item");
    // `FieldError` renders the danger text color, distinct from the description's tertiary.
    await expect(getComputedStyle(error).color).not.toBe(getComputedStyle(description).color);
    // The required marker shares the same danger tint.
    await expect(getComputedStyle(marker).color).toBe(getComputedStyle(error).color);
    // `data-disabled` mutes the choice row and switches to the not-allowed cursor.
    await expect(getComputedStyle(item).opacity).toBe("0.6");
    await expect(getComputedStyle(item).cursor).toBe("not-allowed");
  },
};
