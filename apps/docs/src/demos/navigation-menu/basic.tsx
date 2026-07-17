import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuPanel,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@makeplane/propel/components/navigation-menu";

const PRODUCT_LINKS = [
  { href: "#issues", title: "Issues", description: "Track work items across projects." },
  { href: "#cycles", title: "Cycles", description: "Time-boxed sprints for your team." },
  { href: "#modules", title: "Modules", description: "Group related work into modules." },
  { href: "#pages", title: "Pages", description: "Rich documents that live with your work." },
];

const RESOURCE_LINKS = [
  { href: "#docs", title: "Documentation", description: "Guides and API references." },
  { href: "#changelog", title: "Changelog", description: "What shipped recently." },
];

export default function BasicDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger label="Product" />
          <NavigationMenuContent>
            <NavigationMenuContentList>
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink href={item.href} presentation="card">
                    <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                    <NavigationMenuLinkDescription>
                      {item.description}
                    </NavigationMenuLinkDescription>
                  </NavigationMenuLink>
                </li>
              ))}
            </NavigationMenuContentList>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger label="Resources" />
          <NavigationMenuContent>
            <NavigationMenuContentList>
              {RESOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <NavigationMenuLink href={item.href} presentation="card">
                    <NavigationMenuLinkTitle>{item.title}</NavigationMenuLinkTitle>
                    <NavigationMenuLinkDescription>
                      {item.description}
                    </NavigationMenuLinkDescription>
                  </NavigationMenuLink>
                </li>
              ))}
            </NavigationMenuContentList>
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
