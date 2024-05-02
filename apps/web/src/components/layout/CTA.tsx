import { Button } from "@repo/ui/components/ui/button";
import { Signup } from "@/routes";

export const CTA = () => {
  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
            Start your free trial today
          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Try Notepad-GPT Platform for 30 days. No credit card required.
          </p>
          <Button asChild className="rounded-full">
            <Signup.Link>Free trial for 30 days</Signup.Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
