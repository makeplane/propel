import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { IconButton, IconButtonIcon } from "../icon-button";
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
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="e.g. eu-central-1" />
          <ComboboxClear
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Clear region"
              >
                <IconButtonIcon>
                  <X />
                </IconButtonIcon>
              </IconButton>
            }
          />
          <ComboboxTrigger
            render={
              <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
                <IconButtonIcon>
                  <ChevronsUpDown />
                </IconButtonIcon>
              </IconButton>
            }
          />
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
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
  },
};

/**
 * An invalid field: `Field.Root invalid` propagates `data-invalid` to the input, and the input
 * group recolors its border to `danger` off `:has([data-invalid])` — no `tone` prop required.
 */
export const Invalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { items: REGIONS, required: true },
  render: (args) => (
    <Field name="region" invalid>
      <Combobox {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="e.g. eu-central-1" />
          <ComboboxClear
            render={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Clear region"
              >
                <IconButtonIcon>
                  <X />
                </IconButtonIcon>
              </IconButton>
            }
          />
          <ComboboxTrigger
            render={
              <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Open region">
                <IconButtonIcon>
                  <ChevronsUpDown />
                </IconButtonIcon>
              </IconButton>
            }
          />
        </ComboboxInputGroup>
        <FieldError magnitude="md" match={true}>
          Choose a deployment region.
        </FieldError>
      </Combobox>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Region" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    // The wrapping input group recolors its border off `:has([data-invalid])`.
    const group = input.closest<HTMLElement>(":has([data-invalid])");
    await expect(group).toHaveClass("has-[[data-invalid]]:border-danger-strong");
  },
};
