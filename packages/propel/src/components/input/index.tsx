import { Field as BaseField } from "@base-ui/react/field";
import { cva, cx, type VariantProps } from "class-variance-authority";
import * as React from "react";

// Shared scale across Input + TextArea, taken from the Figma "Input fields"
// component (node 1582-168). The box has 12px horizontal padding at every
// magnitude; label/helper text and the Input's value text + vertical padding
// step up with `magnitude`.
//   md → label text-13 / helper text-12; Input value text-14, v-padding 6px
//   lg → label text-14 / helper text-13; Input value text-14, v-padding 8px
//   xl → label text-14 / helper text-13; Input value text-16, v-padding 12px
// TextArea value text differs at md (text-13 vs Input's text-14) — see
// `textAreaTextVariants` — and TextArea keeps a constant 8px v-padding.

// The label text. `magnitude` drives the size. `inset` is the horizontal layout's
// alignment for a lone label (no description): it adds a magnitude-matched top
// padding equal to the box's top padding + border (md 6+1, lg 8+1, xl 12+1 px) so
// the single label line sits level with the control's value instead of hugging the
// top of the box. It is a `FieldLabel` so it never accepts styling from a consumer.
const labelVariants = cva("font-medium text-primary", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-14",
    },
    inset: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    { magnitude: "md", inset: true, class: "pt-[7px]" },
    { magnitude: "lg", inset: true, class: "pt-[9px]" },
    { magnitude: "xl", inset: true, class: "pt-[13px]" },
  ],
});

// The supporting text size for the `description` (below the label) and the
// `hint`/`error` (below the control). Figma: md text-12, lg/xl text-13.
const helperVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-12",
      lg: "text-13",
      xl: "text-13",
    },
  },
});

// The control's text size for the single-line `Input`. The placeholder/value
// colors live on the element so they react to the empty/filled state without a
// prop. (Figma: md value text-14, lg text-14, xl text-16.)
const controlTextVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-14",
      lg: "text-14",
      xl: "text-16",
    },
  },
});

// The control's text size for the multi-line `TextArea`. This differs from
// `Input` at `md`: the Figma "Text area" component (node 1582-168) uses a
// text-13 value at md, text-14 at lg, text-16 at xl.
const textAreaTextVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-16",
    },
  },
});

export type InputMagnitude = NonNullable<VariantProps<typeof labelVariants>["magnitude"]>;

// All field tones. `danger` is the Figma "error" treatment — it only changes
// the border + helper color; the rest of the chrome is shared.
export type InputTone = "neutral" | "danger";

/**
 * The box chrome shared by `Input` and `TextArea`: background and 1px border. Horizontal padding is
 * not part of the shared chrome -> each component adds it itself (`Input` pads the box, `TextArea`
 * pads the control; see the class comment below). The border color is owned entirely by the `tone`
 * variant (rather than overriding a base color, which is order-fragile in Tailwind) so the error
 * treatment always wins:
 *
 * Neutral → subtle border; hover darkens it; on `:focus-within` it becomes `accent-strong` plus a
 * 2px accent ring at 20% opacity (Figma's "active" state: border-accent-strong + 0 0 0 2px
 * rgba(accent,.2)). Hovering the active field must NOT change the chrome, so the accent border +
 * resting background are re-asserted at the higher `:focus-within:hover` specificity, which beats
 * the plain `:hover` styles when both apply (the ring is focus-only, so it already holds). danger →
 * `danger-strong` border at ALL times — resting, hover, and focus — with no accent ring (Figma's
 * "error" state).
 *
 * Disabled resets the border to subtle and removes hover/ring affordances. The radius and vertical
 * rhythm differ between Input and TextArea, so they are passed in by each component rather than
 * baked in here.
 */
const boxVariants = cva(
  cx(
    // Horizontal padding is added per component: the single-line `Input` pads the box
    // (`px-3`) so its value + icons sit inset, while the `TextArea` leaves the box
    // edge-to-edge and pads the control instead, so its scrollbar sits flush with the
    // container's right border rather than 12px in.
    "flex w-full items-center gap-1.5 bg-layer-2 transition-[color,background-color,border-color,box-shadow]",
    "border-sm",
    // Disabled chrome: muted border, no hover/ring, not-allowed cursor.
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:ring-0 has-[:disabled]:hover:border-subtle",
  ),
  {
    variants: {
      tone: {
        neutral: cx(
          "border-subtle hover:border-subtle-1 hover:bg-layer-2-hover",
          // Figma "active": accent border + 2px accent ring at 20% opacity.
          "focus-within:border-accent-strong focus-within:bg-layer-2 focus-within:ring-2 focus-within:ring-accent-strong/20",
          // Hovering while active keeps the active chrome: re-assert the accent border
          // + resting background at the higher `:focus-within:hover` specificity so
          // they win over the plain `:hover` styles above.
          "focus-within:hover:border-accent-strong focus-within:hover:bg-layer-2",
        ),
        // Error border persists regardless of hover/focus, with no accent ring.
        danger: "border-danger-strong",
      },
    },
  },
);

