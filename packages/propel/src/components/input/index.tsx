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

// The label row. `magnitude` drives the text size; `inset` is the horizontal
// layout's top alignment: when the label sits beside the control box it gets a
// magnitude-matched top padding so its first text line lines up with the
// control's value line (the box's vertical padding md 6px / lg 8px / xl 12px
// plus its 1px border = 7px / 9px / 13px). It's a compound variant rather than
// a className escape hatch so the public `Field.Label` never accepts styling.
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
 * The box chrome shared by `Input` and `TextArea`: background, 1px border, and
 * horizontal padding. The border color is owned entirely by the `tone` variant
 * (rather than overriding a base color, which is order-fragile in Tailwind) so
 * the error treatment always wins:
 *
 *   neutral → subtle border; hover darkens it; on `:focus-within` it becomes
 *             `accent-strong` plus a 2px accent ring at 20% opacity (Figma's
 *             "active" state: border-accent-strong + 0 0 0 2px rgba(accent,.2)).
 *   danger  → `danger-strong` border at ALL times — resting, hover, and focus —
 *             with no accent ring (Figma's "error" state).
 *
 * Disabled resets the border to subtle and removes hover/ring affordances. The
 * radius and vertical rhythm differ between Input and TextArea, so they are
 * passed in by each component rather than baked in here.
 */
const boxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 bg-layer-2 px-3 transition-[color,background-color,border-color,box-shadow]",
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

/**
 * The label row: the label text and the required `*` asterisk in danger. Rendered by
 * `Input`/`TextArea` from their props, but also usable directly when composing a field
 * by hand.
 */
function FieldLabelRow({
  children,
  magnitude,
  required,
  inset,
}: {
  children: React.ReactNode;
  magnitude: InputMagnitude;
  required?: boolean;
  /**
   * Top-align the label with the control's value line in the `horizontal`
   * layout. Adds a magnitude-matched top inset so the label's first text line
   * sits level with the control's text. Internal-only, keeps the public
   * `Field.Label` free of styling props.
   */
  inset?: boolean;
}) {
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

/**
 * The shared field chrome, exposed as a compound so callers can build custom
 * controls (e.g. a Select) with the same label/helper/error treatment that
 * `Input` and `TextArea` use. `Field` itself is `Field.Root` (it groups the
 * parts); the label/control/helper/error parts hang off it and map onto Base
 * UI's `Field` parts.
 */
export const Field = Object.assign(
  // The component is `Field.Root`, so `<Field>…</Field>` groups a custom field.
  (props: React.ComponentProps<typeof BaseField.Root>) => <BaseField.Root {...props} />,
  {
    /** Groups the label, control, and helper/error. Renders a `<div>`. */
    Root: BaseField.Root,
    /** The label row primitive (label text + asterisk). */
    Label: FieldLabelRow,
    /** Helper / description text below the control (`text-tertiary`). */
    Description: BaseField.Description,
    /** Error text, shown when the field is invalid (`text-danger`). */
    Error: BaseField.Error,
    /** The control slot — renders an `<input>` by default. */
    Control: BaseField.Control,
  },
);

type FieldControlProps = React.ComponentProps<typeof BaseField.Control>;

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
  /** Helper / description text below the control. */
  description?: React.ReactNode;
  /** Error text below the control. Shown when invalid (or when `tone="danger"`). */
  error?: React.ReactNode;
};

export type InputProps = Omit<FieldControlProps, "className" | "render" | "style"> &
  SharedFieldProps & {
    /** `vertical` (label above) | `horizontal` (label beside). */
    variant: "vertical" | "horizontal";
    /** A 16px lucide icon rendered before the control. */
    leadingIcon?: React.ReactNode;
    /** A 16px lucide icon rendered after the control. */
    trailingIcon?: React.ReactNode;
  };

/**
 * Single-line text field built on Base UI `Field`. Supports leading/trailing
 * icon slots and a `horizontal` variant where the label sits beside the control.
 * States are element-driven (hover / focus / filled / disabled / invalid), not
 * props — only `tone="danger"` forces the error treatment.
 */
export function Input({
  magnitude,
  tone,
  variant,
  label,
  required,
  description,
  error,
  leadingIcon,
  trailingIcon,
  disabled,
  ...controlProps
}: InputProps) {
  const horizontal = variant === "horizontal";
  return (
    <BaseField.Root
      disabled={disabled}
      // `tone="danger"` mirrors the error treatment even without HTML validity.
      invalid={tone === "danger" || undefined}
      className={cx(
        "flex",
        // Figma "horizontal" (node 1582-168) lays the label column beside the
        // control column with a 12px gap, top-aligned (`items-start`): the label
        // hugs the top of the control box rather than centering against it, so a
        // label + helper stack reads from the top down. Vertical keeps the 6px
        // (gap-1.5) rhythm with the label stacked above.
        horizontal ? "flex-row items-start gap-3" : "flex-col items-start gap-1.5",
      )}
    >
      {label != null ? (
        <FieldLabelRow
          magnitude={magnitude}
          required={required}
          // In `horizontal` the label sits beside the control box, top-aligned
          // (`items-start`). The box adds vertical padding (md 6px / lg 8px /
          // xl 12px) plus a 1px border before its text, so the label gets a
          // matching top inset to line its first text line up with the control's
          // value line. Vertical doesn't need this — the label stacks above.
          inset={horizontal}
        >
          {label}
        </FieldLabelRow>
      ) : null}
      <div className={cx("flex flex-col gap-1.5", horizontal ? "flex-1" : "w-full")}>
        <div
          className={cx(
            boxVariants({ tone }),
            "rounded-md",
            // Vertical padding per Figma: md 6px, lg 8px, xl 12px.
            // (Side padding is a constant 12px via `px-3` in boxVariants.)
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
        {description != null ? (
          <BaseField.Description className={cx("text-tertiary", helperVariants({ magnitude }))}>
            {description}
          </BaseField.Description>
        ) : null}
        {error != null ? (
          <BaseField.Error
            // `match` lets validity drive visibility; when `tone="danger"` the
            // Root is `invalid`, so the error always shows.
            match={tone === "danger" ? true : undefined}
            className={cx("text-danger-primary", helperVariants({ magnitude }))}
          >
            {error}
          </BaseField.Error>
        ) : null}
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
 * Multi-line text field built on Base UI `Field`, rendering the control as a
 * `<textarea>`. Vertical layout only (no `variant`); `resize-none` by default
 * with a magnitude-driven min-height. This is the editor primitive the Comment
 * composer builds on.
 */
export function TextArea({
  magnitude,
  tone,
  label,
  required,
  description,
  error,
  disabled,
  ...controlProps
}: TextAreaProps) {
  return (
    <BaseField.Root
      disabled={disabled}
      invalid={tone === "danger" || undefined}
      className="flex w-full flex-col items-start gap-1.5"
    >
      {label != null ? (
        <FieldLabelRow magnitude={magnitude} required={required}>
          {label}
        </FieldLabelRow>
      ) : null}
      <div
        className={cx(
          boxVariants({ tone }),
          // TextArea uses the larger radius and a FIXED 8px vertical padding at
          // every magnitude (Figma: `py spacing/2` for md/lg/xl). Unlike the
          // single-line Input, magnitude does NOT change the box's vertical
          // padding here — it drives the control's font-size + min-height.
          "items-stretch rounded-lg py-2",
        )}
      >
        <BaseField.Control
          required={required}
          render={<textarea />}
          className={cx(
            // `overflow-y-auto` matches the Dropdown popup's scroll behavior: a
            // native scrollbar that only appears once the content overflows,
            // instead of the textarea's default always-reserved gutter.
            "min-w-0 flex-1 resize-none overflow-y-auto bg-transparent text-primary outline-none",
            "placeholder:text-placeholder",
            "disabled:cursor-not-allowed disabled:text-disabled",
            textAreaMinHeight[magnitude],
            textAreaTextVariants({ magnitude }),
          )}
          {...controlProps}
        />
      </div>
      {description != null ? (
        <BaseField.Description className={cx("text-tertiary", helperVariants({ magnitude }))}>
          {description}
        </BaseField.Description>
      ) : null}
      {error != null ? (
        <BaseField.Error
          match={tone === "danger" ? true : undefined}
          className={cx("text-danger-primary", helperVariants({ magnitude }))}
        >
          {error}
        </BaseField.Error>
      ) : null}
    </BaseField.Root>
  );
}
