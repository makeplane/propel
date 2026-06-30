import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search as SearchIconGlyph, X } from "lucide-react";
import * as React from "react";
import { expect, userEvent } from "storybook/test";

import { IconButton, IconButtonIcon } from "../icon-button";
import {
  Search,
  SearchExpandable,
  SearchExpandableViewport,
  SearchIcon,
  SearchInput,
  type SearchMagnitude,
} from "./index";

// UI-tier story: composes the ATOMIC search parts (each renders a single element) — the
// box (`Search` / `SearchExpandable`), its leading `SearchIcon`, the `SearchInput`, and a
// trailing ghost `IconButton` clear control. The box holds no input logic; wiring the value,
// clear button, and expand-on-focus behavior is the components-tier `Search` / `ExpandableSearch`'s job.
const meta = {
  title: "UI/Search",
  component: Search,
  args: { magnitude: "md" },
  subcomponents: {
    SearchIcon,
    SearchInput,
    IconButton,
    SearchExpandableViewport,
    SearchExpandable,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1393-45336",
    },
  },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Assemble the atomic parts: box › leading icon › input › trailing clear. */
function ComposedSearch({ magnitude = "md" }: { magnitude?: SearchMagnitude }) {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasValue = value !== "";
  return (
    <Search magnitude={magnitude}>
      <SearchIcon>
        <SearchIconGlyph />
      </SearchIcon>
      <SearchInput
        ref={inputRef}
        magnitude={magnitude}
        value={value}
        onValueChange={setValue}
        placeholder="Search"
        aria-label="Search"
      />
      {hasValue ? (
        <IconButton
          prominence="ghost"
          tone="neutral"
          magnitude={magnitude === "lg" ? "md" : "sm"}
          aria-label="Clear search"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
        >
          <IconButtonIcon>
            <X />
          </IconButtonIcon>
        </IconButton>
      ) : null}
    </Search>
  );
}

/** Empty search field — leading magnifier + placeholder, no clear button yet. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ComposedSearch />,
};

/** `sm` (28 px) — the compact size, used in dense toolbars. */
export const Small: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ComposedSearch magnitude="sm" />,
};

/** `lg` (36 px) — the spacious size. */
export const Large: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ComposedSearch magnitude="lg" />,
};

/** Typing reveals the clear button; clicking it empties the field and refocuses the input. */
export const TypeAndClear: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  render: () => <ComposedSearch />,
  play: async ({ canvas }) => {
    const input = canvas.getByRole("searchbox", { name: "Search" });
    await expect(canvas.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();

    await userEvent.type(input, "Roadmap");
    await expect(input).toHaveValue("Roadmap");

    const clear = canvas.getByRole("button", { name: "Clear search" });
    await userEvent.click(clear);
    await expect(input).toHaveValue("");
    await expect(input).toHaveFocus();
    await expect(canvas.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
  },
};

/** Compose the expandable parts: viewport › expanding box › icon › input. */
function ComposedExpandable({ magnitude = "md" }: { magnitude?: SearchMagnitude }) {
  const [value, setValue] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasValue = value !== "";
  const showExpanded = focused || hasValue;
  return (
    <SearchExpandableViewport magnitude={magnitude}>
      <SearchExpandable magnitude={magnitude} data-expanded={showExpanded ? "" : undefined}>
        <SearchIcon>
          <SearchIconGlyph />
        </SearchIcon>
        <SearchInput
          ref={inputRef}
          magnitude={magnitude}
          value={value}
          onValueChange={setValue}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search"
          aria-label="Search"
        />
        {hasValue ? (
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude={magnitude === "lg" ? "md" : "sm"}
            aria-label="Clear search"
            onClick={() => {
              setValue("");
              inputRef.current?.focus();
            }}
          >
            <IconButtonIcon>
              <X />
            </IconButtonIcon>
          </IconButton>
        ) : null}
      </SearchExpandable>
    </SearchExpandableViewport>
  );
}

/**
 * `SearchExpandable` collapses to a magnifier square and expands into a full input while focused —
 * the toolbar/header pattern. Drive its `data-expanded` from focus/value state.
 */
export const Expandable: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ComposedExpandable />,
};
