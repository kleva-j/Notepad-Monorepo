import { Home } from "@/routes";

import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950/20 mt-auto">
      <div className="py-8 container">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Home.Link className="flex items-center">
            <Image
              height={28}
              width={28}
              src="/logo-white-256x256.png"
              alt="Vercel Logo"
            />
            <span className="ml-2 text-lg font-semibold">
              Notepad-GPT
            </span>
          </Home.Link>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
