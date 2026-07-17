import { OTPField, type OTPFieldInputMagnitude } from "@makeplane/propel/components/otp-field";

const MAGNITUDES: OTPFieldInputMagnitude[] = ["md", "lg", "xl"];

export default function MagnitudesDemo() {
  return (
    <div className="flex flex-col items-start gap-4">
      {MAGNITUDES.map((magnitude) => (
        <OTPField
          key={magnitude}
          length={6}
          magnitude={magnitude}
          defaultValue="123456"
          aria-label="Verification code"
        />
      ))}
    </div>
  );
}
