import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn("w-full max-w-[1315px] mx-auto px-5 xl:px-0", className)}
    >
      {children}
    </div>
  );
}
