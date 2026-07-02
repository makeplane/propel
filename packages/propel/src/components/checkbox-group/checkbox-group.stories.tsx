import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect } from "storybook/test";

import { Checkbox } from "../checkbox/index";
import { CheckboxGroup } from "./index";

// Components-tier story: the ready-made `CheckboxGroup` holding ready-made `Checkbox`
// rows (each with its own label + box). The group owns spacing (`density`) and the
// selected-values array. The elements-tier story composes the atomic boxes instead.
const meta = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  subcomponents: { Checkbox },
  args: { density: "comfortable" },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Every child value in the parent-checkbox stories; the group's `allValues` prop
// is what lets a `parent` checkbox derive its checked/indeterminate state.
const PROTOCOLS = ["http", "https", "ssh"];

/** Labeled checkbox rows; the first is selected by default. */
export const Default: Story = {
  args: { density: "comfortable", defaultValue: ["https"] },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Checkbox value="http" label="HTTP" />
      <Checkbox value="https" label="HTTPS" />
      <Checkbox value="ssh" label="SSH" />
    </CheckboxGroup>
  ),
};

/**
 * Interaction test: the default-selected row reports `aria-checked="true"`. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
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

/**
 * A `parent` checkbox controls the whole group: pass the group `allValues` and mark one row
 * `parent`. With only some values selected it shows the indeterminate dash; toggling it checks or
 * clears every row. Explicit child ids + `aria-controls` keep the parent's controls references
 * valid (propel rows always carry their own label id).
 */
export const ParentCheckbox: Story = {
  args: { density: "comfortable", defaultValue: ["https"], allValues: PROTOCOLS },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Checkbox parent label="All protocols" aria-controls={PROTOCOLS.join(" ")} />
      <Checkbox id="http" value="http" label="HTTP" />
      <Checkbox id="https" value="https" label="HTTPS" />
      <Checkbox id="ssh" value="ssh" label="SSH" />
    </CheckboxGroup>
  ),
};

/**
 * Interaction test: the parent reads `mixed` for a partial selection, checks every row when
 * clicked, clears them on the next click, and returns to `mixed` when a single row is checked.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const ParentCheckboxInteraction: Story = {
  ...ParentCheckbox,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const parent = canvas.getByRole("checkbox", { name: "All protocols" });
    const http = canvas.getByRole("checkbox", { name: "HTTP" });
    const https = canvas.getByRole("checkbox", { name: "HTTPS" });
    const ssh = canvas.getByRole("checkbox", { name: "SSH" });

    // one of three values selected → the parent reports the indeterminate (mixed) state
    await expect(parent).toHaveAttribute("aria-checked", "mixed");

    // clicking a mixed parent selects every value
    await userEvent.click(parent);
    await expect(parent).toHaveAttribute("aria-checked", "true");
    await expect(http).toHaveAttribute("aria-checked", "true");
    await expect(https).toHaveAttribute("aria-checked", "true");
    await expect(ssh).toHaveAttribute("aria-checked", "true");

    // clicking a fully-checked parent clears the group
    await userEvent.click(parent);
    await expect(parent).toHaveAttribute("aria-checked", "false");
    await expect(http).toHaveAttribute("aria-checked", "false");
    await expect(https).toHaveAttribute("aria-checked", "false");
    await expect(ssh).toHaveAttribute("aria-checked", "false");

    // checking a single row returns the parent to mixed
    await userEvent.click(http);
    await expect(parent).toHaveAttribute("aria-checked", "mixed");
  },
};

// Values for the nested-group stories: the outer group tracks the top-level permissions while
// the nested group tracks the user-management subset behind the "manage-users" value.
const MAIN_PERMISSIONS = ["view-dashboard", "manage-users", "access-reports"];
const MANAGEMENT_PERMISSIONS = ["create-user", "edit-user", "delete-user", "assign-roles"];

/**
 * Groups nest: a nested `CheckboxGroup` (with its own `parent` row) manages a subset of values
 * while the outer group tracks the top level. The two controlled selections stay in sync through
 * `onValueChange` — completing the nested group checks its value into the outer one — and the outer
 * parent's explicit `indeterminate` shows the dash while the nested selection is partial.
 */
