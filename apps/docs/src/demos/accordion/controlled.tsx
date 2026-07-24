import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@makeplane/propel/components/accordion";
import { Button } from "@makeplane/propel/components/button";
import * as React from "react";

const ITEMS = [
  {
    value: "what",
    label: "What is Plane?",
    body: "Plane is an open-source project management tool for tracking issues, sprints, and product roadmaps.",
  },
  {
    value: "pricing",
    label: "How does pricing work?",
    body: "Plane is free to self-host. Managed plans add hosting, backups, and support.",
  },
  {
    value: "import",
    label: "Can I import my existing data?",
    body: "Yes — Plane can import work items from common trackers so you can migrate without losing history.",
  },
];

export default function ControlledDemo() {
  const [value, setValue] = React.useState<string[]>(["what"]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          fillType="hug"
          label="Expand all"
          onClick={() => setValue(ITEMS.map((item) => item.value))}
        />
        <Button
          variant="secondary"
          size="sm"
          fillType="hug"
          label="Collapse all"
          onClick={() => setValue([])}
        />
      </div>
      <Accordion multiple value={value} onValueChange={(next) => setValue(next as string[])}>
        {ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionHeader>
              <AccordionTrigger label={item.label} />
            </AccordionHeader>
            <AccordionPanel>{item.body}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
