import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";
import { iconControl } from "../../storybook/icon-control";
import { Field, Input, type InputMagnitude, TextArea } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

const meta = {
  title: "Components/Input",
  component: Input,
  // Input / TextArea / Field share the same chrome, so document the sibling
  // primitives alongside Input (adds their tabs to the args table + records the
  // relationship in the manifest).
  subcomponents: { Input, TextArea, Field },
  // Icon picker controls for the leading/trailing slots.
  argTypes: { leadingIcon: iconControl, trailingIcon: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1582-168",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vertical layout: the `description` sits directly below the label, and the `hint`
 * (helper text) sits below the control.
 */
export const Default: Story = {
  args: {
    magnitude: "md",
    tone: "neutral",
    variant: "vertical",
    label: "Email",
    placeholder: "you@example.com",
    description: "We'll use this to send you receipts.",
    hint: "We'll never share your email.",
  },
};

/** Horizontal layout: the label sits beside the control. */
export const Horizontal: Story = {
  args: {
    magnitude: "md",
    tone: "neutral",
    variant: "horizontal",
    label: "Email",
    placeholder: "you@example.com",
  },
};

/**
 * The horizontal layout across every magnitude. The `description` stacks below the
 * label in the left column, the `hint` sits below the control, and the error state
 * (which overrides the hint) shows in danger.
 */
export const HorizontalShowcase: Story = {
  // Required axes for the args table; the custom `render` ignores them.
  args: { magnitude: "md", tone: "neutral", variant: "horizontal" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-110 flex-col gap-4">
      <Input variant="horizontal" magnitude="md" tone="neutral" label="Email" placeholder="md" />
      <Input
        variant="horizontal"
        magnitude="lg"
        tone="neutral"
        label="Email"
        placeholder="lg"
        hint="Use your work email."
      />
      <Input
        variant="horizontal"
        magnitude="xl"
        tone="neutral"
        label="Email"
        placeholder="xl"
        description="We never share your email with anyone."
      />
      <Input
        variant="horizontal"
        magnitude="md"
        label="Email"
        tone="danger"
        error="Enter a valid email address"
        defaultValue="not-an-email"
      />
    </div>
  ),
};

/** Leading and trailing 16px icon slots wrap the control. */
export const WithIcons: Story = {
  args: {
    magnitude: "md",
    tone: "neutral",
    variant: "vertical",
    label: "Search",
    placeholder: "Search…",
    leadingIcon: <Search />,
    trailingIcon: <Mail />,
  },
};

/**
 * The element-driven states side by side. Hover/focus/filled aren't props —
 * they come from interacting with the control; `disabled` and the error
 * treatment (`tone="danger"`) are shown statically.
 */
export const States: Story = {
  // Required axes for the args table; the custom `render` ignores them.
  args: { magnitude: "md", tone: "neutral", variant: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="Default"
        placeholder="Placeholder"
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="Focus / hover (interact)"
        placeholder="Click me"
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="Filled"
        defaultValue="Ada Lovelace"
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="Disabled"
        placeholder="Placeholder"
        disabled
      />
      <Input
        magnitude="md"
        tone="danger"
        variant="vertical"
        label="Error"
        defaultValue="not-an-email"
        error="Enter a valid email."
      />
    </div>
  ),
};

/** Every magnitude (`md` / `lg` / `xl`) stacked. */
export const Magnitudes: Story = {
  args: { magnitude: "md", tone: "neutral", variant: "vertical", placeholder: "Placeholder" },
  argTypes: { magnitude: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <Input key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
};

/** Multi-line `TextArea` — the primitive the Comment composer builds on. */
export const TextAreaStory: Story = {
  name: "TextArea",
  // Required axes for the args table; the custom `render` ignores them.
  args: { magnitude: "md", tone: "neutral", variant: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-80">
      <TextArea
        magnitude="md"
        tone="neutral"
        label="Comment"
        placeholder="Leave a comment…"
        description="Share your thoughts on the proposal."
        hint="Markdown is supported."
      />
    </div>
  ),
};

/**
 * `TextArea` across every magnitude (`md` / `lg` / `xl`). Magnitude steps the
 * value font-size (13 / 14 / 16) and the box min-height (82 / 100 / 100px); the
 * 12px side / 8px vertical padding and 8px radius stay constant (Figma).
 */
export const TextAreaMagnitudes: Story = {
  name: "TextArea Magnitudes",
  args: { magnitude: "md", tone: "neutral", variant: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <TextArea
          key={magnitude}
          magnitude={magnitude}
          tone="neutral"
          label={magnitude}
          placeholder="Leave a comment…"
        />
      ))}
    </div>
  ),
};

