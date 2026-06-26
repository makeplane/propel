import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import {
  Combobox,
  ComboboxClear,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxPositioner,
  ComboboxTrigger,
} from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  subcomponents: {
    ComboboxLabel,
    ComboboxInputGroup,
    ComboboxInput,
    ComboboxClear,
    ComboboxTrigger,
    ComboboxPortal,
    ComboboxPositioner,
    ComboboxPopup,
    ComboboxList,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxEmpty,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Combobox owns the input and popup composition for choosing from filterable items. */
export const Default: Story = {
  args: { items: REGIONS, required: true },
  render: (args) => (
    <Field name="region">
      <Combobox {...args}>
        <FieldLabel magnitude="md">Region</FieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="e.g. eu-central-1" />
          <ComboboxClear>
            <X aria-hidden />
          </ComboboxClear>
          <ComboboxTrigger>
            <ChevronsUpDown aria-hidden />
          </ComboboxTrigger>
        </ComboboxInputGroup>
        <ComboboxPortal>
          <ComboboxPositioner>
            <ComboboxPopup>
              <ComboboxEmpty>No matches</ComboboxEmpty>
              <ComboboxList>
                {REGIONS.map((region) => (
                  <ComboboxItem key={region} value={region}>
                    <ComboboxItemIndicator>
                      <Check aria-hidden />
                    </ComboboxItemIndicator>
                    <span>{region}</span>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxPopup>
          </ComboboxPositioner>
        </ComboboxPortal>
        <FieldError magnitude="md" />
      </Combobox>
    </Field>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
  },
};
