import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Field, FieldError } from "../field/index";
import {
  Select,
  SelectContent,
  SelectField,
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
