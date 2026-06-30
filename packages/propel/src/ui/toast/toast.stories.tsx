import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { IconButton, IconButtonIcon } from "../icon-button";
import {
  Toast,
  ToastAction,
  ToastActionButton,
  ToastActionGroup,
  ToastActions,
  ToastClose,
  ToastCloseSlot,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastStatusIcon,
  ToastTextGroup,
  ToastTitle,
  type ToastTone,
  ToastViewport,
  useToastManager,
} from "./index";

// UI-tier story: composes the ATOMIC toast parts. `ToastProvider` carries the manager
// context; `ToastPortal` › `ToastViewport` is the live region; each queued toast renders a
// `Toast` (Base UI `Toast.Root`) › `ToastContent` › `ToastTitle`/`ToastDescription`, with the
// tone-colored `ToastStatusIcon` and the `ToastClose` dismiss button. The ready-made
// manager-driven toast (tones, actions, progress) lives in `components/toast`.

// Maps every queued toast to the atomic anatomy. Base UI's `Toast.Root` needs a `toast`
// object from the manager, so this lives inside the provider and reads `useToastManager`.
function ToastList() {
  const { toasts } = useToastManager();
  return toasts.map((toast) => {
    const tone = (toast.data as { tone?: ToastTone } | undefined)?.tone ?? "info";
    return (
      <Toast key={toast.id} toast={toast}>
        {/* The ui slot is icon-agnostic — it sizes/colors whatever glyph child it's given. */}
        <ToastStatusIcon tone={tone}>
          <Info />
        </ToastStatusIcon>
        <ToastContent>
          <ToastTextGroup>
            <ToastTitle />
            <ToastDescription />
          </ToastTextGroup>
          <ToastActions>
            <ToastActionGroup>
              <ToastActionButton>Undo</ToastActionButton>
            </ToastActionGroup>
            <ToastAction>View</ToastAction>
          </ToastActions>
        </ToastContent>
        <ToastCloseSlot>
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="sm"
            aria-label="Dismiss"
            render={<ToastClose />}
          >
            <IconButtonIcon>
              <X />
            </IconButtonIcon>
          </IconButton>
        </ToastCloseSlot>
      </Toast>
    );
  });
}

const meta = {
  title: "UI/Toast",
  component: ToastProvider,
  subcomponents: {
    Toast,
    ToastViewport,
    ToastContent,
    ToastTextGroup,
    ToastTitle,
    ToastDescription,
    ToastActions,
    ToastActionGroup,
    ToastActionButton,
    ToastAction,
    ToastCloseSlot,
    ToastClose,
    ToastStatusIcon,
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// A trigger that queues a toast through the manager — the real way a toast is raised.
function Trigger() {
  const { add } = useToastManager();
  return (
    <button
      type="button"
      className="inline-flex h-8 items-center rounded-md border-sm border-subtle-1 bg-layer-2 px-3 text-13 font-medium text-secondary"
      onClick={() =>
        add({
          title: "Toast title",
          description: "Description of the toast alert",
          data: { tone: "info" },
        })
      }
    >
      Show toast
    </button>
  );
}

/**
 * Click the trigger to queue a toast; the manager renders it through the atomic anatomy (status
 * icon, title, description, close). The viewport is a polite live region.
 */
export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Trigger />
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  ),
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const toast = await body.findByRole("dialog", { name: "Toast title" });
    await expect(toast).toBeVisible();
    await expect(body.getByText("Description of the toast alert")).toBeVisible();
  },
};
