import { Nav } from "@/components/Nav";

export default function Page(): JSX.Element {
  return (
    <main className="flex w-full h-screen relative">
      <Nav />
      <section className="flex flex-col w-full ml-20 gap-5 dark:bg-neutral-900" />
    </main>
  );
}
