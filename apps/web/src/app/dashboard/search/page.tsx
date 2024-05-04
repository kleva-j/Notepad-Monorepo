"use client";

import { SearchBox } from "@/app/dashboard/SearchBox";
import { usePush } from "@/routes/hooks";
import { Dashboard } from "@/routes";
import { useState } from "react";

export default function Page() {
  const [open, setOpen] = useState<boolean>(true);
  
  const goBack = usePush(Dashboard);
  
  const toggleSearchBox = () => {
    setOpen(!open);
    goBack({});
  };

  return (
    <SearchBox isOpen={open} handleClose={toggleSearchBox} />
  );
}
