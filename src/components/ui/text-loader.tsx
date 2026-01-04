import * as React from "react";
import { cn } from "@/lib/utils";

const animationKeyframes = `
  @keyframes text-wave {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
`;

export interface TextLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

const TextLoader = React.forwardRef<HTMLDivElement, TextLoaderProps>(
  ({ className, text = "MHR RONY", size = "xl", ...props }, ref) => {
    const characters = text.split("");
    const animationDuration = characters.length * 0.15;

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <style>{animationKeyframes}</style>
        <div className={cn("font-bold tracking-wider", sizeClasses[size])}>
          {characters.map((char, index) => (
            <span
              key={index}
              className="inline-block text-primary"
              style={{
                opacity: 0.3,
                animation: `text-wave ${animationDuration}s ease-in-out infinite`,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
TextLoader.displayName = "TextLoader";

export { TextLoader };
