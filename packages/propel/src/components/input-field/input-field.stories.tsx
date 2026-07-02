import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import { iconControl } from "../../storybook/icon-control";
import { InputField, type InputMagnitude } from "./index";

const MAGNITUDES: InputMagnitude[] = ["md", "lg", "xl"];

const meta = {
  title: "Components/InputField",
  component: InputField,
  // Icon picker controls for the inline start/end slots.
  argTypes: { startIcon: iconControl, endIcon: iconControl },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1582-168",
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Vertical layout: the `description` sits directly below the label, and the `hint` (helper text)
 * sits below the control.
 */
export const Default: Story = {
  args: {
    magnitude: "md",
    orientation: "vertical",
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
    orientation: "horizontal",
    label: "Email",
    placeholder: "you@example.com",
  },
};

/**
 * The horizontal layout across every magnitude. The `description` stacks below the label in the
 * left column, the `hint` sits below the control, and the error state (which overrides the hint)
 * shows in danger.
 */
export const HorizontalShowcase: Story = {
  // Required axes for the args table; the custom `render` ignores them.
  args: { magnitude: "md", orientation: "horizontal" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-110 flex-col gap-4">
      <InputField orientation="horizontal" magnitude="md" label="Email" placeholder="md" />
      <InputField
        orientation="horizontal"
        magnitude="lg"
        label="Email"
        placeholder="lg"
        hint="Use your work email."
      />
      <InputField
        orientation="horizontal"
        magnitude="xl"
        label="Email"
        placeholder="xl"
        description="We never share your email with anyone."
      />
      <InputField
        orientation="horizontal"
        magnitude="md"
        label="Email"
        error="Enter a valid email address"
        defaultValue="not-an-email"
      />
    </div>
  ),
};

/** Inline start/end 16px icon slots wrap the control. */
export const WithIcons: Story = {
  args: {
    magnitude: "md",
    orientation: "vertical",
    label: "Search",
    placeholder: "Search…",
    startIcon: <Search />,
    endIcon: <Mail />,
  },
};

/**
 * The element-driven states side by side. Hover/focus/filled aren't props — they come from
 * interacting with the control; `disabled` and the error treatment (set via `error`) are shown
 * statically.
 */
export const States: Story = {
  // Required axes for the args table; the custom `render` ignores them.
  args: { magnitude: "md", orientation: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <InputField magnitude="md" orientation="vertical" label="Default" placeholder="Placeholder" />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Focus / hover (interact)"
        placeholder="Click me"
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Filled"
        defaultValue="Ada Lovelace"
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Disabled"
        placeholder="Placeholder"
        disabled
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Error"
        defaultValue="not-an-email"
        error="Enter a valid email."
      />
    </div>
  ),
};

/** Every magnitude (`md` / `lg` / `xl`) stacked. */
export const Magnitudes: Story = {
  args: { magnitude: "md", orientation: "vertical", placeholder: "Placeholder" },
  argTypes: { magnitude: { control: false }, label: { control: false } },
  render: (args) => (
    <div className="flex w-72 flex-col gap-4">
      {MAGNITUDES.map((magnitude) => (
        <InputField key={magnitude} {...args} magnitude={magnitude} label={magnitude} />
      ))}
    </div>
  ),
};

/** The error treatment: danger border, danger helper text, and `aria-invalid`. */
export const Invalid: Story = {
  args: {
    magnitude: "md",
    orientation: "vertical",
    label: "Email",
    defaultValue: "not-an-email",
    error: "Enter a valid email address.",
    required: true,
  },
};

/**
 * RTL smoke check: the same stories rendered inside `dir="rtl"`. Text aligns to the right, the
 * leading (start) icon sits on the right edge and the trailing (end) icon on the left, and the
 * horizontal label sits to the right of its control. Excluded from autodocs/manifest — it exists
 * for visual review.
 */
export const RtlVerify: Story = {
  name: "RTL Verify",
  tags: ["!autodocs", "!manifest"],
  args: { magnitude: "md", orientation: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div dir="rtl" className="flex w-80 flex-col gap-6">
      <InputField
        magnitude="md"
        orientation="vertical"
        label="البريد الإلكتروني"
        placeholder="you@example.com"
        description="سنستخدمه لإرسال الإيصالات."
        hint="لن نشارك بريدك الإلكتروني."
      />
      <InputField
        magnitude="md"
        orientation="horizontal"
        label="البريد"
        placeholder="you@example.com"
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="بحث"
        placeholder="Search…"
        startIcon={<Search />}
        endIcon={<Mail />}
      />
      <InputField
        magnitude="md"
        orientation="vertical"
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
  args: { magnitude: "md", orientation: "vertical" },
  parameters: { controls: { disable: true } },
  render: () => (
    <div dir="ltr" className="flex w-80 flex-col gap-6">
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Email"
        placeholder="you@example.com"
        description="We'll use this to send you receipts."
        hint="We'll never share your email."
      />
      <InputField
        magnitude="md"
        orientation="horizontal"
        label="Email"
        placeholder="you@example.com"
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Search"
        placeholder="Search…"
        startIcon={<Search />}
        endIcon={<Mail />}
      />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Email"
        required
        defaultValue="not-an-email"
        error="Enter a valid email address."
      />
    </div>
  ),
};

/**
 * Typing into the control updates its value. Query by role (`textbox`) and drive it with
 * `userEvent`; an `onChange` spy proves the change handler fires.
 */
export const TypingUpdatesValue: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    orientation: "vertical",
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
    orientation: "vertical",
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

/** Setting `error` marks the field invalid (`aria-invalid`) and renders the announced error text. */
export const ErrorAnnouncesInvalid: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    orientation: "vertical",
    label: "Email",
    defaultValue: "x",
    error: "Enter a valid email address.",
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole<HTMLInputElement>("textbox", { name: "Email" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Enter a valid email address.")).toBeInTheDocument();
  },
};

/** Consumers can omit propel's generated label group when a native accessible name is provided. */
export const NativeAriaLabel: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: {
    magnitude: "md",
    orientation: "vertical",
    "aria-label": "Search projects",
    placeholder: "Search",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox", { name: "Search projects" })).toBeInTheDocument();
  },
};

/**
 * Setting `error` marks the field invalid; Base UI's `Field.Root` propagates that validity to the
 * control as `data-invalid`, and the wrapping `InputGroup` recolors its border to `danger` via
 * `:has([data-invalid])` — no `tone` prop. A resting field is shown alongside so the danger border
 * is assertably different.
 */
export const InvalidShowsDangerBorder: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  parameters: { controls: { disable: true } },
  args: { magnitude: "md", orientation: "vertical" },
  render: () => (
    <div className="flex w-72 flex-col gap-4">
      <InputField magnitude="md" orientation="vertical" label="Resting" placeholder="Resting" />
      <InputField
        magnitude="md"
        orientation="vertical"
        label="Invalid"
        defaultValue="not-an-email"
        error="Enter a valid email address."
      />
    </div>
  ),
  play: async ({ canvas }) => {
    const resting = canvas.getByRole<HTMLInputElement>("textbox", { name: "Resting" });
    const invalid = canvas.getByRole<HTMLInputElement>("textbox", { name: "Invalid" });
    await expect(invalid).toHaveAttribute("aria-invalid", "true");
    // The group is the input's wrapping `div`; danger keys off `:has([data-invalid])` on it.
    const restingGroup = resting.parentElement;
    const invalidGroup = invalid.parentElement;
    // `Error` is shadowed by this file's `Error` story, so reach for the global constructor.
    if (restingGroup == null || invalidGroup == null) {
      throw new Error("expected an InputGroup wrapper");
    }
    await expect(invalidGroup).toHaveClass("has-[[data-invalid]]:border-danger-strong");
    // ...and the danger border actually renders: its color differs from the resting group's border.
    await expect(getComputedStyle(invalidGroup).borderColor).not.toBe(
      getComputedStyle(restingGroup).borderColor,
    );
  },
};
