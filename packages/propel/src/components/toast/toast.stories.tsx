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
  // Every story renders inside a single ToastProvider so its trigger can queue
  // toasts and the viewport can display them.
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/ioN74zM1xMGbcPemsxs4J1/Global-components?node-id=1146-61689",
    },
  },
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

/**
 * Keyboard-only reachability: a user with no pointer must be able to reach and
 * activate the Dismiss control. This drives Base UI's real keyboard model end to end,
 * with NO `hover` and NO programmatic `.focus()`, so a regression that made Dismiss
 * unreachable by keyboard would actually fail this test:
 *
 *   1. **F6** — Base UI's global hotkey moves focus into the toast viewport (a
 *      `role="region"` live area) and marks it `focused`, which expands the viewport.
 *      Expanding un-hides the close button (Base UI keeps `Toast.Close` `aria-hidden`
 *      until the viewport is expanded or the button itself is focused).
 *   2. **Tab** — from the viewport, focus crosses Base UI's focus guard onto the
 *      frontmost toast (`role="dialog"`).
 *   3. **Tab** — from the toast, focus lands on the only remaining control: Dismiss.
 *   4. **Enter** — activates Dismiss and removes the toast from the live region.
 *
 * Tagged out of the sidebar/docs/manifest while still running under the default `test` tag.
 */
export const KeyboardDismiss: Story = {
  tags: ["!dev", "!autodocs", "!manifest"],
  render: () => <Trigger tone="success" onAdd={fn()} />,
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);

    await userEvent.click(canvas.getByRole("button", { name: /show success toast/i }));
    const toast = await waitFor(() => body.getByRole("dialog"));
    await expect(toast).toBeVisible();

    // F6 is Base UI's keyboard entry point: it moves focus into the viewport region
    // and expands it, exposing the (otherwise `aria-hidden`) Dismiss control.
    await userEvent.keyboard("{F6}");
    const viewport = body.getByRole("region", { name: /notification/i });
    await waitFor(() => expect(viewport).toHaveFocus());

    // Tab from the viewport crosses Base UI's focus guard onto the frontmost toast.
    await userEvent.keyboard("{Tab}");
    await waitFor(() => expect(toast).toHaveFocus());

    // Tab again reaches the toast's only focusable control — the Dismiss button — purely
    // via the keyboard. No hover, no programmatic focus: if Dismiss were unreachable by
    // keyboard, focus would never land here and this assertion would fail.
    await userEvent.keyboard("{Tab}");
    const dismiss = body.getByRole("button", { name: "Dismiss" });
    await waitFor(() => expect(dismiss).toHaveFocus());

    // Activating it with the keyboard removes the toast from the live region.
    await userEvent.keyboard("{Enter}");
    await waitFor(() => expect(body.queryByText("Toast title")).not.toBeInTheDocument());
  },
};
