import { Toast as BaseToast, type ToastManager } from "@base-ui/react/toast";
import type * as React from "react";

import { ToastViewport } from "../../elements/toast/index";
import type { ToastData } from "./toast";
import { ToastList } from "./toast-list";

export type ToastProviderProps = Omit<
  BaseToast.Provider.Props,
  "className" | "style" | "toastManager"
> & {
  /** Optional external manager. Must queue Propel `ToastData` so every toast has a `tone`. */
  toastManager?: ToastManager<ToastData>;
  /**
   * The close control (e.g. an `IconButton`) rendered as each toast's close button. It carries its
   * own — localizable — `aria-label`; the toast bakes no label or glyph.
   */
  close: React.ReactElement;
};

/**
 * Wraps the app and renders the toast viewport. Mount it once near the root, then queue toasts with
 * `useToast().add({ title, description, data: { tone } })`. Composes the atomic `elements/toast`
 * parts (Provider + Portal + Viewport) and the manager-driven {@link ToastList}.
 */
export function ToastProvider({ children, close, ...props }: ToastProviderProps) {
  return (
    <BaseToast.Provider {...props}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport render={<ToastViewport />}>
          <ToastList close={close} />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  );
}
