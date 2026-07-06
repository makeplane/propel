import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, X } from "lucide-react";
import * as React from "react";
import { expect, waitFor, within } from "storybook/test";

import { Button } from "../button/index";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeading,
  DialogTitle,
} from "../dialog/index";
import { Field, FieldError, FieldLabel } from "../field/index";
import { Icon } from "../icon";
import { IconButton } from "../icon-button";
import { InputField } from "../input-field/index";
import {
  Combobox,
  ComboboxChips,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxStatus,
  useFilter,
} from "./index";

const REGIONS = ["us-central-1", "us-east-1", "eu-central-1", "ap-west-1"];

// Components-tier story: the ready-mades collapse every Base UI behavior part — `ComboboxInputGroup`
// bundles the input + clear/trigger controls, `ComboboxContent` the portal/positioner/popup, and
// `ComboboxItem` the indicator row — so a full combobox composes without touching `@base-ui/react`.
// The elements-tier `Combobox` story wires the raw styled parts by hand.
const meta = {
  title: "Components/Combobox",
  component: Combobox,
  subcomponents: {
    ComboboxInputGroup,
    ComboboxChips,
    ComboboxContent,
    ComboboxList,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxGroupLabel,
    ComboboxCollection,
    ComboboxStatus,
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A filterable single-select: `ComboboxInputGroup` is the input frame (pass the clear/trigger
 * controls — each carries its own localizable `aria-label`), `ComboboxContent` the popup surface,
 * and `ComboboxItem` the option rows with the selection check baked in.
 */
export const Default: Story = {
  args: { items: REGIONS, required: true },
  render: (args) => (
    <Field name="region">
      <Combobox {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup
          magnitude="md"
          placeholder="e.g. eu-central-1"
          clear={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Clear region"
              icon={<Icon icon={X} />}
            />
          }
          trigger={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Open region"
              icon={<Icon icon={ChevronsUpDown} />}
            />
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {(region: string) => (
              <ComboboxItem key={region} value={region} magnitude="md" label={region} />
            )}
          </ComboboxList>
        </ComboboxContent>
        <FieldError magnitude="md" />
      </Combobox>
    </Field>
  ),
};

/**
 * Interaction test: typing filters the popup down to the matching option. Tagged out of the
 * sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    // Base UI filters the list to the query: matches stay, everything else drops out.
    await expect(within(document.body).getByText("eu-central-1")).toBeInTheDocument();
    await expect(within(document.body).queryByText("us-east-1")).not.toBeInTheDocument();
    // The Empty live region stays mounted for screen readers but holds no content (and takes no
    // space) while there are matches.
    await expect(within(document.body).getByRole("status")).toBeEmptyDOMElement();
  },
};

/**
 * Interaction test: a query with no matches empties the list and shows the polite "No matches"
 * status. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const EmptyInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "zzz");
    const popup = within(document.body);
    await expect(popup.queryAllByRole("option")).toHaveLength(0);
    await expect(popup.getByRole("status")).toHaveTextContent("No matches");
  },
};

/**
 * Interaction test: `Field invalid` propagates validity through the ready-mades — the input carries
 * `aria-invalid`/`data-invalid` (which the input group's danger border keys off) and the matched
 * `FieldError` message renders. Tagged out of the sidebar/docs/manifest while still running under
 * the default `test` tag.
 */
export const InvalidInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => (
    <Field name="region" invalid>
      <Combobox items={REGIONS} required>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup magnitude="md" placeholder="e.g. eu-central-1" />
        <FieldError match={true} magnitude="md">
          Choose a deployment region.
        </FieldError>
      </Combobox>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Region" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    await expect(canvas.getByText("Choose a deployment region.")).toBeInTheDocument();
  },
};

/**
 * `multiple` swaps the input frame for `ComboboxChips`: each selected value renders as a removable
 * chip ahead of the inline input, wrapping onto new rows as the selection grows. `removeLabel`
 * names each chip's remove button (localizable, required). Arrow keys move focus across chips;
 * Backspace removes.
 */
export const Multiple: Story = {
  render: () => (
    <Field name="regions">
      <Combobox multiple items={REGIONS} defaultValue={["us-east-1", "eu-central-1"]}>
        <FieldLabel magnitude="md" inset={false}>
          Regions
        </FieldLabel>
        <ComboboxChips
          magnitude="md"
          placeholder="Add a region"
          removeLabel={(region) => `Remove ${region}`}
        />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {(region: string) => (
              <ComboboxItem key={region} value={region} magnitude="md" label={region} />
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

/**
 * Interaction test: both preselected values render as chips, a chip's remove button drops just that
 * value, and picking another item appends a chip. Tagged out of the sidebar/docs/manifest while
 * still running under the default `test` tag.
 */
export const MultipleInteraction: Story = {
  ...Multiple,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText("us-east-1")).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Remove us-east-1" }));
    await expect(canvas.queryByText("us-east-1")).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole("combobox", { name: "Regions" }));
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: "ap-west-1" }));
    await expect(canvas.getByText("ap-west-1")).toBeInTheDocument();
    await expect(canvas.getByText("eu-central-1")).toBeInTheDocument();
  },
};

const GROUPED_REGIONS = [
  { label: "Americas", items: ["us-central-1", "us-east-1", "sa-east-1"] },
  { label: "Europe", items: ["eu-central-1", "eu-west-1"] },
  { label: "Asia Pacific", items: ["ap-west-1", "ap-southeast-2"] },
];

/**
 * Grouped options: the root receives the grouped `items`, the list function-child receives each
 * group, and `ComboboxGroup` + `ComboboxCollection` render the group's own filtered options under a
 * `ComboboxGroupLabel`. Filtering drops empty groups (and their headings) automatically.
 */
export const Grouped: Story = {
  render: () => (
    <Field name="region">
      <Combobox items={GROUPED_REGIONS}>
        <FieldLabel magnitude="md" inset={false}>
          Region
        </FieldLabel>
        <ComboboxInputGroup magnitude="md" placeholder="e.g. eu-central-1" />
        <ComboboxContent>
          <ComboboxEmpty>No matches</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof GROUPED_REGIONS)[number]) => (
              <ComboboxGroup key={group.label} items={group.items}>
                <ComboboxGroupLabel>{group.label}</ComboboxGroupLabel>
                <ComboboxCollection>
                  {(region: string) => (
                    <ComboboxItem key={region} value={region} magnitude="md" label={region} />
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
};

/**
 * Interaction test: filtering inside groups keeps only matching options and drops group headings
 * with no matches. Tagged out of the sidebar/docs/manifest while still running under the default
 * `test` tag.
 */
export const GroupedInteraction: Story = {
  ...Grouped,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Region" }), "eu");
    const popup = within(document.body);
    await expect(popup.getByText("Europe")).toBeInTheDocument();
    await expect(popup.getByText("eu-central-1")).toBeInTheDocument();
    await expect(popup.queryByText("Americas")).not.toBeInTheDocument();
    await expect(popup.queryByText("us-east-1")).not.toBeInTheDocument();
  },
};

const MEMBERS = ["Aaditya Kapoor", "Bianca Ferreira", "Marcus Chen", "Priya Nair", "Rohan Sharma"];

/**
 * Items loaded from a remote source: `filter={null}` turns the built-in filtering off, the root's
 * `onInputValueChange` drives the (deterministic, 300 ms) search, and `ComboboxStatus` — a polite
 * live region inside the popup — carries the "Searching…" / "Start typing" hints while
 * `ComboboxEmpty` keeps the settled no-matches message.
 */
export const AsyncSearch: Story = {
  render: function Render() {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<string[]>([]);
    const [pending, setPending] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const { contains } = useFilter();

    React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const trimmed = query.trim();
    const status = pending
      ? "Searching…"
      : trimmed === ""
        ? "Start typing to search members"
        : null;

    return (
      <Field name="reviewer">
        <Combobox
          items={results}
          // Built-in filtering is off: the (fake) server already returns only the matches.
          filter={null}
          onInputValueChange={(nextQuery, { reason }) => {
            setQuery(nextQuery);
            if (reason === "item-press") {
              return;
            }
            clearTimeout(timeoutRef.current);
            const trimmedQuery = nextQuery.trim();
            if (trimmedQuery === "") {
              setResults([]);
              setPending(false);
              return;
            }
            setPending(true);
            // Deterministic stand-in for a server search: resolves after a short in-story delay.
            timeoutRef.current = setTimeout(() => {
              setResults(MEMBERS.filter((member) => contains(member, trimmedQuery)));
              setPending(false);
            }, 300);
          }}
        >
          <FieldLabel magnitude="md" inset={false}>
            Reviewer
          </FieldLabel>
          <ComboboxInputGroup
            magnitude="md"
            placeholder="e.g. Priya"
            clear={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Clear reviewer"
                icon={<Icon icon={X} />}
              />
            }
            trigger={
              <IconButton
                prominence="ghost"
                tone="neutral"
                magnitude="md"
                aria-label="Open reviewer"
                icon={<Icon icon={ChevronsUpDown} />}
              />
            }
          />
          <ComboboxContent>
            <ComboboxStatus>{status}</ComboboxStatus>
            <ComboboxEmpty>{!pending && trimmed !== "" ? "No members match" : null}</ComboboxEmpty>
            <ComboboxList>
              {(member: string) => (
                <ComboboxItem key={member} value={member} magnitude="md" label={member} />
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </Field>
    );
  },
};

/**
 * Interaction test: typing shows the pending Status hint, then the settled results replace it —
 * only the matching member is listed. Tagged out of the sidebar/docs/manifest while still running
 * under the default `test` tag.
 */
export const AsyncSearchInteraction: Story = {
  ...AsyncSearch,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Reviewer" }), "ro");
    const popup = within(document.body);
    // The polite Status live region announces the in-flight search…
    await expect(await popup.findByText("Searching…")).toBeInTheDocument();
    // …then the settled results replace it.
    await expect(await popup.findByRole("option", { name: "Rohan Sharma" })).toBeInTheDocument();
    await waitFor(() => expect(popup.queryByText("Searching…")).not.toBeInTheDocument());
    await expect(popup.queryByRole("option", { name: "Marcus Chen" })).not.toBeInTheDocument();
  },
};

type ProjectLabel = {
  id: string;
  value: string;
  /** The raw query this row would create — present only on the synthetic "Create …" row. */
  creatable?: string;
};

const INITIAL_LABELS: ProjectLabel[] = [
  { id: "bug", value: "bug" },
  { id: "documentation", value: "documentation" },
  { id: "enhancement", value: "enhancement" },
  { id: "help-wanted", value: "help wanted" },
];

/**
 * Creating a new item when the query matches nothing: a synthetic `Create "…"` row is appended to
 * `items`, and picking it opens a creation `Dialog` (intercepted in the root's `onValueChange`)
 * instead of selecting. Confirming adds the new label to the list and selects it as a chip.
 */
export const Creatable: Story = {
  render: function Render() {
    const [labels, setLabels] = React.useState(INITIAL_LABELS);
    const [selected, setSelected] = React.useState<ProjectLabel[]>([]);
    const [query, setQuery] = React.useState("");
    // The label name being drafted in the dialog; non-null while the dialog is open.
    const [draft, setDraft] = React.useState<string | null>(null);

    const trimmed = query.trim();
    const exists = labels.some(
      (label) => label.value.toLocaleLowerCase() === trimmed.toLocaleLowerCase(),
    );
    // When the query matches no existing label exactly, append a synthetic "Create …" row. Its
    // display text contains the query, so it survives the built-in filter alongside partial
    // matches.
    const items =
      trimmed === "" || exists
        ? labels
        : [
            ...labels,
            { id: `create:${trimmed}`, value: `Create "${trimmed}"`, creatable: trimmed },
          ];

    function createLabel() {
      const value = draft?.trim();
      if (!value) {
        return;
      }
      const newLabel: ProjectLabel = {
        id: value.toLocaleLowerCase().replace(/\s+/g, "-"),
        value,
      };
      setLabels((prev) => [...prev, newLabel]);
      setSelected((prev) => [...prev, newLabel]);
      setDraft(null);
      setQuery("");
    }

    return (
      <>
        <Field name="labels">
          <Combobox
            multiple
            items={items}
            value={selected}
            inputValue={query}
            onInputValueChange={setQuery}
            itemToStringLabel={(label: ProjectLabel) => label.value}
            onValueChange={(next) => {
              // Picking the synthetic row opens the creation dialog instead of selecting it.
              const created = next.find((label) => label.creatable != null);
              if (created?.creatable != null) {
                setDraft(created.creatable);
                return;
              }
              setSelected(next);
              setQuery("");
            }}
          >
            <FieldLabel magnitude="md" inset={false}>
              Labels
            </FieldLabel>
            <ComboboxChips
              magnitude="md"
              placeholder="Add a label"
              removeLabel={(label: ProjectLabel) => `Remove ${label.value}`}
              itemToStringLabel={(label: ProjectLabel) => label.value}
            />
            <ComboboxContent>
              <ComboboxEmpty>No labels found</ComboboxEmpty>
              <ComboboxList>
                {(label: ProjectLabel) => (
                  <ComboboxItem key={label.id} value={label} magnitude="md" label={label.value} />
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>

        <Dialog
          open={draft != null}
          onOpenChange={(open) => {
            if (!open) {
              setDraft(null);
            }
          }}
        >
          <DialogContent magnitude="sm">
            <DialogHeader>
              <DialogHeading>
                <DialogTitle>Create new label</DialogTitle>
              </DialogHeading>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>Add a new label to select.</DialogDescription>
              <InputField
                magnitude="md"
                orientation="vertical"
                label="Label name"
                value={draft ?? ""}
                onValueChange={(value) => setDraft(value)}
              />
            </DialogBody>
            <DialogActions>
              <Button
                sizing="hug"
                prominence="secondary"
                tone="neutral"
                magnitude="xl"
                render={<DialogClose />}
                label="Cancel"
              />
              <Button
                sizing="hug"
                prominence="primary"
                tone="neutral"
                magnitude="xl"
                onClick={createLabel}
                label="Create"
              />
            </DialogActions>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

/**
 * Interaction test: an unknown query offers the `Create "…"` row, picking it opens the dialog
 * seeded with the query, and confirming closes the dialog and selects the created label as a chip.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const CreatableInteraction: Story = {
  ...Creatable,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Labels" }), "triage");
    const popup = within(document.body);
    await userEvent.click(await popup.findByRole("option", { name: 'Create "triage"' }));

    const dialog = await within(document.body).findByRole("dialog");
    await expect(within(dialog).getByRole("textbox", { name: "Label name" })).toHaveValue("triage");
    await userEvent.click(within(dialog).getByRole("button", { name: "Create" }));

    await waitFor(() =>
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument(),
    );
    // The created label is now selected as a removable chip.
    await expect(canvas.getByText("triage")).toBeInTheDocument();
  },
};
