import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, Pencil, Settings, Trash2, UserPlus } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor } from "storybook/test";
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "./index";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  // Dropdown is a compound component; document the menu parts alongside the root so
  // their props appear in the args table and the relationship is recorded in the
  // manifest (the same pattern AvatarGroup uses for Avatar).
  subcomponents: {
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownCheckboxItem,
    DropdownSeparator,
    DropdownLabel,
  },
  tags: ["ai-generated"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// A plain trigger button styled with propel tokens — the dropdown itself doesn't
// ship a trigger style, so stories provide one to keep the focus on the menu.
const triggerClass =
  "inline-flex h-8 items-center rounded-md border border-subtle bg-surface-1 px-3 text-13 text-secondary outline-none";

/**
 * A trigger plus a menu mixing every item shape: a plain item, items with leading
 * icons, an item with a trailing value, a `with-description` item, a separator, and
 * a disabled item.
 */
export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger render={<button type="button" className={triggerClass} />}>
        Actions
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem icon={<Pencil />} label="Edit" />
        <DropdownItem icon={<Copy />} label="Duplicate" variant="with-value" value="⌘D" />
        <DropdownItem
          icon={<UserPlus />}
          label="Invite members"
          variant="with-description"
          description="Add people to this project"
        />
        <DropdownSeparator />
        <DropdownItem icon={<Settings />} label="Settings" disabled />
        <DropdownItem icon={<Trash2 />} label="Delete" />
      </DropdownContent>
    </Dropdown>
  ),
  play: async ({ canvas, step }) => {
    await step("opening the trigger reveals the menu", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Actions" }));
      // The popup renders in a portal, so query the document body and wait for it.
      const menu = await waitFor(() => document.body.querySelector('[role="menu"]'));
      await expect(menu).toBeInTheDocument();
    });

    await step("all items are present", async () => {
      await waitFor(() =>
        expect(document.body.querySelectorAll('[role="menuitem"]')).toHaveLength(5),
      );
      const edit = Array.from(document.body.querySelectorAll('[role="menuitem"]')).find((el) =>
        el.textContent?.includes("Edit"),
      );
      await expect(edit).toBeDefined();
    });

    await step("selecting an item closes the menu", async () => {
      const edit = Array.from(document.body.querySelectorAll('[role="menuitem"]')).find((el) =>
        el.textContent?.includes("Edit"),
      ) as HTMLElement;
      await userEvent.click(edit);
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeNull());
    });
  },
};

/**
 * A multi-select menu built from `DropdownCheckboxItem`s. Each row toggles its own
 * checked state and the menu stays open so several can be picked in one pass.
 */
export const WithCheckboxes: Story = {
  render: function WithCheckboxesStory() {
    const [filters, setFilters] = React.useState({
      assigned: true,
      created: false,
      subscribed: false,
    });
    return (
      <Dropdown>
        <DropdownTrigger render={<button type="button" className={triggerClass} />}>
          Filters
        </DropdownTrigger>
        <DropdownContent>
          <DropdownGroup>
            <DropdownLabel>Show items</DropdownLabel>
            <DropdownCheckboxItem
              label="Assigned to me"
              checked={filters.assigned}
              onCheckedChange={(checked) => setFilters((f) => ({ ...f, assigned: checked }))}
            />
            <DropdownCheckboxItem
              label="Created by me"
              checked={filters.created}
              onCheckedChange={(checked) => setFilters((f) => ({ ...f, created: checked }))}
            />
            <DropdownCheckboxItem
              label="Subscribed"
              checked={filters.subscribed}
              onCheckedChange={(checked) => setFilters((f) => ({ ...f, subscribed: checked }))}
            />
          </DropdownGroup>
        </DropdownContent>
      </Dropdown>
    );
  },
  play: async ({ canvas, step }) => {
    await step("open the menu", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Filters" }));
      await waitFor(() => expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument());
    });

    await step("toggling a checkbox item keeps the menu open", async () => {
      const created = (await waitFor(() =>
        Array.from(document.body.querySelectorAll('[role="menuitemcheckbox"]')).find((el) =>
          el.textContent?.includes("Created by me"),
        ),
      )) as HTMLElement;
      await expect(created).toHaveAttribute("aria-checked", "false");
      await userEvent.click(created);
      await waitFor(() => expect(created).toHaveAttribute("aria-checked", "true"));
      // Still open after a checkbox toggle — multi-select stays put.
      await expect(document.body.querySelector('[role="menu"]')).toBeInTheDocument();
    });
  },
};
