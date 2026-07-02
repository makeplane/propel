import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Field, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Combobox,
  ComboboxChips,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
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
            {(region: string) => (
              <ComboboxItem key={region} value={region} magnitude="md">
                {region}
              </ComboboxItem>
            )}
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
    // Base UI filters the list to the query: matches stay, everything else drops out.
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
    await expect(within(document.body).queryByText("us-east-1")).not.toBeInTheDocument();
    // The Empty live region stays mounted for screen readers but holds no content (and takes no
    // space) while there are matches.
    await expect(within(document.body).getByRole("status")).toBeEmptyDOMElement();
  },
};

/**
 * Interaction test: a query with no matches empties the list and shows the polite "No matches"
 * status. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const EmptyInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "zzz");
    const popup = within(document.body);
    await expect(popup.queryAllByRole("option")).toHaveLength(0);
    await expect(popup.getByRole("status")).toHaveTextContent("No matches");
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
            {(region: string) => (
              <ComboboxItem key={region} value={region} magnitude="md">
                {region}
              </ComboboxItem>
            )}
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

const GROUPED_REGIONS = [
  { label: "Americas", items: ["us-central-1", "us-east-1", "sa-east-1"] },
  { label: "Europe", items: ["eu-central-1", "eu-west-1"] },
  { label: "Asia Pacific", items: ["ap-west-1", "ap-southeast-2"] },
];

/**
 * Grouped options: the root receives the grouped `items`, the list function-child receives each
 * group, and `ComboboxGroup` + `ComboboxCollection` render the group's own filtered options under a
 * `ComboboxGroupLabel`. Filtering drops empty groups (and their headings) automatically.
 */
export const Grouped: Story = {
  render: () => (
    <Field name="region">
      <Combobox items={GROUPED_REGIONS}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup magnitude="md" placeholder="e.g. eu-central-1" />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof GROUPED_REGIONS)[number]) => (
              <ComboboxGroup key={group.label} items={group.items}>
                <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(region: string) => (
                    <ComboboxItem key={region} value={region} magnitude="md">
                      {region}
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

/**
 * Interaction test: filtering inside groups keeps only matching options and drops group headings
 * with no matches. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const GroupedInteraction: Story = {
  ...Grouped,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    const popup = within(document.body);
    await expect(popup.getByText("Europe")).toBeInTheDocument();
    await expect(popup.getByText("eu-central-1")).toBeInTheDocument();
    await expect(popup.queryByText("Americas")).not.toBeInTheDocument();
    await expect(popup.queryByText("us-east-1")).not.toBeInTheDocument();
  },
};
