import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenuTrigger,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@makeplane/propel/components/breadcrumb";
import { Menu, MenuContent, MenuItem } from "@makeplane/propel/components/menu";

export default function ViewSwitcherDemo() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>
            Plane
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Work items</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbMenuTrigger label="List" />
            <MenuContent>
              <MenuItem selected label="List" />
              <MenuItem label="Board" />
              <MenuItem label="Calendar" />
              <MenuItem label="Spreadsheet" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
