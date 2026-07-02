import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { expect, fn } from "storybook/test";

import { Toggle, ToggleIcon } from "../toggle/index";
import { ToggleGroup } from "./index";

// elements-tier story (rule 2b): `ToggleGroup` is a Base-UI-agnostic styled container; Base UI's
// `ToggleGroup` grafts its single/multi-select state + roving focus onto it via `render`, and each
// Base UI `Toggle` grafts its pressed-state behavior onto the styled `Toggle`. The shared-`magnitude`
// context that the components-tier `ToggleGroup` wires via its provider is mirrored here by giving
// each `Toggle` the same `magnitude` explicitly.
const meta = {
  title: "Elements/ToggleGroup",
  component: ToggleGroup,
  subcomponents: { Toggle, ToggleIcon },
  parameters: {
    a11y: {
      // Base UI's ToggleGroup renders `role="group"` with `aria-orientation`, which axe's
      // aria-allowed-attr flags. This is Base UI's intended roving-focus markup, so suppress it.
      config: { rules: [{ id: "aria-allowed-attr", enabled: false }] },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const onValueChange = fn();

/** A single-select group of three alignment toggles. */
export const Default: Story = {
  render: () => (
    <BaseToggleGroup
      defaultValue={["left"]}
      onValueChange={onValueChange}
      render={<ToggleGroup />}
      aria-label="Text alignment"
    >
      <BaseToggle value="left" aria-label="Align left" render={<Toggle magnitude="md" />}>
        <ToggleIcon>
          <AlignLeft />
        </ToggleIcon>
      </BaseToggle>
      <BaseToggle value="center" aria-label="Align center" render={<Toggle magnitude="md" />}>
        <ToggleIcon>
          <AlignCenter />
        </ToggleIcon>
      </BaseToggle>
      <BaseToggle value="right" aria-label="Align right" render={<Toggle magnitude="md" />}>
        <ToggleIcon>
          <AlignRight />
        </ToggleIcon>
      </BaseToggle>
    </BaseToggleGroup>
  ),
};

/**
 * Interaction test: selecting another toggle moves the pressed state and fires `onValueChange`.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const left = canvas.getByRole("button", { name: "Align left" });
    const center = canvas.getByRole("button", { name: "Align center" });
    await expect(left).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(center);
    await expect(center).toHaveAttribute("aria-pressed", "true");
    await expect(left).toHaveAttribute("aria-pressed", "false");
    await expect(onValueChange).toHaveBeenCalled();
  },
};

/** `multiple` lets more than one toggle stay pressed. */
export const Multiple: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <BaseToggleGroup
      multiple
      defaultValue={[]}
      render={<ToggleGroup />}
      aria-label="Text formatting"
    >
      <BaseToggle value="bold" aria-label="Bold" render={<Toggle magnitude="md" />}>
        <ToggleIcon>
          <AlignLeft />
        </ToggleIcon>
      </BaseToggle>
      <BaseToggle value="italic" aria-label="Italic" render={<Toggle magnitude="md" />}>
        <ToggleIcon>
          <AlignCenter />
        </ToggleIcon>
      </BaseToggle>
    </BaseToggleGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const bold = canvas.getByRole("button", { name: "Bold" });
    const italic = canvas.getByRole("button", { name: "Italic" });
    await userEvent.click(bold);
    await userEvent.click(italic);
    await expect(bold).toHaveAttribute("aria-pressed", "true");
    await expect(italic).toHaveAttribute("aria-pressed", "true");
  },
};
