import { Input, InputGroup } from "@makeplane/propel/components/input";

export default function MagnitudesDemo() {
  return (
    <div className="flex w-72 flex-col gap-3">
      <InputGroup magnitude="md">
        <Input magnitude="md" aria-label="Medium" placeholder="Medium" />
      </InputGroup>
      <InputGroup magnitude="lg">
        <Input magnitude="lg" aria-label="Large" placeholder="Large" />
      </InputGroup>
      <InputGroup magnitude="xl">
        <Input magnitude="xl" aria-label="Extra large" placeholder="Extra large" />
      </InputGroup>
    </div>
  );
}
