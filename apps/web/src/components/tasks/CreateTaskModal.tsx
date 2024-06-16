"use client";

import { CreateTaskForm } from "@/tasks/CreateTaskForm";
import { Button } from "@repo/ui/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import {
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@repo/ui/components/ui/dialog";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from "@repo/ui/components/ui/drawer";

export const CreateTaskModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function onFormSubmit() {
    setOpen(false);
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-1" />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <CreateTaskForm submitHandler={onFormSubmit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          Create Task
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Task</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 my-4">
          <CreateTaskForm submitHandler={onFormSubmit} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
