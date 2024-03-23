import { cn } from "@/lib/utils";

export default function LeadComponent({
  children,
  clx,
}: {
  children: React.ReactNode;
  clx?: string;
}) {
  return <p className={cn("text-xl text-muted-foreground", clx)}>{children}</p>;
}
