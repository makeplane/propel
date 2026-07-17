import { TextAreaField } from "@makeplane/propel/components/text-area-field";
import * as React from "react";

export default function ControlledDemo() {
  const [value, setValue] = React.useState("");

  return (
    <TextAreaField
      magnitude="md"
      resize="vertical"
      label="Comment"
      placeholder="Leave a comment..."
      value={value}
      onChange={(event) => setValue(event.target.value)}
      hint={`${value.length} characters`}
    />
  );
}
