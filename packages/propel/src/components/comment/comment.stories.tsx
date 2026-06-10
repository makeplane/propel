import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Comment, type CommentMagnitude } from "./index";

const MAGNITUDES: CommentMagnitude[] = ["base", "sm", "xs"];

const meta = {
  title: "Components/Comment",
  component: Comment,
  args: {
    magnitude: "base",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=2163-9916",
    },
  },
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The composer: a body input over a bottom bar that pairs propel's formatting
 * Toolbar with a "Comment" submit Button.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[640px]">
      <Comment {...args} />
    </div>
  ),
};

/**
 * Every magnitude side by side. `base` ends in a text "Comment" Button, `sm`
 * collapses that to a send IconButton, and `xs` is a single compact row with an
 * attach + send cluster and no formatting Toolbar.
 */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-[640px] flex-col gap-6">
      {MAGNITUDES.map((magnitude) => (
        <Comment key={magnitude} {...args} magnitude={magnitude} />
      ))}
    </div>
  ),
};

/**
 * Typing enables the submit button; submitting calls `onSubmit` with the body text.
 * Tagged out of the sidebar/docs/manifest — it's a behavior canary, not an example.
 */
export const SubmitFlow: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onSubmit: fn(), submitLabel: "Comment" },
  play: async ({ args, canvas }) => {
    const textbox = canvas.getByRole("textbox", { name: "Add a comment" });
    const submit = canvas.getByRole("button", { name: "Comment" });

    // Empty composer: submit is disabled.
    await expect(submit).toBeDisabled();

    // Typing enables it.
    await userEvent.type(textbox, "Looks good to me");
    await expect(submit).toBeEnabled();

    // Submitting calls onSubmit with the typed text.
    await userEvent.click(submit);
    await expect(args.onSubmit).toHaveBeenCalledWith("Looks good to me");
  },
};
