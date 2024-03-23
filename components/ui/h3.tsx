import { cn } from "@/lib/utils";

export default function H3Component({
  children,
  clx,
}: {
  children: React.ReactNode;
  clx?: string;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        clx
      )}
    >
      {children}
    </h3>
  );
}