// 16px lucide icons in the leading/trailing slots, muted to the Figma
// `icon/secondary` color.
const iconSlotClass = cx(
  "flex shrink-0 items-center justify-center text-icon-secondary",
  "[&_svg]:size-4",
);

export type FieldProps = React.ComponentProps<typeof BaseField.Root>;

/**
 * The shared field chrome for custom controls (e.g. a Select) with the same label/helper/error
 * treatment that `Input` and `TextArea` use. Compose it with the named child exports: `FieldLabel`,
 * `FieldControl`, `FieldDescription`, and `FieldError`.
 */
export function Field(props: FieldProps) {
  return <BaseField.Root {...props} />;
}

export type FieldLabelProps = {
  children: React.ReactNode;
  magnitude: InputMagnitude;
  required?: boolean;
  inset?: boolean;
};

/**
 * The label row: the label text and the required `*` asterisk in danger. Rendered by
 * `Input`/`TextArea`, but also usable directly when composing a field by hand.
 */
export function FieldLabel({ children, magnitude, required, inset }: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cx("inline-flex items-center gap-0.5", labelVariants({ magnitude, inset }))}
    >
      {children}
      {required ? (
        // Decorative: `required` on the control carries the real semantics.
        <span aria-hidden className="text-danger-primary">
          *
        </span>
      ) : null}
    </BaseField.Label>
  );
}

export type FieldDescriptionProps = React.ComponentProps<typeof BaseField.Description>;

/** Supporting / helper text for a custom field. */
export function FieldDescription(props: FieldDescriptionProps) {
  return <BaseField.Description {...props} />;
}

export type FieldErrorProps = React.ComponentProps<typeof BaseField.Error>;

/** Error text for a custom field. */
export function FieldError(props: FieldErrorProps) {
  return <BaseField.Error {...props} />;
}

export type FieldControlProps = React.ComponentProps<typeof BaseField.Control>;

/** Control slot for a custom field. Renders an `<input>` by default. */
export function FieldControl(props: FieldControlProps) {
  return <BaseField.Control {...props} />;
}

// The label column: the label row with its supporting `description` stacked
// directly below it (Figma stacks them with a 4px gap, then a 12px gap to the
// control). `orientation` sizes the column to its layout — full width when the label
// sits above the control (`vertical`), a flex column when it sits beside it
// (`horizontal`).
const labelGroupVariants = cva("flex flex-col gap-1", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "min-w-0 flex-1",
    },
  },
});

function FieldLabelGroup({
  magnitude,
  required,
  label,
  description,
  orientation,
}: {
  magnitude: InputMagnitude;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  orientation: NonNullable<VariantProps<typeof labelGroupVariants>["orientation"]>;
}) {
  if (label == null && description == null) {
    return null;
  }
  // Horizontal with no description: a lone label should sit on the control's value
  // line, so it gets the magnitude-matched top inset. With a description the
  // label + description block top-aligns with the box, so no inset.
  const inset = orientation === "horizontal" && description == null;
  return (
    <div className={labelGroupVariants({ orientation })}>
      {label != null ? (
        <FieldLabel magnitude={magnitude} required={required} inset={inset}>
          {label}
        </FieldLabel>
      ) : null}
      {description != null ? (
        <BaseField.Description className={cx("text-tertiary", helperVariants({ magnitude }))}>
          {description}
        </BaseField.Description>
      ) : null}
    </div>
  );
}

// The helper line below the control: the `error` text in danger when present,
// otherwise the `hint` in the muted tertiary color. `error` overrides `hint`,
// matching the Figma "error" state where the helper text turns red.
function FieldHelperText({
  magnitude,
  hint,
  error,
}: {
  magnitude: InputMagnitude;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}) {
  if (error != null) {
    return (
      <BaseField.Error match className={cx("text-danger-primary", helperVariants({ magnitude }))}>
        {error}
      </BaseField.Error>
    );
  }
  if (hint != null) {
    return (
      <BaseField.Description className={cx("text-tertiary", helperVariants({ magnitude }))}>
        {hint}
      </BaseField.Description>
    );
  }
  return null;
}

// Props every text field shares. `className`/`style` are intentionally omitted:
// the components own their styling so every field looks the same.
type SharedFieldProps = {
  /** Magnitude scale. `md` | `lg` | `xl`. */
  magnitude: InputMagnitude;
  /** Resting treatment. `neutral` | `danger` (the Figma "error" state). */
  tone: InputTone;
  /** Label text shown above (or beside) the control. */
  label?: React.ReactNode;
  /** Marks the field required: adds a `*` asterisk and sets `required`. */
  required?: boolean;
  /** Supporting text shown directly below the label. */
  description?: React.ReactNode;
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. Overrides `hint`; pair with `tone="danger"`. */
  error?: React.ReactNode;
};

