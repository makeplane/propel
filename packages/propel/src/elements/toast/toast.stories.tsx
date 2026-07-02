import { Toast as BaseToast } from "@base-ui/react/toast";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Info, X } from "lucide-react";
import { expect, within } from "storybook/test";

import { Icon } from "../../internal/icon";
import { IconButton } from "../icon-button";
import {
  Toast,
  ToastAction,
  ToastActionButton,
  ToastActionGroup,
  ToastActions,
  ToastCloseGroup,
  ToastContent,
  ToastDescription,
  ToastStatusIcon,
  ToastTextGroup,
  ToastTitle,
  type ToastTone,
  ToastViewport,
} from "./index";

// elements-tier story (rule 2b): the styled parts are Base-UI-agnostic `useRender` elements; Base UI's
// behavior parts graft them via `render`. The Provider, Portal, and manager are behavior-only (they
// live in `components`), so this in-tier story wires them straight from `@base-ui/react`. Each
// queued toast renders a `Toast` (Base UI `Toast.Root`) › `ToastContent` › `ToastTitle`/
// `ToastDescription`, with the tone-colored `ToastStatusIcon` and the dismiss button. The ready-made
// manager-driven toast (tones, actions, progress) lives in `components/toast`.

// Maps every queued toast to the atomic anatomy. Base UI's `Toast.Root` needs a `toast` object from
// the manager, so this lives inside the provider and reads `Toast.useToastManager`.
function ToastList() {
  const { toasts } = BaseToast.useToastManager();
  return toasts.map((toast) => {
    const tone = (toast.data as { tone?: ToastTone } | undefined)?.tone ?? "info";
    return (
      <BaseToast.Root key={toast.id} toast={toast} render={<Toast />}>
        {/* The elements slot is icon-agnostic — it sizes/colors whatever glyph child it's given. */}
        <ToastStatusIcon tone={tone}>
          <Info />
        </ToastStatusIcon>
        <BaseToast.Content render={<ToastContent />}>
          <ToastTextGroup>
            <BaseToast.Title render={<ToastTitle />} />
            <BaseToast.Description render={<ToastDescription />} />
          </ToastTextGroup>
          <ToastActions>
            <ToastActionGroup>
              <ToastActionButton>Undo</ToastActionButton>
            </ToastActionGroup>
            <BaseToast.Action render={<ToastAction />}>View</BaseToast.Action>
          </ToastActions>
        </BaseToast.Content>
        <ToastCloseGroup>
          {/* Managed-visibility control: `Toast.Close` stays outer so its hidden/unfocusable
              state lands on the real rendered `IconButton` (a11y-correct). */}
          <BaseToast.Close
            render={
              <IconButton prominence="ghost" tone="neutral" magnitude="sm" aria-label="Dismiss">
                <Icon>
                  <X />
                </Icon>
              </IconButton>
            }
          />
        </ToastCloseGroup>
      </BaseToast.Root>
    );
  });
}

const meta = {
  title: "Elements/Toast",
  component: Toast,
  subcomponents: {
    ToastViewport,
    ToastContent,
    ToastTextGroup,
    ToastTitle,
    ToastDescription,
    ToastActions,
    ToastActionGroup,
    ToastActionButton,
    ToastAction,
    ToastCloseGroup,
    ToastStatusIcon,
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// A trigger that queues a toast through the manager — the real way a toast is raised.
function Trigger() {
  const { add } = BaseToast.useToastManager();
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
    <BaseToast.Provider>
      <Trigger />
      <BaseToast.Portal>
        <BaseToast.Viewport render={<ToastViewport />}>
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  ),
};

export const DefaultInteraction: Story = {
  ...Default,
  tags: ["!dev", "!autodocs", "!manifest"],
  play: async ({ canvas, userEvent }) => {
    const body = within(document.body);
    await userEvent.click(canvas.getByRole("button", { name: "Show toast" }));
    const toast = await body.findByRole("dialog", { name: "Toast title" });
    await expect(toast).toBeVisible();
    await expect(body.getByText("Description of the toast alert")).toBeVisible();
  },
};
