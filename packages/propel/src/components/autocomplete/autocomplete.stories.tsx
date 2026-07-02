import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronsUpDown, Search as SearchGlyph, X } from "lucide-react";
import * as React from "react";
import { expect, waitFor, within } from "storybook/test";

import { Button } from "../../elements/button";
import { Dialog, DialogBody, DialogContent, DialogHeader, DialogTrigger } from "../dialog/index";
import { Field, FieldDescription, FieldError, FieldLabel } from "../field/index";
import { IconButton } from "../icon-button";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteStatus,
  useFilter,
} from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// Components-tier story: the ready-mades already carry the Base UI behavior, so the whole
// autocomplete composes without any Base UI import.
const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  subcomponents: {
    AutocompleteInputGroup,
    AutocompleteContent,
    AutocompleteList,
    AutocompleteItem,
    AutocompleteEmpty,
    AutocompleteStatus,
    AutocompleteGroup,
    AutocompleteGroupLabel,
    AutocompleteCollection,
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A free-form searchable input laid out as a form field, with clear and open controls. */
export const Default: Story = {
  args: { items: IMAGES, mode: "both", required: true },
  render: (args) => (
    <Field name="containerImage">
      <Autocomplete {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Container image
        </FieldLabel>
        <AutocompleteInputGroup
          magnitude="md"
          placeholder="e.g. docker.io/library/node:latest"
          clear={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Clear container image"
            >
              <X />
            </IconButton>
          }
          trigger={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Open container image"
            >
              <ChevronsUpDown />
            </IconButton>
          }
        />
        <FieldDescription magnitude="md">Enter a registry URL with optional tags.</FieldDescription>
        <AutocompleteContent>
          <AutocompleteEmpty>No matches</AutocompleteEmpty>
          <AutocompleteList>
            {(image: string) => (
              <AutocompleteItem key={image} value={image} magnitude="md">
                {image}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
        <FieldError magnitude="md" />
      </Autocomplete>
    </Field>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Container image" }), "node");
    // Base UI filters the list to the query: matches stay, everything else drops out.
    await expect(within(document.body).getByText("node:22-slim")).toBeInTheDocument();
    await expect(within(document.body).queryByText("postgres:18")).not.toBeInTheDocument();
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
    await userEvent.type(canvas.getByRole("combobox", { name: "Container image" }), "zzz");
    const popup = within(document.body);
    await expect(popup.queryAllByRole("option")).toHaveLength(0);
    await expect(popup.getByRole("status")).toHaveTextContent("No matches");
  },
};

/**
 * Interaction test: an invalid `Field` propagates Base UI's validity to the autocomplete input as
 * `aria-invalid`/`data-invalid` (the input group's frame recolors to danger off
 * `:has([data-invalid])` — pinned and asserted in the Elements/Autocomplete `States` canary), and
 * the matching `FieldError` renders. Tagged out of the sidebar/docs/manifest while still running
 * under the default `test` tag.
 */
export const InvalidInteraction: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { items: IMAGES, mode: "both", required: true },
  render: (args) => (
    <Field name="containerImage" invalid>
      <Autocomplete {...args}>
        <FieldLabel magnitude="md" inset={false}>
          Container image
        </FieldLabel>
        <AutocompleteInputGroup magnitude="md" placeholder="e.g. docker.io/library/node:latest" />
        <FieldError match={true} magnitude="md">
          Enter a container image.
        </FieldError>
      </Autocomplete>
    </Field>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByRole("combobox", { name: "Container image" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAttribute("data-invalid");
    await expect(canvas.getByText("Enter a container image.")).toBeInTheDocument();
  },
};

/** The autocomplete dressed as a search box: a leading magnifier `icon` + input + clear. */
export const Search: Story = {
  args: { items: IMAGES, mode: "both" },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInputGroup
        magnitude="md"
        icon={<SearchGlyph />}
        placeholder="Search images"
        aria-label="Search images"
        clear={
          <IconButton prominence="ghost" tone="neutral" magnitude="md" aria-label="Clear search">
            <X />
          </IconButton>
        }
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
        <AutocompleteList>
          {(image: string) => (
            <AutocompleteItem key={image} value={image} magnitude="md">
              {image}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  ),
};

export const SearchInteraction: Story = {
  ...Search,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Search images" }), "redis");
    await expect(within(document.body).getByText("redis:8.2.2-alpine")).toBeInTheDocument();
  },
};

const PROJECTS = ["Design system", "Marketing site", "Mobile app", "Platform API"];

/**
 * Items loaded asynchronously while typing: the root's `filter={null}` hands filtering to the
 * consumer, `value`/`onValueChange` drive the (deterministic, 300 ms) lookup, and
 * `AutocompleteStatus` announces the transient "Searching…" hint and the settled result count in a
 * polite live region.
 */
export const AsyncSearch: Story = {
  render: function Render() {
    const [value, setValue] = React.useState("");
    const [results, setResults] = React.useState<readonly string[]>([]);
    const [searching, setSearching] = React.useState(false);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const { contains } = useFilter();

    React.useEffect(() => () => clearTimeout(timeoutRef.current), []);

    return (
      <Autocomplete
        items={results}
        value={value}
        filter={null}
        onValueChange={(nextValue) => {
          setValue(nextValue);
          clearTimeout(timeoutRef.current);
          if (nextValue === "") {
            setSearching(false);
            setResults([]);
            return;
          }
          setSearching(true);
          timeoutRef.current = setTimeout(() => {
            setResults(PROJECTS.filter((project) => contains(project, nextValue)));
            setSearching(false);
          }, 300);
        }}
      >
        <AutocompleteInputGroup
          magnitude="md"
          icon={<SearchGlyph />}
          placeholder="Search projects"
          aria-label="Search projects"
        />
        <AutocompleteContent>
          <AutocompleteStatus>
            {searching
              ? "Searching…"
              : value !== "" && `${results.length} result${results.length === 1 ? "" : "s"}`}
          </AutocompleteStatus>
          <AutocompleteList>
            {(project: string) => (
              <AutocompleteItem key={project} value={project} magnitude="md">
                {project}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

/**
 * Interaction test: typing kicks off the 300 ms lookup, which settles into the matching item and
 * the result count in the status region. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const AsyncSearchInteraction: Story = {
  ...AsyncSearch,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Search projects" }), "des");
    const popup = within(document.body);
    // The in-story delay resolves: the matching item appears and the status settles on the count.
    await expect(await popup.findByRole("option", { name: "Design system" })).toBeInTheDocument();
    await expect(popup.getByRole("status")).toHaveTextContent("1 result");
  },
};

const GROUPED_LABELS = [
  { label: "Type", items: ["feature", "fix", "bug", "docs"] },
  { label: "Component", items: ["component: editor", "component: sidebar", "component: issues"] },
];

/**
 * Grouped suggestions: the root receives the grouped `items`, the list function-child receives each
 * group, and `AutocompleteGroup` + `AutocompleteCollection` render the group's own filtered options
 * under an `AutocompleteGroupLabel`. Filtering drops empty groups (and their headings)
 * automatically.
 */
export const Grouped: Story = {
  render: () => (
    <Autocomplete items={GROUPED_LABELS}>
      <AutocompleteInputGroup magnitude="md" placeholder="e.g. feature" aria-label="Add label" />
      <AutocompleteContent>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
        <AutocompleteList>
          {(group: (typeof GROUPED_LABELS)[number]) => (
            <AutocompleteGroup key={group.label} items={group.items}>
              <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
              <AutocompleteCollection>
                {(label: string) => (
                  <AutocompleteItem key={label} value={label} magnitude="md">
                    {label}
                  </AutocompleteItem>
                )}
              </AutocompleteCollection>
            </AutocompleteGroup>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
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
    await userEvent.type(canvas.getByRole("combobox", { name: "Add label" }), "fea");
    const popup = within(document.body);
    await expect(popup.getByText("Type")).toBeInTheDocument();
    await expect(popup.getByText("feature")).toBeInTheDocument();
    await expect(popup.queryByText("Component")).not.toBeInTheDocument();
    await expect(popup.queryByText("component: editor")).not.toBeInTheDocument();
  },
};

// A subsequence matcher: every query character must appear in the item, in order — so partial or
// skipped-letter queries ("ngx", "pstgrs") still find their item.
function fuzzyMatch(item: string, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (needle === "") {
    return true;
  }
  let matched = 0;
  for (const char of item.toLowerCase()) {
    if (char === needle[matched]) {
      matched += 1;
    }
    if (matched === needle.length) {
      return true;
    }
  }
  return false;
}

/**
 * Fuzzy matching: a custom `filter` on the root replaces the built-in contains matching, so
 * relevant results surface even when the query skips characters (e.g. "ngx" still finds
 * "nginx:1.29-alpine").
 */
export const FuzzyMatching: Story = {
  render: () => (
    <Autocomplete items={IMAGES} filter={fuzzyMatch}>
      <AutocompleteInputGroup
        magnitude="md"
        icon={<SearchGlyph />}
        placeholder="Search images"
        aria-label="Search images"
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
        <AutocompleteList>
          {(image: string) => (
            <AutocompleteItem key={image} value={image} magnitude="md">
              {image}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  ),
};

/**
 * Interaction test: a skipped-letter query keeps its fuzzy match and drops everything else — the
 * built-in contains filter would have matched nothing. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const FuzzyMatchingInteraction: Story = {
  ...FuzzyMatching,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Search images" }), "pstgrs");
    const popup = within(document.body);
    await expect(popup.getByRole("option", { name: "postgres:18" })).toBeInTheDocument();
    await expect(popup.queryByText("node:22-slim")).not.toBeInTheDocument();
  },
};

const LABELS = [
  "accessibility",
  "backend",
  "bug",
  "design",
  "docs",
  "feature",
  "fix",
  "frontend",
  "infrastructure",
  "internal",
  "mobile",
  "performance",
  "research",
  "testing",
  "tooling",
];

const LABEL_LIMIT = 8;

/**
 * Capped results: the root's `limit` keeps only the first matches visible, and `AutocompleteStatus`
 * tells users how many more exist so they refine the query instead of scrolling. The controlled
 * `value` plus the `useFilter` hook compute the hidden count.
 */
export const LimitResults: Story = {
  render: function Render() {
    const [value, setValue] = React.useState("");
    const { contains } = useFilter();
    const total =
      value.trim() === ""
        ? LABELS.length
        : LABELS.filter((label) => contains(label, value.trim())).length;
    const hidden = Math.max(0, total - LABEL_LIMIT);

    return (
      <Autocomplete items={LABELS} limit={LABEL_LIMIT} value={value} onValueChange={setValue}>
        <AutocompleteInputGroup
          magnitude="md"
          placeholder="e.g. frontend"
          aria-label="Filter labels"
          trigger={
            <IconButton
              prominence="ghost"
              tone="neutral"
              magnitude="md"
              aria-label="Show all labels"
            >
              <ChevronsUpDown />
            </IconButton>
          }
        />
        <AutocompleteContent>
          <AutocompleteEmpty>No matches</AutocompleteEmpty>
          <AutocompleteList>
            {(label: string) => (
              <AutocompleteItem key={label} value={label} magnitude="md">
                {label}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteStatus>
            {hidden > 0 && `${hidden} more — keep typing to narrow`}
          </AutocompleteStatus>
        </AutocompleteContent>
      </Autocomplete>
    );
  },
};

/**
 * Interaction test: opening the full list caps the options at the limit and announces the hidden
 * count; narrowing the query under the cap clears the hint. Tagged out of the sidebar/docs/manifest
 * while still running under the default `test` tag.
 */
export const LimitResultsInteraction: Story = {
  ...LimitResults,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Show all labels" }));
    const popup = within(document.body);
    await expect(await popup.findAllByRole("option")).toHaveLength(LABEL_LIMIT);
    await expect(await popup.findByText(/7 more — keep typing to narrow/)).toBeInTheDocument();

    await userEvent.type(canvas.getByRole("combobox", { name: "Filter labels" }), "front");
    await expect(popup.getAllByRole("option")).toHaveLength(1);
    await expect(popup.queryByText(/keep typing to narrow/)).not.toBeInTheDocument();
  },
};

/**
 * `autoHighlight` moves the highlight to the first matching item as the user types, so Enter
 * accepts the top suggestion without an arrow-key press first.
 */
export const AutoHighlight: Story = {
  args: { items: IMAGES, autoHighlight: true },
  render: (args) => (
    <Autocomplete {...args}>
      <AutocompleteInputGroup
        magnitude="md"
        icon={<SearchGlyph />}
        placeholder="Search images"
        aria-label="Search images"
      />
      <AutocompleteContent>
        <AutocompleteEmpty>No matches</AutocompleteEmpty>
        <AutocompleteList>
          {(image: string) => (
            <AutocompleteItem key={image} value={image} magnitude="md">
              {image}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompleteContent>
    </Autocomplete>
  ),
};

/**
 * Interaction test: typing highlights the first matching option automatically — no ArrowDown
 * needed. Tagged out of the sidebar/docs/manifest while still running under the default `test`
 * tag.
 */
export const AutoHighlightInteraction: Story = {
  ...AutoHighlight,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("combobox", { name: "Search images" }), "node");
    const options = await within(document.body).findAllByRole("option");
    await expect(options[0]).toHaveTextContent("node:22-slim");
    await expect(options[0]).toHaveAttribute("data-highlighted");
  },
};

const COMMAND_GROUPS = [
  { label: "Navigation", items: ["Go to inbox", "Go to cycles", "Go to modules"] },
  { label: "Actions", items: ["Create work item", "Create page", "Invite teammates"] },
];

/**
 * A command palette: the autocomplete renders `open` and `inline` inside a `Dialog`, filtering a
 * grouped command list. `autoHighlight="always"` + `keepHighlight` keep the top command primed for
 * Enter, and picking a command closes the palette.
 */
export const CommandPalette: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          sizing="hug"
          prominence="secondary"
          tone="neutral"
          magnitude="xl"
          render={<DialogTrigger />}
        >
          Open command palette
        </Button>
        <DialogContent magnitude="md" aria-label="Command palette">
          <Autocomplete open inline items={COMMAND_GROUPS} autoHighlight="always" keepHighlight>
            <DialogHeader>
              <AutocompleteInputGroup
                magnitude="md"
                icon={<SearchGlyph />}
                placeholder="Search commands"
                aria-label="Search commands"
              />
            </DialogHeader>
            <DialogBody>
              <AutocompleteEmpty>No commands found</AutocompleteEmpty>
              <AutocompleteList>
                {(group: (typeof COMMAND_GROUPS)[number]) => (
                  <AutocompleteGroup key={group.label} items={group.items}>
                    <AutocompleteGroupLabel>{group.label}</AutocompleteGroupLabel>
                    <AutocompleteCollection>
                      {(command: string) => (
                        <AutocompleteItem
                          key={command}
                          value={command}
                          magnitude="md"
                          onClick={() => setOpen(false)}
                        >
                          {command}
                        </AutocompleteItem>
                      )}
                    </AutocompleteCollection>
                  </AutocompleteGroup>
                )}
              </AutocompleteList>
            </DialogBody>
          </Autocomplete>
        </DialogContent>
      </Dialog>
    );
  },
};

/**
 * Interaction test: the trigger opens the palette, typing filters and auto-highlights the matching
 * command, and picking it closes the dialog. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const CommandPaletteInteraction: Story = {
  ...CommandPalette,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open command palette" }));
    const body = within(document.body);
    const input = await body.findByRole("combobox", { name: "Search commands" });

    await userEvent.type(input, "page");
    const option = await body.findByRole("option", { name: "Create page" });
    // `autoHighlight="always"` keeps the top match primed for Enter.
    await expect(option).toHaveAttribute("data-highlighted");
    await expect(body.queryByRole("option", { name: "Go to inbox" })).not.toBeInTheDocument();

    await userEvent.click(option);
    await waitFor(() => expect(body.queryByRole("dialog")).not.toBeInTheDocument());
  },
};
