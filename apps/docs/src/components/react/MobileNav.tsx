import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerHeader,
  DrawerHeaderContent,
  DrawerPanel,
  DrawerTitle,
  DrawerTrigger,
} from "@makeplane/propel/components/drawer";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";
import { Menu, X } from "lucide-react";

export type MobileNavGroup = {
  label: string;
  items: { href: string; title: string }[];
};

type Props = {
  groups: MobileNavGroup[];
  currentPath: string;
};

// Navigation drawer for < lg viewports. Links are full page loads, so the drawer
// unmounts (and therefore closes) on navigation without extra wiring.
export default function MobileNav({ groups, currentPath }: Props) {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  return (
    <Drawer>
      <DrawerTrigger
        render={
          <IconButton
            variant="ghost"
            size="lg"
            aria-label="Open navigation"
            icon={<Icon icon={Menu} />}
          />
        }
      />
      <DrawerPanel side="start">
        <DrawerHeader>
          <DrawerHeaderContent>
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeaderContent>
          <DrawerClose
            render={
              <IconButton
                variant="ghost"
                size="lg"
                aria-label="Close navigation"
                icon={<Icon icon={X} />}
              />
            }
          />
        </DrawerHeader>
        <DrawerBody>
          <nav aria-label="Documentation" className="flex flex-col gap-6 pb-4">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-caption-md-medium tracking-wide text-tertiary uppercase">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const isActive = normalized === item.href;
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={`block rounded-md px-3 py-1.5 text-body-sm-regular focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:outline-none focus-visible:ring-inset ${
                            isActive
                              ? "bg-layer-transparent-selected text-primary"
                              : "text-secondary hover:bg-layer-transparent-hover hover:text-primary"
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </DrawerBody>
      </DrawerPanel>
    </Drawer>
  );
}
