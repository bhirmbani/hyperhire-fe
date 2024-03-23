import { cn } from "@/lib/utils";

export default function H2Component({
  children,
  clx,
}: {
  children: React.ReactNode;
  clx?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        clx
      )}
    >
      {children}
    </h2>
  );
}
