import { Field } from "@base-ui/react/field";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ArrowUp,
  AtSign,
  Bold,
  Italic,
  Link,
  List,
  MoreHorizontal,
  Paperclip,
  SmilePlus,
  Underline,
} from "lucide-react";
import * as React from "react";
import { Button } from "../button/index";
import { IconButton } from "../icon-button/index";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
} from "../toolbar/index";

// Magnitudes follow the Figma "Comment box" component scale (Property 1):
// base / sm / xs. They share the bordered card surface and step down together so a
// compact composer stays internally consistent.
//
// - base (Figma "lg", node 2099-536): full card with a body row on top and a bottom
//   bar that pairs the formatting Toolbar with a text "Comment" Button.
// - sm (Figma "md", node 2163-7628): the same stacked card, but the bottom bar's
//   action collapses to a single send IconButton (up arrow).
// - xs (Figma "sm", node 2163-9378): a single compact row — the body sits inline
//   with an attach + send IconButton cluster, no formatting Toolbar.
const commentVariants = cva("border border-subtle-1 bg-layer-2 text-primary", {
  variants: {
    magnitude: {
      // Figma: base/sm use `radius/xl` (12px) and stack their rows in a column;
      // xs uses `radius/lg` (8px) and lays the body + actions out in a single row.
      base: "flex w-full flex-col overflow-clip rounded-xl",
      sm: "flex w-full flex-col overflow-clip rounded-xl",
      xs: "flex w-full items-center gap-2 rounded-lg py-1.5 pe-1.5 ps-3",
    },
  },
});

export type CommentMagnitude = NonNullable<VariantProps<typeof commentVariants>["magnitude"]>;

// The body textarea padding + type scale per magnitude, straight from Figma's
// "Add a comment" placeholder row.
const bodyVariants = cva(
  // Auto-growing borderless textarea that fills the row, with the muted placeholder
  // color and no focus ring of its own (the shell owns focus).
  "w-full resize-none bg-transparent text-primary outline-none placeholder:text-placeholder",
  {
    variants: {
      magnitude: {
        base: "min-h-10 p-3 text-14 leading-snug",
        sm: "min-h-10 p-3 text-14 leading-snug",
        // xs body sits inline in the row, so it carries no padding of its own.
        xs: "min-w-0 flex-1 text-12 leading-tight",
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
  /** Label for the submit button (base magnitude only). Defaults to "Comment". */
  submitLabel?: React.ReactNode;
  /** Called with the current body value when the user submits a non-empty comment. */
  onSubmit?: (value: string) => void;
};

// The formatting controls shown along the bottom bar (Figma node 2842-3905): a
// mention / reaction / link cluster, an inline B/I/U cluster, then a list + overflow
// cluster, divided by separators. These are presentational hooks — the consumer
// wires them to their own editor; here they just compose propel's Toolbar parts so
// the composer matches the design out of the box.
function FormattingToolbar() {
  return (
    <Toolbar variant="bottom-bar" aria-label="Comment formatting">
      <ToolbarGroup aria-label="Insert">
        <ToolbarButton aria-label="Mention someone">
          <AtSign aria-hidden />
        </ToolbarButton>
        <ToolbarButton aria-label="Add reaction">
          <SmilePlus aria-hidden />
        </ToolbarButton>
        <ToolbarButton aria-label="Add link">
          <Link aria-hidden />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold">
          <Bold aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Italic">
          <Italic aria-hidden />
        </ToolbarToggle>
        <ToolbarToggle aria-label="Underline">
          <Underline aria-hidden />
        </ToolbarToggle>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Lists">
        <ToolbarButton aria-label="Bulleted list">
          <List aria-hidden />
        </ToolbarButton>
        <ToolbarButton aria-label="More formatting">
          <MoreHorizontal aria-hidden />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

/**
 * Comment — a comment composer (Figma "Comment box", node 2163-9916).
 *
 * It composes propel's `Toolbar` (the formatting controls), `Button` and
 * `IconButton` (the actions) around a labeled comment body, matching the design's
 * three magnitudes. The rich-text editor itself is out of scope: the formatting
 * controls are presentational and the body text is read through `value` /
 * `onValueChange` (or uncontrolled via `defaultValue`), with `onSubmit` firing the
 * current body on a non-empty submit.
 */
export function Comment({
  magnitude = "base",
  value,
  onValueChange,
  defaultValue,
  placeholder = "Add a comment",
  label = "Add a comment",
  submitLabel = "Comment",
  onSubmit,
  ...props
}: CommentProps) {
  // Track the body text so the submit control can disable itself when empty. In
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

  // The icon-only send action needs a plain string accessible name. Use the submit
  // label when it's a string, otherwise fall back to a sensible default.
  const sendLabel = typeof submitLabel === "string" ? submitLabel : "Comment";

  const body = (
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
  );

  return (
    <Field.Root className={commentVariants({ magnitude })} {...props}>
      {/* Field auto-associates the label with the control; keep it visually hidden
          so the composer reads as the design while staying named for a11y. */}
      <Field.Label className="sr-only">{label}</Field.Label>

      {magnitude === "xs" ? (
        // Compact single-row composer: inline body, then an attach + send cluster.
        <>
          {body}
          <div className="flex shrink-0 items-center gap-1.5">
            <span aria-hidden className="h-4 w-0 shrink-0 border-s-sm border-subtle-1" />
            <IconButton
              variant="ghost"
              tone="neutral"
              magnitude="md"
              icon={<Paperclip aria-hidden />}
              aria-label="Attach a file"
            />
            <IconButton
              variant="secondary"
              tone="neutral"
              magnitude="md"
              icon={<ArrowUp aria-hidden />}
              aria-label={sendLabel}
              disabled={isEmpty}
              onClick={handleSubmit}
            />
          </div>
        </>
      ) : (
        // Stacked composer: body row on top, then the formatting + action bottom bar.
        <>
          {body}
          <div className="flex min-h-9 items-center justify-between gap-2 py-1 pe-1.5 ps-1">
            <div className="flex min-w-0 items-center overflow-x-auto">
              <FormattingToolbar />
            </div>
            {magnitude === "base" ? (
              <Button
                variant="secondary"
                tone="neutral"
                magnitude="md"
                disabled={isEmpty}
                onClick={handleSubmit}
              >
                {submitLabel}
              </Button>
            ) : (
              <IconButton
                variant="secondary"
                tone="neutral"
                magnitude="md"
                icon={<ArrowUp aria-hidden />}
                aria-label={sendLabel}
                disabled={isEmpty}
                onClick={handleSubmit}
              />
            )}
          </div>
        </>
      )}
    </Field.Root>
  );
}
