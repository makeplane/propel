import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check } from "lucide-react";
import { expect } from "storybook/test";

import { Checkbox, CheckboxIndicator } from "../checkbox/index";
import { CheckboxGroup, type CheckboxGroupDensity } from "./index";

const DENSITIES: CheckboxGroupDensity[] = ["comfortable", "compact"];

// elements-tier story (rule 2b): a pure UI-configuration showcase. The styled `CheckboxGroup` is a
// plain flex-column `<div>` whose only axis is `density`; its cva keys off no `data-*`/aria state
// of its own. Base UI's `CheckboxGroup` behavior (the `role="group"` semantics + the shared
// selected-values array) grafts onto it in `components` — here that state is pinned statically via
// the attributes Base UI would set (`role="group"`, and `data-checked`/`aria-checked` on each
// pinned box). Group behavior is demonstrated AND tested in Components/CheckboxGroup.
const meta = {
  title: "Elements/CheckboxGroup",
  component: CheckboxGroup,
  args: { density: "comfortable" },
  render: (args) => (
    <CheckboxGroup {...args} role="group" aria-label="Allowed protocols">
      <Checkbox role="checkbox" aria-checked="false" aria-label="HTTP" />
      <Checkbox role="checkbox" aria-checked="true" aria-label="HTTPS" data-checked="">
        <CheckboxIndicator>
          <Check aria-hidden />
        </CheckboxIndicator>
      </Checkbox>
      <Checkbox role="checkbox" aria-checked="false" aria-label="SSH" />
    </CheckboxGroup>
  ),
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A stacked column of atomic boxes; the second is pinned checked (`data-checked`). */
export const Default: Story = {};

/** The full `density` axis: `comfortable` keeps a gap between rows, `compact` removes it. */
export const Densities: Story = {
  argTypes: { density: { control: false } },
  render: () => (
    <div className="flex items-start gap-10">
      {DENSITIES.map((density) => (
        <CheckboxGroup key={density} density={density} role="group" aria-label={density}>
          <Checkbox role="checkbox" aria-checked="true" aria-label="Daily" data-checked="">
            <CheckboxIndicator>
              <Check aria-hidden />
            </CheckboxIndicator>
          </Checkbox>
          <Checkbox role="checkbox" aria-checked="false" aria-label="Weekly" />
          <Checkbox role="checkbox" aria-checked="false" aria-label="Monthly" />
        </CheckboxGroup>
      ))}
    </div>
  ),
};

/**
 * CSS canary: the `density` cva compiled — `compact` collapses the row gap to zero while
 * `comfortable` keeps one. Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const DensitiesCanary: Story = {
  ...Densities,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    const comfortable = canvas.getByRole("group", { name: "comfortable" });
    const compact = canvas.getByRole("group", { name: "compact" });
    await expect(getComputedStyle(compact).rowGap).toBe("0px");
    await expect(getComputedStyle(comfortable).rowGap).not.toBe("0px");
  },
};
