import { CTA } from "@/components/layout/CTA";
import { Content } from "@/components/layout/Content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Team } from "@/components/layout/Team";

export default function Page(): JSX.Element {
  return (
    <main className="flex w-full h-screen relative flex-col bg-white dark:bg-gray-950">
      <Header />
      <div className="flex flex-col">
        <Hero />
        <Content />
        <Team />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
