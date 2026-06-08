import { Field } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// Magnitudes follow the Figma "Comment box" component scale (Property 1):
// base / sm / xs. The shell, its body input, and its action row all step down
// together so a compact composer stays internally consistent.
const commentVariants = cva(
  // The composer surface: a bordered card on `layer-2` that clips its rounded
  // corners. Figma uses `border/subtle-1` for the resting border.
  "flex w-full flex-col overflow-clip border border-subtle-1 bg-layer-2 text-primary",
  {
    variants: {
      magnitude: {
        // Figma: base/sm use `radius/xl` (12px); xs uses `radius/lg` (8px).
        base: "rounded-xl",
        sm: "rounded-xl",
        xs: "rounded-lg",
      },
    },
  },
);

export type CommentMagnitude = NonNullable<VariantProps<typeof commentVariants>["magnitude"]>;

// The body textarea padding + type scale per magnitude, straight from Figma's
// "Add a comment" placeholder row.
const bodyVariants = cva(
  // Auto-growing single control: a borderless textarea that fills the row, with
  // the muted placeholder color and no focus ring of its own (the shell owns focus).
  "w-full resize-none bg-transparent text-primary outline-none placeholder:text-placeholder",
  {
    variants: {
      magnitude: {
        base: "min-h-10 p-3 text-14 leading-snug",
        sm: "min-h-10 p-3 text-14 leading-snug",
        xs: "px-3 py-1.5 text-12 leading-tight",
      },
    },
  },
);

// The formatting / action row that sits under (base/sm) or beside (xs) the body.
const toolbarRowVariants = cva("flex items-center justify-between gap-2", {
  variants: {
    magnitude: {
      base: "min-h-9 py-1 pr-1.5 pl-1",
      sm: "min-h-9 py-1 pr-1.5 pl-1",
      xs: "min-h-9 py-1 pr-1.5 pl-1",
    },
  },
});

// The submit button. Figma's base variant is a text button on `layer-2` with a
// strong border + raised shadow; it scales its padding/type down with magnitude.
const submitVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md border border-strong bg-layer-2 font-medium text-secondary shadow-raised-200 transition-colors enabled:hover:bg-layer-2-hover disabled:cursor-not-allowed disabled:border-disabled disabled:bg-layer-disabled disabled:text-disabled",
  {
    variants: {
      magnitude: {
        base: "h-6 min-w-10 px-2 text-13",
        sm: "h-6 min-w-10 px-2 text-13",
        xs: "h-6 min-w-10 px-2 text-12",
      },
    },
  },
);

export type CommentProps = Omit<
  React.ComponentProps<typeof Field.Root>,
  "className" | "render" | "style" | "onSubmit"
> & {
  /** Composer scale — `base` (default), `sm`, or `xs`. */
  magnitude?: CommentMagnitude;
  /** Controlled value of the comment body. Pair with `onValueChange`. */
  value?: string;
  /** Fires with the next body value as the user types (controlled mode). */
  onValueChange?: (value: string) => void;
  /** Initial body value when uncontrolled. */
  defaultValue?: string;
  /** Placeholder shown in the empty composer. Defaults to "Add a comment". */
  placeholder?: string;
  /**
   * Accessible name for the textarea. Rendered as a visually-hidden field label so
   * the control is always named. Defaults to "Add a comment".
   */
  label?: React.ReactNode;
  /**
   * Formatting-controls slot rendered on the left of the action row. The consumer
   * passes their own toolbar here — this shell is presentational and ships no editor.
   */
  toolbar?: React.ReactNode;
  /** Label for the submit button. Defaults to "Comment". */
  submitLabel?: React.ReactNode;
  /** Called with the current body value when the user submits a non-empty comment. */
  onSubmit?: (value: string) => void;
};

/**
 * Comment — a presentational composer shell (Figma "Comment box", node 1969-6968).
 *
 * It frames a comment body input, a `toolbar` slot for consumer-provided formatting
 * controls, and a submit button. The rich-text editor itself is intentionally out
 * of scope: pass your editor's formatting controls via `toolbar` and read the body
 * through `value`/`onValueChange` (or uncontrolled via `defaultValue`).
 */
export function Comment({
  magnitude = "base",
  value,
  onValueChange,
  defaultValue,
  placeholder = "Add a comment",
  label = "Add a comment",
  toolbar,
  submitLabel = "Comment",
  onSubmit,
  ...props
}: CommentProps) {
  // Track the body text so the submit button can disable itself when empty. In
  // controlled mode the prop is the source of truth; otherwise mirror the
  // uncontrolled value locally just for the empty/disabled check.
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const isEmpty = currentValue.trim().length === 0;

  const handleValueChange = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const handleSubmit = () => {
    if (isEmpty) return;
    onSubmit?.(currentValue);
  };

  return (
    <Field.Root className={commentVariants({ magnitude })} {...props}>
      {/* Field auto-associates the label with the control; keep it visually hidden
          so the composer reads as the design while staying named for a11y. */}
      <Field.Label className="sr-only">{label}</Field.Label>
      <Field.Control
        // Render as a textarea instead of the default <input> so the body can wrap
        // and (optionally) auto-grow; Field wires the accessible name + value.
        render={<textarea rows={magnitude === "xs" ? 1 : 2} />}
        placeholder={placeholder}
        value={isControlled ? value : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        onValueChange={handleValueChange}
        className={bodyVariants({ magnitude })}
      />
      <div className={toolbarRowVariants({ magnitude })}>
        {/* Consumer-provided formatting controls; an empty slot keeps the layout. */}
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">{toolbar}</div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isEmpty}
          className={submitVariants({ magnitude })}
        >
          {submitLabel}
        </button>
      </div>
    </Field.Root>
  );
}