/**
 * Overflowing `TextArea` content scrolls with a native scrollbar that only
 * appears once the text exceeds the box (matching the Dropdown popup), rather
 * than reserving a permanent gutter.
 */
export const TextAreaScroll: Story = {
  name: "TextArea Scroll",
  args: { magnitude: "md", tone: "neutral", variant: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="w-80">
      <TextArea
        magnitude="md"
        tone="neutral"
        label="Comment"
        defaultValue={Array.from({ length: 12 }, (_, i) => `Line ${i + 1} of a long comment.`).join(
          "\n",
        )}
      />
    </div>
  ),
};

/** The error treatment: danger border, danger helper text, and `aria-invalid`. */
export const Error: Story = {
  args: {
    magnitude: "md",
    variant: "vertical",
    label: "Email",
    tone: "danger",
    defaultValue: "not-an-email",
    error: "Enter a valid email address.",
    required: true,
  },
};

/**
 * RTL smoke check: the same stories rendered inside `dir="rtl"`. Text aligns to
 * the right, the leading (start) icon sits on the right edge and the trailing
 * (end) icon on the left, and the horizontal label sits to the right of its
 * control. Excluded from autodocs/manifest — it exists for visual review.
 */
export const RtlVerify: Story = {
  name: "RTL Verify",
  tags: ["!autodocs", "!manifest"],
  args: { magnitude: "md", tone: "neutral", variant: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div dir="rtl" className="flex w-80 flex-col gap-6">
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="البريد الإلكتروني"
        placeholder="you@example.com"
        description="سنستخدمه لإرسال الإيصالات."
        hint="لن نشارك بريدك الإلكتروني."
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="horizontal"
        label="البريد"
        placeholder="you@example.com"
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="بحث"
        placeholder="Search…"
        leadingIcon={<Search />}
        trailingIcon={<Mail />}
      />
      <Input
        magnitude="md"
        variant="vertical"
        tone="danger"
        label="البريد الإلكتروني"
        required
        defaultValue="not-an-email"
        error="أدخل بريدًا إلكترونيًا صالحًا."
      />
    </div>
  ),
};

/** LTR counterpart of {@link RtlVerify} for side-by-side comparison. */
export const LtrVerify: Story = {
  name: "LTR Verify",
  tags: ["!autodocs", "!manifest"],
  args: { magnitude: "md", tone: "neutral", variant: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div dir="ltr" className="flex w-80 flex-col gap-6">
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="Email"
        placeholder="you@example.com"
        description="We'll use this to send you receipts."
        hint="We'll never share your email."
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="horizontal"
        label="Email"
        placeholder="you@example.com"
      />
      <Input
        magnitude="md"
        tone="neutral"
        variant="vertical"
        label="Search"
        placeholder="Search…"
        leadingIcon={<Search />}
        trailingIcon={<Mail />}
      />
      <Input
        magnitude="md"
        variant="vertical"
        tone="danger"
        label="Email"
        required
        defaultValue="not-an-email"
        error="Enter a valid email address."
      />
    </div>
  ),
};

/**
 * Typing into the control updates its value. Query by role (`textbox`) and drive
 * it with `userEvent`; an `onChange` spy proves the change handler fires.
 */
export const TypingUpdatesValue: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    tone: "neutral",
    variant: "vertical",
    label: "Name",
    placeholder: "Your name",
    onChange: fn(),
  },
  play: async ({ args, canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Name" });
    await userEvent.type(input, "Grace");
    await expect(input).toHaveValue("Grace");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

/** A `disabled` control rejects input — the value stays empty after typing. */
export const DisabledBlocksInput: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    tone: "neutral",
    variant: "vertical",
    label: "Name",
    placeholder: "Your name",
    disabled: true,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Name" });
    await expect(input).toBeDisabled();
    await userEvent.type(input, "Grace");
    await expect(input).toHaveValue("");
  },
};

/** `tone="danger"` sets `aria-invalid` and renders the announced error text. */
export const ErrorAnnouncesInvalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    variant: "vertical",
    label: "Email",
    tone: "danger",
    defaultValue: "x",
    error: "Enter a valid email address.",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Enter a valid email address.")).toBeInTheDocument();
  },
};
