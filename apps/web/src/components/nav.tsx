"use client";

import { containerVariants } from "@/lib/utils";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
// import { Button } from "@repo/ui";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const containerControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) containerControls.start("open");
    else containerControls.start("close");
  }, [isOpen])

  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <motion.nav variants={containerVariants} initial="close" animate={containerControls} className="bg-neutral-900 flex flex-col absolute p-5 top-0 left-0 gap-20 z-10 h-full shadow shadow-neutral-600">
      <div className="flex flex-row justify-between place-items-center w-full">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
        {/* <Button variant="icon" onClick={handleToggle}>
          <ArrowRight className="w-6 h-6 stroke-neutral-200" />
        </Button> */}
      </div>
    </motion.nav>
  )
}
