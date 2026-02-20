import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <span className={cn(
          "block text-xs font-bold tracking-[0.3em] uppercase mb-4",
          light ? "text-primary" : "text-primary"
        )}>
          {subtitle}
        </span>
      )}
      <h2 className={cn(
        "text-4xl md:text-5xl font-serif",
        light ? "text-white" : "text-foreground"
      )}>
        {title}
      </h2>
      <div className={cn(
        "h-[1px] w-24 bg-primary mt-6",
        centered && "mx-auto"
      )} />
    </div>
  );
}