import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { ListboxItem } from "../../internal/listbox-item";
import { Field, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItemIndicator,
} from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

// Components-tier story: the ready-made `ComboboxContent` collapses the portal/positioner/popup
// boilerplate into one element, and Base UI behavior parts graft Propel's styled parts via `render`.
// The elements-tier `Combobox` story wires those raw parts by hand.
const meta = {
  title: "Components/Combobox",
  component: Combobox,
  subcomponents: {
    ComboboxInputGroup,
    ComboboxInput,
    ComboboxContent,
    ListboxItem,
    ComboboxItemIndicator,
    ComboboxEmpty,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Combobox using the ready-made `ComboboxContent` surface for filterable selection. */
export const Default: Story = {
  args: { items: REGIONS, required: true },
  render: (args) => (
    <Field name="region">
      <Combobox {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <BaseCombobox.InputGroup render={<ComboboxInputGroup />}>
          <BaseCombobox.Input render={<ComboboxInput />} placeholder="e.g. eu-central-1" />
          <BaseCombobox.Clear
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Clear region"
              >
                <X />
              </IconButton>
            }
          />
          <BaseCombobox.Trigger
            render={
              <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
                <ChevronsUpDown />
              </IconButton>
            }
          />
        </BaseCombobox.InputGroup>
        <ComboboxContent>
          <BaseCombobox.Empty render={<ComboboxEmpty />}>No matches</BaseCombobox.Empty>
          <BaseCombobox.List>
            {REGIONS.map((region) => (
              <BaseCombobox.Item
                key={region}
                value={region}
                render={<ListboxItem layout="indicator" magnitude="md" />}
              >
                <ComboboxItemIndicator />
                <span>{region}</span>
              </BaseCombobox.Item>
            ))}
          </BaseCombobox.List>
        </ComboboxContent>
        <FieldError magnitude="md" />
      </Combobox>
    </Field>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
  },
};
