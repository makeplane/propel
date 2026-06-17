import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ToastManager } from "@base-ui/react/toast";
import type * as React from "react";

import type { ToastData } from "./toast";
import { ToastList } from "./toast-list";

export type ToastProviderProps = Omit<
  React.ComponentProps<typeof BaseToast.Provider>,
  "className" | "render" | "style" | "toastManager"
> & {
  /** Optional external manager. Must queue Propel `ToastData` so every toast has a `tone`. */
  toastManager?: ToastManager<ToastData>;
};

/**
 * Wraps the app and renders the toast viewport. Mount it once near the root, then queue toasts with
 * `useToast().add({ title, description, data: { tone } })`.
 */
export function ToastProvider({ children, ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed end-4 bottom-4 z-50 flex w-[340px] max-w-[calc(100vw-2rem)] flex-col gap-2 rounded-lg outline-none focus-visible:outline-md focus-visible:outline-offset-2 focus-visible:outline-accent-strong">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
