import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "@makeplane/propel/components/preview-card";

export default function BasicDemo() {
  return (
    <PreviewCard>
      <PreviewCardTrigger href="https://plane.so">Plane</PreviewCardTrigger>
      <PreviewCardContent side="top">
        <PreviewCardBody>
          <PreviewCardTitle>Plane</PreviewCardTitle>
          <PreviewCardDescription>
            Open-source project management for issues, sprints, and roadmaps.
          </PreviewCardDescription>
        </PreviewCardBody>
        <PreviewCardArrow />
      </PreviewCardContent>
    </PreviewCard>
  );
}
