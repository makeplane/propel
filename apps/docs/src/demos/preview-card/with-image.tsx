import {
  PreviewCard,
  PreviewCardArrow,
  PreviewCardBody,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardImage,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "@makeplane/propel/components/preview-card";

export default function WithImageDemo() {
  return (
    <PreviewCard>
      <PreviewCardTrigger href="https://plane.so/brand">brand guidelines</PreviewCardTrigger>
      <PreviewCardContent sideOffset={8}>
        <PreviewCardImage
          src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
          alt="Station signage set in large, high-contrast lettering"
          width={320}
          height={214}
        />
        <PreviewCardBody>
          <PreviewCardTitle>Brand guidelines</PreviewCardTitle>
          <PreviewCardDescription>
            Typography, color, and logo usage for everything Plane ships.
          </PreviewCardDescription>
        </PreviewCardBody>
        <PreviewCardArrow />
      </PreviewCardContent>
    </PreviewCard>
  );
}
