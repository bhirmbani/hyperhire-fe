import { Library } from "lucide-react";

export default function HeaderComponent() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <a className="mr-6 flex items-center space-x-2" href="/">
          <Library />
          <span className="hidden font-bold sm:inline-block">MyBookstore</span>
        </a>
      </div>
    </div>
  );
}
