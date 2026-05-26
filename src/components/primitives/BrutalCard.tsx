import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

type Props = HTMLAttributes<HTMLDivElement> & {
  tone?: Tone;
  children: ReactNode;
};

export function BrutalCard({
  tone = "light",
  className,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cn(
        "brutal-card",
        tone === "dark" && "brutal-card-dark",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function BrutalCardDark(props: Omit<Props, "tone">) {
  return <BrutalCard {...props} tone="dark" />;
}
