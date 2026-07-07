import type { Meta, StoryObj } from "@storybook/react-vite";
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

// Every value in the select-all story; the group's `allValues` prop is what lets the `parent`
// checkbox derive its checked/indeterminate state from the flat list of rows.
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
 * A **select-all** control (Base UI's `parent` checkbox): pass the group `allValues` and mark one
 * row `parent`. Base UI derives that row's state from the flat list — checked when every row is on,
 * the indeterminate dash when only some are, unchecked when none — and toggling it checks or clears
 * every row at once. The control is an affordance over the whole group, not a value of its own, so
 * label it plainly ("Select all"). Explicit child ids + `aria-controls` keep the parent's controls
 * reference valid (propel rows always carry their own label id).
 */
export const SelectAll: Story = {
  args: { density: "comfortable", defaultValue: ["https"], allValues: PROTOCOLS },
  render: (args) => (
    <CheckboxGroup {...args} aria-label="Allowed protocols">
      <Checkbox parent label="Select all" aria-controls={PROTOCOLS.join(" ")} />
      <Checkbox id="http" value="http" label="HTTP" />
      <Checkbox id="https" value="https" label="HTTPS" />
      <Checkbox id="ssh" value="ssh" label="SSH" />
    </CheckboxGroup>
  ),
};

/**
 * Interaction test: the select-all row reads `mixed` for a partial selection, checks every row when
 * clicked, clears them on the next click, and returns to `mixed` when a single row is checked.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const SelectAllInteraction: Story = {
  ...SelectAll,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const selectAll = canvas.getByRole("checkbox", { name: "Select all" });
    const http = canvas.getByRole("checkbox", { name: "HTTP" });
    const https = canvas.getByRole("checkbox", { name: "HTTPS" });
    const ssh = canvas.getByRole("checkbox", { name: "SSH" });

    // one of three values selected → the select-all reports the indeterminate (mixed) state
    await expect(selectAll).toHaveAttribute("aria-checked", "mixed");

    // clicking a mixed select-all selects every value
    await userEvent.click(selectAll);
    await expect(selectAll).toHaveAttribute("aria-checked", "true");
    await expect(http).toHaveAttribute("aria-checked", "true");
    await expect(https).toHaveAttribute("aria-checked", "true");
    await expect(ssh).toHaveAttribute("aria-checked", "true");

    // clicking a fully-checked select-all clears the group
    await userEvent.click(selectAll);
    await expect(selectAll).toHaveAttribute("aria-checked", "false");
    await expect(http).toHaveAttribute("aria-checked", "false");
    await expect(https).toHaveAttribute("aria-checked", "false");
    await expect(ssh).toHaveAttribute("aria-checked", "false");

    // checking a single row returns the select-all to mixed
    await userEvent.click(http);
    await expect(selectAll).toHaveAttribute("aria-checked", "mixed");
  },
};

// The nested story models a real permission tree as two INDEPENDENT categories. Each category is its
// own group whose `allValues` are exactly that category's children, so its `parent` rolls up only
// its own children — never the sibling category.
const MANAGE_USERS_PERMISSIONS = ["create-user", "edit-user", "delete-user", "assign-roles"];
const MANAGE_CONTENT_PERMISSIONS = ["create-content", "edit-content", "publish-content"];

/**
 * A genuine parent/child hierarchy — distinct from the flat `SelectAll` control above. Each
 * category ("Manage users", "Manage content") is its OWN `CheckboxGroup` whose `allValues` are
 * exactly that category's children, so its `parent` row rolls up ONLY its own children: it checks
 * when all of them are on, shows the indeterminate dash when only some are, and toggling it checks
 * or clears its own children. The categories are independent — a row under "Manage users" never
 * affects "Manage content". Both groups are uncontrolled (`defaultValue`), so Base UI owns every
 * parent/child state with no manual syncing. "User permissions" is a plain heading, not a control.
 */
export const NestedParentCheckbox: Story = {
  parameters: { controls: { disable: true } },
  args: { density: "comfortable" },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <p className="text-13 font-semibold text-primary">User permissions</p>
      <CheckboxGroup
        density={args.density}
        aria-label="Manage users"
        allValues={MANAGE_USERS_PERMISSIONS}
        defaultValue={[]}
      >
        <Checkbox parent label="Manage users" aria-controls={MANAGE_USERS_PERMISSIONS.join(" ")} />
        <div className="flex flex-col gap-2 ps-6">
          <Checkbox id="create-user" value="create-user" label="Create user" />
          <Checkbox id="edit-user" value="edit-user" label="Edit user" />
          <Checkbox id="delete-user" value="delete-user" label="Delete user" />
          <Checkbox id="assign-roles" value="assign-roles" label="Assign roles" />
        </div>
      </CheckboxGroup>
      <CheckboxGroup
        density={args.density}
        aria-label="Manage content"
        allValues={MANAGE_CONTENT_PERMISSIONS}
        defaultValue={[]}
      >
        <Checkbox
          parent
          label="Manage content"
          aria-controls={MANAGE_CONTENT_PERMISSIONS.join(" ")}
        />
        <div className="flex flex-col gap-2 ps-6">
          <Checkbox id="create-content" value="create-content" label="Create content" />
          <Checkbox id="edit-content" value="edit-content" label="Edit content" />
          <Checkbox id="publish-content" value="publish-content" label="Publish content" />
        </div>
      </CheckboxGroup>
    </div>
  ),
};

