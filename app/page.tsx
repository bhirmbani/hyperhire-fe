import Image from "next/image";
import LandingModule from "./modules/landing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LandingModule />
    </main>
  );
}
