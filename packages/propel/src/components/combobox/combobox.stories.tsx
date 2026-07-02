import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Combobox,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

// Components-tier story: the ready-mades collapse every Base UI behavior part — `ComboboxInputGroup`
// bundles the input + clear/trigger controls, `ComboboxContent` the portal/positioner/popup, and
// `ComboboxItem` the indicator row — so a full combobox composes without touching `@base-ui/react`.
// The elements-tier `Combobox` story wires the raw styled parts by hand.
const meta = {
  title: "Components/Combobox",
  component: Combobox,
  subcomponents: {
    ComboboxInputGroup,
    ComboboxChips,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxEmpty,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A filterable single-select: `ComboboxInputGroup` is the input frame (pass the clear/trigger
 * controls — each carries its own localizable `aria-label`), `ComboboxContent` the popup surface,
 * and `ComboboxItem` the option rows with the selection check baked in.
 */
export const Default: Story = {
  args: { items: REGIONS, required: true },
  render: (args) => (
    <Field name="region">
      <Combobox {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup
          magnitude="md"
          placeholder="e.g. eu-central-1"
          clear={
            <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear region">
              <X />
            </IconButton>
          }
          trigger={
            <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
              <ChevronsUpDown />
            </IconButton>
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {REGIONS.map((region) => (
              <ComboboxItem key={region} value={region} magnitude="md">
                {region}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
        <FieldError magnitude="md" />
      </Combobox>
    </Field>
  ),
};

/**
 * Interaction test: typing filters the popup down to the matching option. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
  },
};

/**
 * `multiple` swaps the input frame for `ComboboxChips`: each selected value renders as a removable
 * chip ahead of the inline input, wrapping onto new rows as the selection grows. `removeLabel`
 * names each chip's remove button (localizable, required). Arrow keys move focus across chips;
 * Backspace removes.
 */
export const Multiple: Story = {
  render: () => (
    <Field name="regions">
      <Combobox multiple items={REGIONS} defaultValue={["us-east-1", "eu-central-1"]}>
        <FieldLabel magnitude="md" inset={false}>
          Regions
        </FieldLabel>
        <ComboboxChips
          magnitude="md"
          placeholder="Add a region"
          removeLabel={(region) => `Remove ${region}`}
        />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {REGIONS.map((region) => (
              <ComboboxItem key={region} value={region} magnitude="md">
                {region}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

/**
 * Interaction test: both preselected values render as chips, a chip's remove button drops just that
 * value, and picking another item appends a chip. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const MultipleInteraction: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("us-east-1")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Remove us-east-1" }));
    await expect(canvas.queryByText("us-east-1")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("combobox", { name: "Regions" }));
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: "ap-west-1" }));
    await expect(canvas.getByText("ap-west-1")).toBeInTheDocument();
    await expect(canvas.getByText("eu-central-1")).toBeInTheDocument();
  },
};
