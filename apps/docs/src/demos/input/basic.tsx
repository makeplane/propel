import { Input, InputGroup } from "@makeplane/propel/components/input";

export default function BasicDemo() {
  return (
    <InputGroup magnitude="md">
      <Input magnitude="md" aria-label="Name" placeholder="Ada Lovelace" />
    </InputGroup>
  );
}
