import { OTPField } from "@makeplane/propel/components/otp-field";

export default function BasicDemo() {
  return <OTPField length={6} magnitude="md" aria-label="Verification code" />;
}
