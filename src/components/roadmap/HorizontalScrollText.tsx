import TextScrollMarquee from "@/components/lightswind/text-scroll-marquee";

const items = [
  "Pre-University",
  "Foundation",
  "Full Stack Development",
  "Java",
  "Dev-OPs",
  "Spring Boot",
  "Flutter",
];

export default function HorizontalScrollText() {
  const msg = items.join("  \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ");
  return (
    <TextScrollMarquee
      baseVelocity={3}
      direction="right"
      className="text-3xl font-bold "
      scrollDependent={false}
      delay={1000}
    >
      {msg}
    </TextScrollMarquee>
  );
}
