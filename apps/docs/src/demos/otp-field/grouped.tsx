import { OTPField } from "@makeplane/propel/components/otp-field";

export default function GroupedDemo() {
  return <OTPField length={6} magnitude="md" groups={[3, 3]} aria-label="Verification code" />;
}
