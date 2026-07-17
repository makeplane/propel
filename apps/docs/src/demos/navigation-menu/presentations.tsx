import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkTitle,
  NavigationMenuList,
} from "@makeplane/propel/components/navigation-menu";

export default function PresentationsDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" presentation="item">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs" presentation="card">
            <NavigationMenuLinkTitle>Documentation</NavigationMenuLinkTitle>
            <NavigationMenuLinkDescription>
              Guides and API references.
            </NavigationMenuLinkDescription>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
