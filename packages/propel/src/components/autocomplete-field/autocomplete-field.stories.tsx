import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { AutocompleteField } from "./index";

const IMAGES = ["nginx:1.29-alpine", "node:22-slim", "postgres:18", "redis:8.2.2-alpine"];

// An Autocomplete laid out as a field (Field + Autocomplete + label/helper).
const meta = {
  title: "Components/AutocompleteField",
  component: AutocompleteField,
  args: {
    name: "containerImage",
    label: "Container image",
    description: "Type or choose an image tag.",
    controlLabel: "container image",
    emptyLabel: "No images found",
    magnitude: "md",
    items: IMAGES,
    placeholder: "e.g. node:22-slim",
  },
} satisfies Meta<typeof AutocompleteField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const RendersInput: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("combobox", { name: "Container image" })).toBeInTheDocument();
  },
};
