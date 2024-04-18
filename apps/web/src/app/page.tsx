import { Nav } from "@/components/Nav";

export default function Page(): JSX.Element {
  return (
    <main className="flex w-full h-screen relative">
      <Nav />
      <section className="flex flex-col w-full p-10 ml-20 gap-5">
        <h1 className="text-4xl">Dashboard</h1>
        <div className="w-full h-80 border border-neutral-500/50 bg-neutral-800/20 rounded" />
        <div className="flex flex-row gap-5 w-full">
          <div className="border-neutral-500/50 border rounded h-60 w-1/2 bg-neutral-800/20" />
          <div className="border-neutral-500/50 border rounded h-60 w-1/2 bg-neutral-800/20" />
        </div>
      </section>
    </main>
  );
}