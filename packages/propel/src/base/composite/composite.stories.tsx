import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Composite, CompositeItem } from "./index";

// The roving-tabindex engine the List primitive is built on. Unstyled here on purpose — this story
// only proves the keyboard behavior; the look arrives in `ui/list`.
const meta = {
  title: "Base/Composite",
  component: Composite,
  subcomponents: { CompositeItem },
} satisfies Meta<typeof Composite>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * One tab stop for the whole group; arrow keys roam between items (vertical by default).
 * `Composite` emits `aria-orientation`, which needs a supporting role — here `toolbar`, the
 * canonical roving button group. (`ui/list` will pick its own role; that's the open a11y decision
 * in the RFC.)
 */
export const RovingFocus: Story = {
  render: () => (
    <Composite role="toolbar" aria-label="Demo composite">
      <CompositeItem render={<button type="button" />}>One</CompositeItem>
      <CompositeItem render={<button type="button" />}>Two</CompositeItem>
      <CompositeItem render={<button type="button" />}>Three</CompositeItem>
    </Composite>
  ),
  play: async ({ canvas, userEvent }) => {
    const one = canvas.getByRole("button", { name: "One" });
    const two = canvas.getByRole("button", { name: "Two" });
    const three = canvas.getByRole("button", { name: "Three" });

    // Only the active item is in the tab order; the others are -1.
    await expect(one).toHaveAttribute("tabindex", "0");
    await expect(two).toHaveAttribute("tabindex", "-1");

    one.focus();
    await expect(one).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(two).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(three).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    await expect(two).toHaveFocus();
  },
};
