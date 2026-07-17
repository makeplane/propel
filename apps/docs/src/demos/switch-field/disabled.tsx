import { SwitchField } from "@makeplane/propel/components/switch-field";

export default function DisabledDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <SwitchField
        name="ssoEnforced"
        label="Enforce single sign-on"
        description="Managed by your identity provider."
        magnitude="md"
        defaultChecked
        disabled
      />
      <SwitchField
        name="legacyApi"
        label="Allow legacy API tokens"
        description="Disabled for this workspace plan."
        magnitude="md"
        disabled
      />
    </div>
  );
}
