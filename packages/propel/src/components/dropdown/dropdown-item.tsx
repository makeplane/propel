import { Menu } from "@base-ui/react/menu";
import { cva, cx, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import type * as React from "react";

import { NodeSlot } from "../../internal/node-slot";

const dropdownItemVariants = cva(
  cx(
    "group/item flex w-full gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
    "text-secondary",
    "data-disabled:pointer-events-none data-disabled:text-disabled",
  ),
  {
    variants: {
      variant: {
        default: "h-[34px] items-center",
        "with-description": "min-h-[34px] items-start py-1.5",
      },
      emphasis: {
        default: "cursor-default data-highlighted:bg-layer-transparent-hover",
        link: "cursor-pointer",
      },
    },
  },
);

type DropdownItemVariant = NonNullable<VariantProps<typeof dropdownItemVariants>["variant"]>;
type DropdownItemEmphasis = NonNullable<VariantProps<typeof dropdownItemVariants>["emphasis"]>;

export type DropdownItemProps = Omit<
  React.ComponentProps<typeof Menu.Item>,
  "className" | "style" | "label"
> & {
  /** Row layout. */
  variant: DropdownItemVariant;
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Muted secondary line under the label. */
  description?: React.ReactNode;
  /** Muted text shown inline after the label. */
  secondaryText?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
  /** Single-select selected state. */
  selected?: boolean;
  /** Row emphasis. @default "default" */
  emphasis?: DropdownItemEmphasis;
};

/** A selectable menu row. */
export function DropdownItem({
  variant,
  emphasis = "default",
  inlineStartNode,
  label,
  description,
  secondaryText,
  inlineEndNode,
  selected,
  children,
  ...props
}: DropdownItemProps) {
  return (
    <Menu.Item className={dropdownItemVariants({ variant, emphasis })} {...props}>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-baseline gap-1.5">
          <span className="truncate">{label ?? children}</span>
          {secondaryText != null ? (
            <span className="shrink-0 truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
              {secondaryText}
            </span>
          ) : null}
        </span>
        {description != null ? (
          <span className="truncate text-12 text-tertiary group-data-disabled/item:text-disabled">
            {description}
          </span>
        ) : null}
      </span>
      {inlineEndNode != null ? <NodeSlot>{inlineEndNode}</NodeSlot> : null}
      {selected ? (
        <span className="flex h-5 w-4 shrink-0 items-center justify-center">
          <Check className="size-4 text-icon-accent-primary" aria-hidden="true" />
        </span>
      ) : null}
    </Menu.Item>
  );
}
