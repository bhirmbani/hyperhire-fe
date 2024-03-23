import { cn } from "@/lib/utils";

export default function H1Component({
  children,
  clx,
}: {
  children: React.ReactNode;
  clx?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        clx
      )}
    >
      {children}
    </h1>
  );
}
