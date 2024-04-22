import { Logo } from "@/components/icons/Logo";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950/20 mt-auto">
      <div className="py-8 container">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Logo />

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
