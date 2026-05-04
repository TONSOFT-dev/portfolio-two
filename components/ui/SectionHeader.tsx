import FadeIn from "@/components/animations/FadeIn";

interface SectionHeaderProps {
  text: string;
  className?: string;
  withAnimation?: boolean;
  center?: boolean;
}

export default function SectionHeader({
  text,
  className = "",
  withAnimation = true,
  center = false,
}: SectionHeaderProps) {
  const content = (
    <div
      className={`flex items-center gap-3 mb-2 ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      <div className="h-1 w-4 md:w-5 bg-solis rounded-l rounded-r" />
      <p className="text-solis font-medium text-sm lg:text-base uppercase tracking-widest">
        {text}
      </p>
    </div>
  );

  if (withAnimation) {
    return <FadeIn>{content}</FadeIn>;
  }

  return content;
}
