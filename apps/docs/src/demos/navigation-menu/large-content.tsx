import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@makeplane/propel/components/navigation-menu";
import { ScrollArea } from "@makeplane/propel/components/scroll-area";

const PROJECT_LINKS = Array.from({ length: 24 }, (_, index) => ({
  href: `#project-${index + 1}`,
  title: `Project ${index + 1}`,
}));

export default function LargeContentDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger label="Projects" />
          <NavigationMenuContent>
            <div className="flex h-72 flex-col">
              <ScrollArea orientation="vertical" visibility="auto" magnitude="thin">
                <NavigationMenuContentList>
                  {PROJECT_LINKS.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink href={item.href} presentation="card">
                        <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </NavigationMenuContentList>
              </ScrollArea>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" presentation="item">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuPanel>
        <NavigationMenuViewport />
      </NavigationMenuPanel>
    </NavigationMenu>
  );
}
