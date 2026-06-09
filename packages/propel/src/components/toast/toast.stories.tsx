import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor, within } from "storybook/test";
import { type ToastData, type ToastTone, ToastProvider, useToast } from "./index";

const TONES: ToastTone[] = ["success", "danger", "info", "warning", "neutral"];

// A small trigger that queues a toast via the manager hook — the real way a
// consumer raises a toast. Lives inside the provider (the meta-level decorator).
function Trigger({ tone, onAdd }: { tone: ToastTone; onAdd?: () => void }) {
  const { add } = useToast<ToastData>();
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center rounded-md border-sm border-subtle-1 bg-layer-2 px-3 text-13 font-medium text-secondary"
      onClick={() => {
        add({
          title: "Toast title",
          description: "Description of the toast alert",
          data: { tone },
        });
        onAdd?.();
      }}
    >
      Show {tone} toast
    </button>
  );
}

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["ai-generated"],
  // Every story renders inside a single ToastProvider so its trigger can queue
  // toasts and the viewport can display them.
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Click the button to queue a toast; it auto-dismisses, or use its close button. */
export const Default: Story = {
  render: () => <Trigger tone="info" />,
};

/**
 * One trigger per tone. Each queues a toast with the matching status icon + color
 * (success / danger / info / warning / neutral).
 */
export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {TONES.map((tone) => (
        <Trigger key={tone} tone={tone} />
      ))}
    </div>
  ),
};

/**
 * Real interaction test: clicking the trigger queues a toast whose title and
 * description become visible inside the live region (Base UI renders the viewport
 * as a polite `role="region"` live area and each toast as a `dialog`); clicking its
 * Dismiss button removes it. Tagged so it stays out of the sidebar/docs/manifest.
 */
export const QueueAndDismiss: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <Trigger tone="success" onAdd={fn()} />,
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);

    // The viewport is a live region that announces queued toasts (status/alert).
    await expect(body.getByRole("region", { name: /notification/i })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: /show success toast/i }));

    // The toast appears asynchronously in a portal; assert on the document body.
    const toast = await waitFor(() => body.getByRole("dialog"));
    await expect(toast).toBeVisible();
    await expect(body.getByText("Toast title")).toBeVisible();
    await expect(body.getByText("Description of the toast alert")).toBeVisible();

    // Base UI keeps the close button `aria-hidden` until the viewport is expanded;
    // hovering it reveals the Dismiss control, just like real usage.
    await userEvent.hover(toast);
    const dismiss = await waitFor(() => body.getByRole("button", { name: "Dismiss" }));

    // Closing the toast removes it from the live region.
    await userEvent.click(dismiss);
    await waitFor(() => expect(body.queryByText("Toast title")).not.toBeInTheDocument());
  },
};
