import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Search, Settings } from "lucide-react";
import { expect, fn } from "storybook/test";
import { Button, IconButton, type ButtonMagnitude, type ButtonVariant } from "./index";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "tertiary", "ghost", "link"];
const MAGNITUDES: ButtonMagnitude[] = ["xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Components/Button",
  component: Button,
  subcomponents: { IconButton },
  tags: ["ai-generated"],
  args: {
    children: "Button",
    variant: "primary",
    tone: "neutral",
    magnitude: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** Every Figma "Type" side by side at the default magnitude. */
export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

/**
 * Tone selects the palette: `neutral` (default) or `danger` (Figma "Error").
 * Danger is shown as a solid fill and a bordered outline.
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} tone="neutral" variant="primary">
        Neutral
      </Button>
      <Button {...args} tone="danger" variant="primary">
        Danger fill
      </Button>
      <Button {...args} tone="danger" variant="secondary">
        Danger outline
      </Button>
    </div>
  ),
};

/** All sizes (Figma S/Base/L/XL map to sm/md/lg/xl; xs is an extra dense step). */
export const Magnitudes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {MAGNITUDES.map((magnitude) => (
        <Button key={magnitude} {...args} magnitude={magnitude}>
          {magnitude}
        </Button>
      ))}
    </div>
  ),
};

/** Leading and trailing icons sit beside the label and are decorative. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} leadingIcon={<Plus />}>
        New
      </Button>
      <Button {...args} variant="secondary" trailingIcon={<Settings />}>
        Settings
      </Button>
      <Button {...args} variant="tertiary" leadingIcon={<Search />} trailingIcon={<Plus />}>
        Search
      </Button>
    </div>
  ),
};

/** The loading state shows a spinner, sets `aria-busy`, and blocks interaction. */
export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} loading>
        Saving
      </Button>
      <Button {...args} variant="secondary" loading>
        Loading
      </Button>
      <IconButton {...args} aria-label="Refresh" icon={<Settings />} loading />
    </div>
  ),
};

/** The icon-only form: a square button that requires an `aria-label`. */
export const IconButtons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div className="flex items-center gap-3">
      {VARIANTS.filter((v) => v !== "link").map((variant) => (
        <IconButton
          key={variant}
          {...args}
          variant={variant}
          aria-label={`${variant} action`}
          icon={<Plus />}
        />
      ))}
    </div>
  ),
};

/**
 * Clicking a button fires `onClick`. Tagged `!dev`/`!autodocs`/`!manifest` so it's
 * hidden from the sidebar, docs, and AI manifest — it's a behavior test, not an
 * example — but still runs under the default `test` tag.
 */
export const ClickFiresOnClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** A `disabled` button does not fire `onClick`. */
export const DisabledBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), disabled: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * A `loading` button shows the spinner, is `aria-busy` + `aria-disabled`, and
 * blocks clicks — but stays a real, focusable button (NOT natively `disabled`)
 * so assistive tech can land on it and announce the busy state.
 */
export const LoadingBlocksClick: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  args: { onClick: fn(), loading: true },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole("button", { name: "Button" });
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
    // Not natively disabled: it must remain in the tab order and focusable.
    await expect(button).not.toBeDisabled();
    // The spinner is present (lucide renders an <svg>).
    await expect(button.querySelector("svg")).not.toBeNull();
    // It can receive focus.
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** An IconButton exposes its `aria-label` as the accessible name. */
export const IconButtonHasAccessibleName: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <IconButton aria-label="Add item" icon={<Plus />} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  },
};
