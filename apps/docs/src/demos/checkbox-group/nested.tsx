import { Checkbox } from "@makeplane/propel/components/checkbox";
import { CheckboxGroup } from "@makeplane/propel/components/checkbox-group";
import * as React from "react";

const MANAGE_USERS_PERMISSIONS = ["create-user", "edit-user", "delete-user", "assign-roles"];
const MANAGE_CONTENT_PERMISSIONS = ["create-content", "edit-content", "publish-content"];

export default function NestedDemo() {
  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup
        density="comfortable"
        aria-label="Manage users"
        allValues={MANAGE_USERS_PERMISSIONS}
        defaultValue={[]}
      >
        <Checkbox parent label="Manage users" />
        <div className="flex flex-col gap-2 ps-6">
          <Checkbox value="create-user" label="Create user" />
          <Checkbox value="edit-user" label="Edit user" />
          <Checkbox value="delete-user" label="Delete user" />
          <Checkbox value="assign-roles" label="Assign roles" />
        </div>
      </CheckboxGroup>
      <CheckboxGroup
        density="comfortable"
        aria-label="Manage content"
        allValues={MANAGE_CONTENT_PERMISSIONS}
        defaultValue={[]}
      >
        <Checkbox parent label="Manage content" />
        <div className="flex flex-col gap-2 ps-6">
          <Checkbox value="create-content" label="Create content" />
          <Checkbox value="edit-content" label="Edit content" />
          <Checkbox value="publish-content" label="Publish content" />
        </div>
      </CheckboxGroup>
    </div>
  );
}
