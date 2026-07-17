import { Avatar } from "@makeplane/propel/components/avatar";
import { Badge } from "@makeplane/propel/components/badge";
import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardIcon,
  PreviewCardMeta,
  PreviewCardPropertyGroup,
  PreviewCardTitle,
  PreviewCardTitleRow,
  PreviewCardTrigger,
} from "@makeplane/propel/components/preview-card";
import { CircleDot } from "lucide-react";

export default function WithPropertiesDemo() {
  return (
    <PreviewCard>
      <PreviewCardTrigger href="https://app.plane.so/issues/WEB-142">WEB-142</PreviewCardTrigger>
      <PreviewCardContent side="top">
        <PreviewCardBody>
          <PreviewCardTitleRow>
            <PreviewCardIcon>
              <CircleDot />
            </PreviewCardIcon>
            <PreviewCardTitle>Redesign the pricing page</PreviewCardTitle>
          </PreviewCardTitleRow>
          <PreviewCardDescription>
            Rework the tiered layout to highlight the annual plan discount.
          </PreviewCardDescription>
          <PreviewCardPropertyGroup>
            <Badge tone="warning" magnitude="sm" label="In Progress" />
            <Badge tone="danger" magnitude="sm" label="High priority" />
            <Avatar magnitude="xs" alt="Priya Sharma" fallback="P" />
          </PreviewCardPropertyGroup>
          <PreviewCardMeta>WEB-142 · Updated 2 days ago</PreviewCardMeta>
        </PreviewCardBody>
        <PreviewCardArrow />
      </PreviewCardContent>
    </PreviewCard>
  );
}
