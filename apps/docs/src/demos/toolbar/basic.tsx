import { Icon } from "@makeplane/propel/components/icon";
import { Menu, MenuContent, MenuItem } from "@makeplane/propel/components/menu";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarMenuTrigger,
  ToolbarSeparator,
  ToolbarToggle,
  ToolbarToggleGroup,
} from "@makeplane/propel/components/toolbar";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Image,
  Italic,
  Link,
  List,
  ListChecks,
  ListOrdered,
  MessageSquare,
  Quote,
  Strikethrough,
  Table,
  Underline,
} from "lucide-react";

const TEXT_STYLES = ["Paragraph", "Heading 1", "Heading 2", "Heading 3"];
const FONTS = ["Sans", "Serif", "Mono"];

export default function BasicDemo() {
  return (
    <Toolbar elevation="raised" density="compact">
      <Menu>
        <ToolbarMenuTrigger aria-label="Text style" label="Text" />
        <MenuContent>
          {TEXT_STYLES.map((style) => (
            <MenuItem key={style} label={style} />
          ))}
        </MenuContent>
      </Menu>
      <Menu>
        <ToolbarMenuTrigger aria-label="Font" label="Aa" />
        <MenuContent>
          {FONTS.map((font) => (
            <MenuItem key={font} label={font} />
          ))}
        </MenuContent>
      </Menu>
      <ToolbarButton aria-label="Comment" icon={<Icon icon={MessageSquare} />} />
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Text formatting">
        <ToolbarToggle aria-label="Bold" icon={<Icon icon={Bold} />} />
        <ToolbarToggle aria-label="Italic" icon={<Icon icon={Italic} />} />
        <ToolbarToggle aria-label="Underline" icon={<Icon icon={Underline} />} />
        <ToolbarToggle aria-label="Strikethrough" icon={<Icon icon={Strikethrough} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup defaultValue={["left"]} aria-label="Text alignment">
        <ToolbarToggle value="left" aria-label="Align left" icon={<Icon icon={AlignLeft} />} />
        <ToolbarToggle
          value="center"
          aria-label="Align center"
          icon={<Icon icon={AlignCenter} />}
        />
        <ToolbarToggle value="right" aria-label="Align right" icon={<Icon icon={AlignRight} />} />
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Lists">
        <ToolbarToggle aria-label="Bullet list" icon={<Icon icon={List} />} />
        <ToolbarToggle aria-label="Numbered list" icon={<Icon icon={ListOrdered} />} />
        <ToolbarToggle aria-label="Checklist" icon={<Icon icon={ListChecks} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup aria-label="Blocks">
        <ToolbarToggle aria-label="Quote" icon={<Icon icon={Quote} />} />
        <ToolbarToggle aria-label="Code block" icon={<Icon icon={Code} />} />
        <ToolbarButton aria-label="Insert table" icon={<Icon icon={Table} />} />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Insert link" icon={<Icon icon={Link} />} />
      <ToolbarButton aria-label="Insert image" icon={<Icon icon={Image} />} />
    </Toolbar>
  );
}
