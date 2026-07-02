import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, Minus } from "lucide-react";
import { expect } from "storybook/test";

import { Checkbox, CheckboxIndeterminateIndicator, CheckboxIndicator } from "../checkbox/index";
import { CheckboxGroup } from "./index";

// elements-tier story (rule 2b): the styled `CheckboxGroup` is a Base-UI-agnostic `useRender` element;
// Base UI's `CheckboxGroup` behavior (the shared selected-values state) grafts onto it via `render`.
// The group only manages the selected-values array and layout; each atomic box owns its own
// indicator and accessible name. No Field/Fieldset here — that's a components-tier concern.
const meta = {
  title: "Elements/CheckboxGroup",
  component: Checkbox,
  subcomponents: { CheckboxGroup },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function Option({ value, label }: { value: string; label: string }) {
  return (
    <BaseCheckbox.Root value={value} aria-label={label} render={<Checkbox />}>
      <CheckboxIndicator>
        <Check aria-hidden />
      </CheckboxIndicator>
      <CheckboxIndeterminateIndicator>
        <Minus aria-hidden />
      </CheckboxIndeterminateIndicator>
    </BaseCheckbox.Root>
  );
}

/** A group of atomic boxes; the group tracks which values are selected. */
export const Default: Story = {
  render: () => (
    <BaseCheckboxGroup
      defaultValue={["https"]}
      aria-label="Allowed protocols"
      render={<CheckboxGroup density="comfortable" />}
    >
      <Option value="http" label="HTTP" />
      <Option value="https" label="HTTPS" />
      <Option value="ssh" label="SSH" />
    </BaseCheckboxGroup>
  ),
};

/**
 * Interaction test: the group reflects its `defaultValue`, so HTTPS reads as checked. Tagged out of
 * the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("checkbox", { name: "HTTPS" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  },
};

/** Multiple boxes can be checked at once — the group collects every selected value. */
export const Multiple: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseCheckboxGroup
      defaultValue={[]}
      aria-label="Allowed protocols"
      render={<CheckboxGroup density="comfortable" />}
    >
      <Option value="http" label="HTTP" />
      <Option value="https" label="HTTPS" />
    </BaseCheckboxGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const http = canvas.getByRole("checkbox", { name: "HTTP" });
    const https = canvas.getByRole("checkbox", { name: "HTTPS" });
    await expect(http).toHaveAttribute("aria-checked", "false");

    await userEvent.click(http);
    await expect(http).toHaveAttribute("aria-checked", "true");

    await userEvent.click(https);
    await expect(http).toHaveAttribute("aria-checked", "true");
    await expect(https).toHaveAttribute("aria-checked", "true");
  },
};
