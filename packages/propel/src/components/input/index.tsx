import { Field as BaseField } from "@base-ui/react/field";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Info } from "lucide-react";
import * as React from "react";

// Shared scale across Input + TextArea, taken from the Figma "Input fields"
// component (node 1582-168). The box has 12px horizontal padding at every
// magnitude; vertical padding and text sizes step up with `magnitude`.
//   md → text-14 value / text-13 label / text-12 helper, 6px v-padding
//   lg → text-14 value / text-14 label / text-13 helper, 12px v-padding
//   xl → text-16 value / text-14 label / text-13 helper, 12px v-padding

const labelVariants = cva("font-medium text-primary", {
  variants: {
    magnitude: {
      md: "text-13",
      lg: "text-14",
      xl: "text-14",
    },
  },
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

// The control's text size. The placeholder/value colors live on the element so
// they react to the empty/filled state without a prop.
const controlTextVariants = cva("", {
  variants: {
    magnitude: {
      md: "text-14",
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
 * The box chrome shared by `Input` and `TextArea`: background, 1px border whose
 * color swaps on hover / `:focus-within` / error, and horizontal padding. There
 * is NO ring or shadow — focus is a 1px border-color change (Figma). The radius
 * and vertical rhythm differ between the two, so they are passed in by each
 * component rather than baked in here.
 */
const boxVariants = cva(
  cx(
    "flex w-full items-center gap-1.5 bg-layer-2 px-3 transition-colors",
    "border-sm border-subtle hover:border-subtle-1 hover:bg-layer-2-hover",
    // `:focus-within` swaps the border to the accent color — no ring/shadow.
    "focus-within:border-accent-strong focus-within:bg-layer-2",
    // Disabled chrome: muted border, no hover, not-allowed cursor.
    "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-subtle has-[:disabled]:bg-layer-2 has-[:disabled]:hover:border-subtle",
  ),
  {
    variants: {
      tone: {
        neutral: "",
        // Error wins over hover/focus: the border stays danger-red.
        danger: "border-danger-strong hover:border-danger-strong focus-within:border-danger-strong",
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
 * The label row: label text, the required `*` asterisk in danger, and an
 * optional info icon. Rendered by `Input`/`TextArea` from their props, but also
 * usable directly when composing a field by hand.
 */
function FieldLabelRow({
  children,
  magnitude,
  required,
  info,
}: {
  children: React.ReactNode;
  magnitude: InputMagnitude;
  required?: boolean;
  info?: React.ReactNode;
}) {
  return (
    <BaseField.Label className={cx("flex items-center gap-0.5", labelVariants({ magnitude }))}>
      {children}
      {required ? (
        // Decorative — `required` on the control carries the real semantics.
        <span aria-hidden className="text-danger-primary">
          *
        </span>
      ) : null}
      {info ? (
        <span className="ml-0.5 inline-flex text-icon-secondary" aria-hidden>
          {info === true ? <Info className="size-3.5" /> : info}
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
    /** The label row primitive (label text + asterisk + info icon). */
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
  /** Optional info icon beside the label. Pass `true` for the default icon. */
  info?: React.ReactNode;
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
  info,
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
      className={cx("flex gap-1.5", horizontal ? "flex-row items-center" : "flex-col items-start")}
    >
      {label != null ? (
        <FieldLabelRow magnitude={magnitude} required={required} info={info}>
          {label}
        </FieldLabelRow>
      ) : null}
      <div className={cx("flex flex-col gap-1.5", horizontal ? "flex-1" : "w-full")}>
        <div
          className={cx(
            boxVariants({ tone }),
            "rounded-md",
            // md = 6px vertical padding; lg/xl = 12px.
            magnitude === "md" ? "py-1.5" : "py-3",
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

// Min-height per magnitude. md ≈ 130px box (Figma); lg/xl a touch taller.
const textAreaMinHeight: Record<InputMagnitude, string> = {
  md: "min-h-[130px]",
  lg: "min-h-[154px]",
  xl: "min-h-[154px]",
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
  info,
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
        <FieldLabelRow magnitude={magnitude} required={required} info={info}>
          {label}
        </FieldLabelRow>
      ) : null}
      <div
        className={cx(
          boxVariants({ tone }),
          // TextArea uses the larger radius and 8px vertical padding (Figma).
          "items-stretch rounded-lg py-2",
        )}
      >
        <BaseField.Control
          required={required}
          render={<textarea />}
          className={cx(
            "min-w-0 flex-1 resize-none bg-transparent text-primary outline-none",
            "placeholder:text-placeholder",
            "disabled:cursor-not-allowed disabled:text-disabled",
            textAreaMinHeight[magnitude],
            controlTextVariants({ magnitude }),
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
