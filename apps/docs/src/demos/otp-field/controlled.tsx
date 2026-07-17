import { OTPField } from "@makeplane/propel/components/otp-field";
import * as React from "react";

export default function ControlledDemo() {
  const [error, setError] = React.useState<React.ReactNode>(null);
  return (
    <OTPField
      length={6}
      magnitude="md"
      validationType="alphanumeric"
      normalizeValue={(value) => value.toUpperCase()}
      onValueChange={() => setError(null)}
      onValueInvalid={() => setError("Only letters and numbers are allowed")}
      error={error}
      aria-label="Recovery code"
    />
  );
}