export const NestedParentCheckbox: Story = {
  args: { density: "comfortable", allValues: MAIN_PERMISSIONS },
  render: function Render(args) {
    const [mainValue, setMainValue] = React.useState<string[]>([]);
    const [managementValue, setManagementValue] = React.useState<string[]>([]);
    return (
      <CheckboxGroup
        {...args}
        aria-label="User permissions"
        value={mainValue}
        onValueChange={(value) => {
          if (value.includes("manage-users")) {
            setManagementValue(MANAGEMENT_PERMISSIONS);
          } else if (managementValue.length === MANAGEMENT_PERMISSIONS.length) {
            setManagementValue([]);
          }
          setMainValue(value);
        }}
      >
        <Checkbox
          parent
          label="User permissions"
          aria-controls={MAIN_PERMISSIONS.join(" ")}
          indeterminate={
            managementValue.length > 0 && managementValue.length !== MANAGEMENT_PERMISSIONS.length
          }
        />
        <Checkbox id="view-dashboard" value="view-dashboard" label="View dashboard" />
        <Checkbox id="access-reports" value="access-reports" label="Access reports" />
        <div className="ps-6">
          <CheckboxGroup
            density={args.density}
            aria-label="Manage users"
            allValues={MANAGEMENT_PERMISSIONS}
            value={managementValue}
            onValueChange={(value) => {
              if (value.length === MANAGEMENT_PERMISSIONS.length) {
                setMainValue((prev) =>
                  prev.includes("manage-users") ? prev : [...prev, "manage-users"],
                );
              } else {
                setMainValue((prev) => prev.filter((v) => v !== "manage-users"));
              }
              setManagementValue(value);
            }}
          >
            <Checkbox
              parent
              id="manage-users"
              label="Manage users"
              aria-controls={MANAGEMENT_PERMISSIONS.join(" ")}
            />
            <Checkbox id="create-user" value="create-user" label="Create user" />
            <Checkbox id="edit-user" value="edit-user" label="Edit user" />
            <Checkbox id="delete-user" value="delete-user" label="Delete user" />
            <Checkbox id="assign-roles" value="assign-roles" label="Assign roles" />
          </CheckboxGroup>
        </div>
      </CheckboxGroup>
    );
  },
};

/**
 * Interaction test: one nested row turns the nested parent `mixed` and puts the indeterminate dash
 * on the outer parent (its explicit `indeterminate` surfaces as `data-indeterminate`;
 * `aria-checked` stays group-derived). Completing the nested group checks "manage-users" into the
 * outer group, and the outer parent then selects and clears every value across both groups. Tagged
 * out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const NestedParentCheckboxInteraction: Story = {
  ...NestedParentCheckbox,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const userPermissions = canvas.getByRole("checkbox", { name: "User permissions" });
    const manageUsers = canvas.getByRole("checkbox", { name: "Manage users" });
    const createUser = canvas.getByRole("checkbox", { name: "Create user" });
    const viewDashboard = canvas.getByRole("checkbox", { name: "View dashboard" });

    // nothing selected anywhere → both parents read clear
    await expect(userPermissions).toHaveAttribute("aria-checked", "false");
    await expect(manageUsers).toHaveAttribute("aria-checked", "false");

    // one nested row → the nested parent turns mixed and the outer parent shows the dash
    // through its explicit `indeterminate` wiring
    await userEvent.click(createUser);
    await expect(manageUsers).toHaveAttribute("aria-checked", "mixed");
    await expect(userPermissions).toHaveAttribute("data-indeterminate");

    // completing the nested group syncs "manage-users" into the outer group → outer parent mixed
    await userEvent.click(manageUsers);
    await expect(manageUsers).toHaveAttribute("aria-checked", "true");
    await expect(createUser).toHaveAttribute("aria-checked", "true");
    await expect(userPermissions).toHaveAttribute("aria-checked", "mixed");

    // checking the outer parent selects every value in both groups
    await userEvent.click(userPermissions);
    await expect(userPermissions).toHaveAttribute("aria-checked", "true");
    await expect(viewDashboard).toHaveAttribute("aria-checked", "true");
    await expect(manageUsers).toHaveAttribute("aria-checked", "true");

    // clearing the outer parent empties both groups
    await userEvent.click(userPermissions);
    await expect(userPermissions).toHaveAttribute("aria-checked", "false");
    await expect(viewDashboard).toHaveAttribute("aria-checked", "false");
    await expect(manageUsers).toHaveAttribute("aria-checked", "false");
    await expect(createUser).toHaveAttribute("aria-checked", "false");
  },
};

/** `compact` density tightens the gap between rows. */
export const Density: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-start gap-10">
      <CheckboxGroup density="comfortable" defaultValue={["daily"]} aria-label="Comfortable">
        <Checkbox value="daily" label="Daily" />
        <Checkbox value="weekly" label="Weekly" />
      </CheckboxGroup>
      <CheckboxGroup density="compact" defaultValue={["daily"]} aria-label="Compact">
        <Checkbox value="daily" label="Daily" />
        <Checkbox value="weekly" label="Weekly" />
      </CheckboxGroup>
    </div>
  ),
};

/** Selecting rows collects every checked value; multiple can be on at once. */
export const SelectionBehavior: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { density: "comfortable", defaultValue: [] },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Checkbox value="http" label="HTTP" />
      <Checkbox value="https" label="HTTPS" />
    </CheckboxGroup>
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
