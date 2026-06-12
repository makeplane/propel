import { Field } from "@base-ui/react/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
import { expect, fn, userEvent } from "storybook/test";
import { Button } from "../components/button/index";
import { IconButton } from "../components/icon-button/index";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
} from "../components/toolbar/index";

// A comment composer is a compositional (application-level) component, not a propel
// primitive: it is assembled entirely from propel building blocks (Toolbar, Button,
// IconButton, and a Field textarea). propel deliberately does not ship a `Comment`
// component; this story is a recipe showing how a downstream app builds one from the
// primitives, matching the Figma "Comment box" (node 2163-9916). Everything below
// lives in this story file. Nothing here is exported from propel.

// Magnitudes follow the Figma "Comment box" scale (Property 1): base / sm / xs. They
// share the bordered card surface and step down together so a compact composer stays
// internally consistent.
const commentVariants = cva("border border-subtle-1 bg-layer-2 text-primary", {
  variants: {
    magnitude: {
      // base/sm use radius/xl (12px) and stack their rows in a column; xs uses
      // radius/lg (8px) and lays the body + actions out in a single row.
      base: "flex w-full flex-col overflow-clip rounded-xl",
      sm: "flex w-full flex-col overflow-clip rounded-xl",
      xs: "flex w-full items-center gap-2 rounded-lg py-1.5 pe-1.5 ps-3",
    },
  },
});

type CommentMagnitude = NonNullable<VariantProps<typeof commentVariants>["magnitude"]>;

// The body textarea padding + type scale per magnitude, from Figma's "Add a comment"
// placeholder row.
const bodyVariants = cva(
  "w-full resize-none bg-transparent text-primary outline-none placeholder:text-placeholder",
  {
    variants: {
      magnitude: {
        base: "min-h-10 p-3 text-14 leading-snug",
        sm: "min-h-10 p-3 text-14 leading-snug",
        xs: "min-w-0 flex-1 text-12 leading-tight",
      },
    },
  },
);

// The formatting controls along the bottom bar (Figma node 2842-3905): a mention /
// reaction / link cluster, an inline B/I/U cluster, then a list + overflow cluster,
// divided by separators. These are presentational hooks the app wires to its own
// editor; here they just compose propel's Toolbar parts.
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

type CommentComposerProps = {
  /** Composer scale: base (default), sm, or xs. */
  magnitude?: CommentMagnitude;
  /** Controlled body value. Pair with onValueChange. */
  value?: string;
  /** Fires with the next body value as the user types (controlled mode). */
  onValueChange?: (value: string) => void;
  /** Initial body value when uncontrolled. */
  defaultValue?: string;
  /** Placeholder shown in the empty composer. */
  placeholder?: string;
  /** Accessible name for the textarea (visually hidden). */
  label?: React.ReactNode;
  /** Label for the submit button (base magnitude). */
  submitLabel?: React.ReactNode;
  /** Called with the body value when the user submits a non-empty comment. */
  onSubmit?: (value: string) => void;
};

// The recipe itself: a comment composer built from propel primitives. A consumer
// would own a component like this in their app; it is intentionally local to the story.
function CommentComposer({
  magnitude = "base",
  value,
  onValueChange,
  defaultValue,
  placeholder = "Add a comment",
  label = "Add a comment",
  submitLabel = "Comment",
  onSubmit,
}: CommentComposerProps) {
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

  const sendLabel = typeof submitLabel === "string" ? submitLabel : "Comment";

  const body = (
    <Field.Control
      render={<textarea rows={magnitude === "xs" ? 1 : 2} />}
      placeholder={placeholder}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onValueChange={handleValueChange}
      className={bodyVariants({ magnitude })}
    />
  );

  return (
    <Field.Root className={commentVariants({ magnitude })}>
      <Field.Label className="sr-only">{label}</Field.Label>

      {magnitude === "xs" ? (
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

const MAGNITUDES: CommentMagnitude[] = ["base", "sm", "xs"];

/**
 * A comment composer is a compositional component, so propel does not ship one. This
 * recipe shows how to build it from propel primitives (Toolbar, Button, IconButton,
 * and a Field textarea), matching the Figma "Comment box". Copy it into your app and
 * wire the formatting controls to your editor.
 */
const meta = {
  title: "Patterns/Comment composer",
  component: CommentComposer,
  args: {
    magnitude: "base",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2163-9916",
    },
  },
} satisfies Meta<typeof CommentComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The composer: a body input over a bottom bar that pairs propel's formatting Toolbar
 * with a "Comment" submit Button.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[640px]">
      <CommentComposer {...args} />
    </div>
  ),
};

/**
 * Every magnitude side by side. `base` ends in a text "Comment" Button, `sm` collapses
 * that to a send IconButton, and `xs` is a single compact row with an attach + send
 * cluster and no formatting Toolbar.
 */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-[640px] flex-col gap-6">
      {MAGNITUDES.map((magnitude) => (
        <CommentComposer key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </div>
  ),
};

/**
 * Typing enables the submit button; submitting calls `onSubmit` with the body text.
 * Tagged out of the sidebar/docs/manifest, it's a behavior canary, not an example.
 */
export const SubmitFlow: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onSubmit: fn(), submitLabel: "Comment" },
  play: async ({ args, canvas }) => {
    const textbox = canvas.getByRole("textbox", { name: "Add a comment" });
    const submit = canvas.getByRole("button", { name: "Comment" });

    await expect(submit).toBeDisabled();

    await userEvent.type(textbox, "Looks good to me");
    await expect(submit).toBeEnabled();

    await userEvent.click(submit);
    await expect(args.onSubmit).toHaveBeenCalledWith("Looks good to me");
  },
};
