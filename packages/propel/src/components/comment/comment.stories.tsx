import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";
import { Comment, type CommentMagnitude } from "./index";

const MAGNITUDES: CommentMagnitude[] = ["base", "sm", "xs"];

// A stand-in for consumer-provided formatting controls. The shell renders whatever
// is passed to `toolbar`; it ships no editor of its own.
function ExampleToolbar() {
  return (
    <div className="flex items-center gap-1 text-tertiary">
      <span className="grid size-6 place-items-center rounded-md text-13 font-medium">B</span>
      <span className="grid size-6 place-items-center rounded-md text-13 italic">I</span>
      <span className="grid size-6 place-items-center rounded-md text-13 underline">U</span>
    </div>
  );
}

const meta = {
  title: "Components/Comment",
  component: Comment,
  tags: ["ai-generated"],
  args: {
    magnitude: "base",
    toolbar: <ExampleToolbar />,
  },
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The composer shell with a placeholder toolbar in its formatting slot. */
export const Default: Story = {
  render: (args) => (
    <div className="w-[420px]">
      <Comment {...args} />
    </div>
  ),
};

/** Every magnitude side by side: `base`, `sm`, `xs`. */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex w-[420px] flex-col gap-4">
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
