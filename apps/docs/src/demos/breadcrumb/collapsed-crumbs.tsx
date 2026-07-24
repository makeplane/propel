import {
  Breadcrumb,
  BreadcrumbEllipsisTrigger,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@makeplane/propel/components/breadcrumb";
import { Menu, MenuContent, MenuItem } from "@makeplane/propel/components/menu";

export default function CollapsedCrumbsDemo() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbEllipsisTrigger aria-label="Show more breadcrumbs" />
            <MenuContent sizing="auto">
              <MenuItem label="Projects" />
              <MenuItem label="Design" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Components" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage label="Breadcrumb" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
