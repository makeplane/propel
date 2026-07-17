import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";
import { expect, fn, waitFor } from "storybook/test";

import { Icon } from "../icon";
import { Menu, MenuContent, MenuItem } from "../menu";
import { SplitButton } from "./index";

const MAGNITUDES = ["sm", "md", "lg", "xl"] as const;
const PROMINENCES = ["primary", "secondary"] as const;

// Components-tier story: the ready-made `SplitButton` — a main action `Button` plus a chevron
// `IconButton` grafted as the surrounding `Menu`'s trigger, connected by the styled frame. The
// split button ships no menu of its own: every story renders it as a `Menu` child with a sibling
// `MenuContent`. The elements-tier story documents the frame and its segments.
const meta = {
  title: "Components/SplitButton",
  component: SplitButton,
  // Docgen loses the literal unions through the useRender/`Omit` chain — pin radios like IconButton.
  argTypes: {
    prominence: { control: "radio", options: ["primary", "secondary"] },
    magnitude: { control: "radio", options: ["sm", "md", "lg", "xl"] },
  },
  args: { prominence: "primary", magnitude: "lg" },
} satisfies Meta<typeof SplitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// The split button's menu opens in a portal outside the story canvas, so the play tests
// query `document.body` and wait for the popup to mount (mirrors menu.stories).
function menuPopup() {
  return document.body.querySelector('[role="menu"]');
}

/** The main action plus a menu of secondary actions behind the chevron. */
export const Default: Story = {
  args: { label: "Create work item", onClick: fn() },
  render: (args) => (
    <Menu>
      <SplitButton {...args} startIcon={<Icon icon={Plus} />} />
      <MenuContent align="end">
        <MenuItem label="Create from template" />
        <MenuItem label="Import work items" />
      </MenuContent>
    </Menu>
  ),
};

/**
 * Interaction test: the two segments are independent — clicking the main segment fires `onClick`
 * without opening the menu; clicking the chevron opens the menu without firing `onClick`, and
 * choosing an item closes it. Tagged out of the sidebar/docs/manifest while still running under the
 * default `test` tag.
 */
export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Create work item" }));
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(menuPopup()).not.toBeInTheDocument();

    const trigger = canvas.getByRole("button", { name: "More options" });
    await userEvent.click(trigger);
    await waitFor(() => expect(menuPopup()).toBeInTheDocument());
    await expect(args.onClick).toHaveBeenCalledTimes(1);

    // Regression: while open, Base UI appends focus-guard spans inside the frame after the
    // trigger; the frame's child selectors must not eat the open trigger's end radius.
    await expect(getComputedStyle(trigger).borderTopRightRadius).not.toBe("0px");

    const item = Array.from(document.body.querySelectorAll('[role="menuitem"]')).find((el) =>
      el.textContent?.includes("Create from template"),
    ) as HTMLElement;
    await userEvent.click(item);
    await waitFor(() => expect(menuPopup()).not.toBeInTheDocument());
  },
};

/**
 * Every prominence (primary and secondary only — there is no tertiary/ghost, and no tone axis).
 * Primary lays segments out as separate pills; secondary connects them with a divider.
 */
export const Prominences: Story = {
  argTypes: { prominence: { control: false } },
  args: { label: "Button" },
  render: (args) => (
    <div className="flex items-center gap-6">
      {PROMINENCES.map((prominence) => (
        <Menu key={prominence}>
          <SplitButton
            {...args}
            prominence={prominence}
            startIcon={<Icon icon={Plus} />}
            menuLabel={`More options (${prominence})`}
          />
          <MenuContent align="end">
            <MenuItem label="Secondary action" />
          </MenuContent>
        </Menu>
      ))}
    </div>
  ),
};

/** Every size step — the frame passes one shared `magnitude` to both segments. */
export const Magnitudes: Story = {
  argTypes: { magnitude: { control: false } },
  args: { label: "Button" },
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      {MAGNITUDES.map((magnitude) => (
        <Menu key={magnitude}>
          <SplitButton
            {...args}
            magnitude={magnitude}
            startIcon={<Icon icon={Plus} />}
            menuLabel={`More options (${magnitude})`}
          />
          <MenuContent align="end">
            <MenuItem label="Secondary action" />
          </MenuContent>
        </Menu>
      ))}
    </div>
  ),
};

/** `disabled` hard-disables both segments. */
export const Disabled: Story = {
  args: { label: "Create work item", disabled: true },
  render: (args) => (
    <Menu>
      <SplitButton {...args} startIcon={<Icon icon={Plus} />} />
      <MenuContent align="end">
        <MenuItem label="Create from template" />
      </MenuContent>
    </Menu>
  ),
};

/**
 * Interaction test: while disabled, both segments report `disabled` and the tab order skips them.
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const DisabledInteraction: Story = {
  ...Disabled,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const main = canvas.getByRole("button", { name: "Create work item" });
    const trigger = canvas.getByRole("button", { name: "More options" });
    await expect(main).toBeDisabled();
    await expect(trigger).toBeDisabled();

    await userEvent.tab();
    await expect(main).not.toHaveFocus();
    await expect(trigger).not.toHaveFocus();
  },
};

/**
 * `loading` shows the main segment's spinner (soft-disabled: still focusable, `aria-busy`) and
 * hard-disables the menu segment so the pending action can't fork.
 */
export const Loading: Story = {
  args: { label: "Create work item", loading: true },
  render: (args) => (
    <Menu>
      <SplitButton {...args} startIcon={<Icon icon={Plus} />} />
      <MenuContent align="end">
        <MenuItem label="Create from template" />
      </MenuContent>
    </Menu>
  ),
};

/**
 * Interaction test: while loading, the main segment is `aria-busy` and non-activatable but stays
 * focusable; the menu segment is hard-disabled. Tagged out of the sidebar/docs/manifest while still
 * running under the default `test` tag.
 */
export const LoadingInteraction: Story = {
  ...Loading,
  args: { label: "Create work item", loading: true, onClick: fn() },
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent, args }) => {
    const main = canvas.getByRole("button", { name: "Create work item" });
    await expect(main).toHaveAttribute("aria-busy", "true");
    await expect(canvas.getByRole("button", { name: "More options" })).toBeDisabled();

    await userEvent.tab();
    await expect(main).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
