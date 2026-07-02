import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Field, FieldError } from "../field/index";
import {
  Select,
  SelectContent,
  SelectField,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
  type SelectTriggerMagnitude,
} from "./index";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

const MAGNITUDES: SelectTriggerMagnitude[] = ["sm", "md", "lg"];

// Components-tier story: the ready-mades collapse the Base UI wiring — `SelectTrigger` bakes the
// value + chevron, `SelectContent` the portal/positioner/popup, and `SelectItem` the check marker —
// so the anatomy composes without touching `@base-ui/react/select`.
const meta = {
  title: "Components/Select",
  component: Select,
  subcomponents: {
    SelectField,
    SelectLabel,
    SelectTrigger,
    SelectContent,
    SelectList,
    SelectItem,
    SelectGroup,
    SelectGroupLabel,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A labeled select inside a `Field`: trigger + popup of options, all ready-made parts. */
export const Default: Story = {
  args: { items: SERVER_TYPES, defaultValue: "general", required: true },
  render: (args) => (
    <Field name="serverType">
      <Select {...args}>
        <SelectField>
          <SelectLabel>Server type</SelectLabel>
          <SelectTrigger magnitude="md" />
        </SelectField>
        <SelectContent>
          <SelectList>
            {SERVER_TYPES.map(({ label, value }) => (
              <SelectItem key={value} value={value} magnitude="md">
                {label}
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
        <FieldError magnitude="md" />
      </Select>
    </Field>
  ),
};

/**
 * Interaction test: the labeled trigger opens the popup and lists the options. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Server type" }));
    const popup = within(document.body);
    await expect(
      await popup.findByRole("option", { name: "Compute optimized" }),
    ).toBeInTheDocument();
  },
};

/**
 * Without a `defaultValue`, the trigger shows the `placeholder` until an option is picked — Base
 * UI's `Select.Value` placeholder, surfaced as a `SelectTrigger` prop.
 */
export const Placeholder: Story = {
  render: () => (
    <Field name="serverType">
      <Select items={SERVER_TYPES}>
        <SelectField>
          <SelectLabel>Server type</SelectLabel>
          <SelectTrigger magnitude="md" placeholder="Choose a server type" />
        </SelectField>
        <SelectContent>
          <SelectList>
            {SERVER_TYPES.map(({ label, value }) => (
              <SelectItem key={value} value={value} magnitude="md">
                {label}
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    </Field>
  ),
};

/**
 * Interaction test: the trigger shows the placeholder while empty and swaps to the picked option's
 * label after selection.
 */
export const PlaceholderInteraction: Story = {
  ...Placeholder,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: "Server type" });
    await expect(trigger).toHaveTextContent("Choose a server type");

    await userEvent.click(trigger);
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: "Compute optimized" }));
    await expect(trigger).toHaveTextContent("Compute optimized");
    // Close the popup so the trailing axe pass does not flag Base UI's focus guards.
    await userEvent.keyboard("{Escape}");
  },
};

/**
 * `multiple` keeps the popup open across picks and checks every selected row; the trigger joins the
 * selected labels. Selection state lives on the root — the anatomy is unchanged.
 */
export const Multiple: Story = {
  render: () => (
    <Field name="regions">
      <Select multiple items={SERVER_TYPES} defaultValue={["general", "compute"]}>
        <SelectField>
          <SelectLabel>Server types</SelectLabel>
          <SelectTrigger magnitude="md" />
        </SelectField>
        <SelectContent>
          <SelectList>
            {SERVER_TYPES.map(({ label, value }) => (
              <SelectItem key={value} value={value} magnitude="md">
                {label}
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    </Field>
  ),
};

/**
 * Interaction test: the trigger joins both preselected labels, and picking a third keeps the first
 * two selected.
 */
export const MultipleInteraction: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: "Server types" });
    await expect(trigger).toHaveTextContent("General purpose, Compute optimized");

    await userEvent.click(trigger);
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: "Memory optimized" }));
    await expect(popup.getByRole("option", { name: "General purpose" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(popup.getByRole("option", { name: "Memory optimized" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(trigger).toHaveTextContent("General purpose, Compute optimized, Memory optimized");
  },
};

const ASSIGNEES = [
  { id: "u_01", name: "Aaditya Kapoor" },
  { id: "u_02", name: "Bianca Ferreira" },
  { id: "u_03", name: "Marcus Chen" },
];

/**
 * Items can carry object values instead of primitives: the root's `items` pairs each object with
 * the label the trigger displays, and `itemToStringValue` converts the selected object to a string
 * for form submission.
 */
export const ObjectValues: Story = {
  render: () => (
    <Field name="assignee">
      <Select
        items={ASSIGNEES.map((member) => ({ label: member.name, value: member }))}
        defaultValue={ASSIGNEES[0]}
        itemToStringValue={(member) => member.id}
      >
        <SelectField>
          <SelectLabel>Assignee</SelectLabel>
          <SelectTrigger magnitude="md" />
        </SelectField>
        <SelectContent>
          <SelectList>
            {ASSIGNEES.map((member) => (
              <SelectItem key={member.id} value={member} magnitude="md">
                {member.name}
              </SelectItem>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    </Field>
  ),
};

/**
 * Interaction test: the trigger resolves the preselected object to its label, and picking another
 * row swaps the displayed label to the newly selected object's.
 */
export const ObjectValuesInteraction: Story = {
  ...ObjectValues,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("combobox", { name: "Assignee" });
    await expect(trigger).toHaveTextContent("Aaditya Kapoor");

    await userEvent.click(trigger);
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: "Marcus Chen" }));
    await expect(trigger).toHaveTextContent("Marcus Chen");
    // Close the popup so the trailing axe pass does not flag Base UI's focus guards.
    await userEvent.keyboard("{Escape}");
  },
};

const REGION_GROUPS = [
  {
    label: "Americas",
    items: [
      { label: "US Central 1", value: "us-central-1" },
      { label: "US East 1", value: "us-east-1" },
    ],
  },
  {
    label: "Europe",
    items: [
      { label: "EU Central 1", value: "eu-central-1" },
      { label: "EU West 1", value: "eu-west-1" },
    ],
  },
];

/**
 * Related options sit under `SelectGroup` + `SelectGroupLabel` section headings inside the popup;
 * the flattened `items` on the root keep the trigger's label lookup working.
 */
export const Grouped: Story = {
  render: () => (
    <Field name="region">
      <Select items={REGION_GROUPS.flatMap((group) => group.items)} defaultValue="us-central-1">
        <SelectField>
          <SelectLabel>Region</SelectLabel>
          <SelectTrigger magnitude="md" />
        </SelectField>
        <SelectContent>
          <SelectList>
            {REGION_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectGroupLabel>{group.label}</SelectGroupLabel>
                {group.items.map(({ label, value }) => (
                  <SelectItem key={value} value={value} magnitude="md">
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectList>
        </SelectContent>
      </Select>
    </Field>
  ),
};

/**
 * Interaction test: each group is labeled by its `SelectGroupLabel` (aria-labelledby wiring), and
 * the options render inside their own group.
 */
export const GroupedInteraction: Story = {
  ...Grouped,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("combobox", { name: "Region" }));
    const popup = within(document.body);
    const europe = await popup.findByRole("group", { name: "Europe" });
    await expect(within(europe).getByRole("option", { name: "EU West 1" })).toBeInTheDocument();
    const americas = popup.getByRole("group", { name: "Americas" });
    await expect(within(americas).getByRole("option", { name: "US East 1" })).toBeInTheDocument();
  },
};

/** All trigger sizes (Figma S/Base/L map to sm/md/lg); the option rows track the same magnitude. */
export const Magnitudes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Select key={magnitude} items={SERVER_TYPES} defaultValue="general">
          <SelectField>
            <SelectLabel>{magnitude}</SelectLabel>
            <SelectTrigger magnitude={magnitude} />
          </SelectField>
          <SelectContent>
            <SelectList>
              {SERVER_TYPES.map(({ label, value }) => (
                <SelectItem key={value} value={value} magnitude={magnitude}>
                  {label}
                </SelectItem>
              ))}
            </SelectList>
          </SelectContent>
        </Select>
      ))}
    </div>
  ),
};

/** Interaction test: every magnitude renders a labeled trigger, and each still opens its popup. */
export const MagnitudesInteraction: Story = {
  ...Magnitudes,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    for (const magnitude of MAGNITUDES) {
      await expect(canvas.getByRole("combobox", { name: magnitude })).toBeInTheDocument();
    }
    await userEvent.click(canvas.getByRole("combobox", { name: "sm" }));
    const popup = within(document.body);
    await expect(
      await popup.findByRole("option", { name: "Memory optimized" }),
    ).toBeInTheDocument();
  },
};
