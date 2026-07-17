import { OTPField } from "@makeplane/propel/components/otp-field";

export default function InvalidDemo() {
  return (
    <OTPField
      length={6}
      magnitude="md"
      defaultValue="12"
      error="Code is invalid"
      aria-label="Verification code"
    />
  );
}
