import { Button } from "@makeplane/propel/components/button";
import { Field } from "@makeplane/propel/components/field";
import { Icon } from "@makeplane/propel/components/icon";
import { TextArea } from "@makeplane/propel/components/text-area";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarToggle,
} from "@makeplane/propel/components/toolbar";
import { AtSign, Bold, Italic, Link, SmilePlus, Underline } from "lucide-react";
import * as React from "react";

// The comment-composer recipe from propel's patterns: an application-level block
// assembled from Toolbar, TextArea, and Button — propel ships the primitives, not
// the composer.
export default function CommentComposerDemo() {
  const controlId = React.useId();
  const [value, setValue] = React.useState("");
  const isEmpty = value.trim().length === 0;

  return (
    <Field name="comment">
      <div className="flex w-full flex-col overflow-clip rounded-xl border border-subtle-1 bg-layer-2 text-primary">
        <label htmlFor={controlId} className="sr-only">
          Add a comment
        </label>
        <TextArea
          id={controlId}
          rows={2}
          magnitude="lg"
          surface="embedded"
          resize="none"
          placeholder="Add a comment"
          value={value}
          onValueChange={setValue}
        />
        <div className="flex min-h-9 items-center justify-between gap-2 py-1 ps-1 pe-1.5">
          <Toolbar elevation="flat" density="compact" aria-label="Comment formatting">
            <ToolbarGroup aria-label="Insert">
              <ToolbarButton aria-label="Mention someone" icon={<Icon icon={AtSign} />} />
              <ToolbarButton aria-label="Add reaction" icon={<Icon icon={SmilePlus} />} />
              <ToolbarButton aria-label="Add link" icon={<Icon icon={Link} />} />
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup aria-label="Text formatting">
              <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
              <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
              <ToolbarToggle aria-label="Underline" icon={<Icon icon={Underline} />} />
            </ToolbarGroup>
          </Toolbar>
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="md"
            disabled={isEmpty}
            label="Comment"
          />
        </div>
      </div>
    </Field>
  );
}