export type InputProps = Omit<FieldControlProps, "className" | "render" | "style"> &
  SharedFieldProps & {
    /** Label placement: `vertical` (label above) | `horizontal` (label beside). */
    orientation: "vertical" | "horizontal";
    /** A 16px lucide icon rendered before the control. */
    leadingIcon?: React.ReactNode;
    /** A 16px lucide icon rendered after the control. */
    trailingIcon?: React.ReactNode;
  };

/**
 * Single-line text field built on Base UI `Field`. Supports leading/trailing icon slots and a
 * `horizontal` orientation where the label sits beside the control. States are element-driven
 * (hover / focus / filled / disabled / invalid), not props — only `tone="danger"` forces the error
 * treatment.
 */
export function Input({
  magnitude,
  tone,
  orientation,
  label,
  required,
  description,
  hint,
  error,
  leadingIcon,
  trailingIcon,
  disabled,
  ...controlProps
}: InputProps) {
  const horizontal = orientation === "horizontal";
  return (
    <BaseField.Root
      disabled={disabled}
      // `tone="danger"` mirrors the error treatment even without HTML validity.
      invalid={tone === "danger" || undefined}
      className={cx(
        // The label column sits beside (horizontal) or above (vertical) the control
        // column with an 8px gap, top-aligned (`items-start`).
        "flex gap-2",
        horizontal ? "flex-row items-start" : "flex-col items-start",
      )}
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation={orientation}
      />
      <div className={cx("flex flex-col", horizontal ? "min-w-0 flex-1 gap-2" : "w-full gap-1.5")}>
        <div
          className={cx(
            boxVariants({ tone }),
            "rounded-md px-3",
            // Vertical padding per Figma: md 6px, lg 8px, xl 12px.
            // (Side padding is a constant 12px via `px-3`.)
            magnitude === "md" ? "py-1.5" : magnitude === "lg" ? "py-2" : "py-3",
          )}
        >
          {leadingIcon ? (
            <span aria-hidden className={iconSlotClass}>
              {leadingIcon}
            </span>
          ) : null}
          <BaseField.Control
            required={required}
            className={cx(
              "min-w-0 flex-1 bg-transparent text-primary outline-none",
              "placeholder:text-placeholder",
              "disabled:cursor-not-allowed disabled:text-disabled",
              controlTextVariants({ magnitude }),
            )}
            {...controlProps}
          />
          {trailingIcon ? (
            <span aria-hidden className={iconSlotClass}>
              {trailingIcon}
            </span>
          ) : null}
        </div>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </div>
    </BaseField.Root>
  );
}

export type TextAreaProps = Omit<FieldControlProps, "className" | "render" | "style"> &
  SharedFieldProps;

// Min-height of the control per magnitude. The Figma "Text area" component
// (node 1582-168) sizes the *box* to 82px at md and 100px at lg/xl; subtracting
// the box's 16px vertical padding (8px top + 8px bottom) gives the control's
// min-height below, so the rendered box matches Figma.
const textAreaMinHeight: Record<InputMagnitude, string> = {
  md: "min-h-[66px]",
  lg: "min-h-[84px]",
  xl: "min-h-[84px]",
};

/**
 * Multi-line text field built on Base UI `Field`, rendering the control as a `<textarea>`. Vertical
 * layout only (no `orientation`); `resize-none` by default with a magnitude-driven min-height.
 */
export function TextArea({
  magnitude,
  tone,
  label,
  required,
  description,
  hint,
  error,
  disabled,
  ...controlProps
}: TextAreaProps) {
  return (
    <BaseField.Root
      disabled={disabled}
      invalid={tone === "danger" || undefined}
      className="flex w-full flex-col items-start gap-2"
    >
      <FieldLabelGroup
        magnitude={magnitude}
        required={required}
        label={label}
        description={description}
        orientation="vertical"
      />
      <div className="flex w-full flex-col gap-1.5">
        <div
          className={cx(
            boxVariants({ tone }),
            // TextArea uses the larger radius and a FIXED 8px vertical padding at
            // every magnitude (Figma: `py spacing/2` for md/lg/xl). Unlike the
            // single-line Input, magnitude does NOT change the box's vertical
            // padding here — it drives the control's font-size + min-height. The box
            // gets no horizontal padding: the control spans edge-to-edge and pads
            // itself (`px-3`) so the native scrollbar sits flush with the right border.
            "items-stretch rounded-lg py-2",
          )}
        >
          <BaseField.Control
            required={required}
            render={<textarea />}
            className={cx(
              // A `<textarea>` scrolls its own content natively, so it can't be wrapped
              // in a `ScrollArea` like other overflow surfaces. `scrollbar-sm` re-skins
              // its native scrollbar with the propel scrollbar tokens instead. The
              // control owns the 12px horizontal padding (the box has none) so the
              // scrollbar is flush against the container edge with no gap.
              "scrollbar-sm min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-3 text-primary outline-none",
              "placeholder:text-placeholder",
              "disabled:cursor-not-allowed disabled:text-disabled",
              textAreaMinHeight[magnitude],
              textAreaTextVariants({ magnitude }),
            )}
            {...controlProps}
          />
        </div>
        <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
      </div>
    </BaseField.Root>
  );
}
