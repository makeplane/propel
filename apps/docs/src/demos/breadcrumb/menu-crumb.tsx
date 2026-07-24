import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbMenuTrigger,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@makeplane/propel/components/breadcrumb";
import { Icon } from "@makeplane/propel/components/icon";
import { Menu, MenuContent, MenuItem } from "@makeplane/propel/components/menu";
import { Layers } from "lucide-react";

export default function MenuCrumbDemo() {
  return (
    <Breadcrumb aria-label="Breadcrumb">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()} label="Plane" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Menu>
            <BreadcrumbMenuTrigger
              icon={<Icon icon={Layers} tint="tertiary" magnitude="md" />}
              label="Plane Design"
            />
            <MenuContent>
              <MenuItem label="Plane Web" />
              <MenuItem label="Plane Mobile" />
              <MenuItem label="Plane Server" />
            </MenuContent>
          </Menu>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage label="Components" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