/**
 * Interaction test for the parent/child hierarchy: selecting one child turns ONLY its own parent
 * `mixed` (the sibling category is untouched), completing every child checks that parent, toggling
 * a parent checks/clears only its own children, and toggling one category never leaks into the
 * other. Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const NestedParentCheckboxInteraction: Story = {
  ...NestedParentCheckbox,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const manageUsers = canvas.getByRole("checkbox", { name: "Manage users" });
    const createUser = canvas.getByRole("checkbox", { name: "Create user" });
    const editUser = canvas.getByRole("checkbox", { name: "Edit user" });
    const deleteUser = canvas.getByRole("checkbox", { name: "Delete user" });
    const assignRoles = canvas.getByRole("checkbox", { name: "Assign roles" });
    const manageContent = canvas.getByRole("checkbox", { name: "Manage content" });
    const createContent = canvas.getByRole("checkbox", { name: "Create content" });

    // nothing selected anywhere → both parents read clear
    await expect(manageUsers).toHaveAttribute("aria-checked", "false");
    await expect(manageContent).toHaveAttribute("aria-checked", "false");

    // selecting one child turns ONLY its own parent mixed; the sibling category is untouched
    await userEvent.click(createUser);
    await expect(manageUsers).toHaveAttribute("aria-checked", "mixed");
    await expect(manageContent).toHaveAttribute("aria-checked", "false");
    await expect(createContent).toHaveAttribute("aria-checked", "false");

    // completing every child of a category checks its parent — the sibling stays clear
    await userEvent.click(editUser);
    await userEvent.click(deleteUser);
    await userEvent.click(assignRoles);
    await expect(manageUsers).toHaveAttribute("aria-checked", "true");
    await expect(manageContent).toHaveAttribute("aria-checked", "false");

    // toggling a checked parent clears only its own children
    await userEvent.click(manageUsers);
    await expect(manageUsers).toHaveAttribute("aria-checked", "false");
    await expect(createUser).toHaveAttribute("aria-checked", "false");
    await expect(assignRoles).toHaveAttribute("aria-checked", "false");

    // toggling the OTHER parent checks only its own children — no leak into the first category
    await userEvent.click(manageContent);
    await expect(manageContent).toHaveAttribute("aria-checked", "true");
    await expect(createContent).toHaveAttribute("aria-checked", "true");
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
