import { Content } from "@/components/layout/Content";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Team } from "@/components/layout/Team";
import { CTA } from "@/components/layout/CTA";

export default function Page(): JSX.Element {
  return (
    <main className="flex w-full h-screen relative flex-col ">
      <div className="relative h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      </div>

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
