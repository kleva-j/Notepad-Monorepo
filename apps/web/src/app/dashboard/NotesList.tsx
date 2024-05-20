import { AudioFileIcon } from "@/components/icons/AudioFile";
import { Badge } from "@repo/ui/components/ui/badge";

interface INoteItem {
  title: string;
  subTasks: number;
  date: string;
}

const data: INoteItem[] = [
  {
    title: "lorem dolor sit amet adipiscing elit",
    subTasks: 3,
    date: "2 hrs ago",
  },
  {
    title: "lorem sit consectetur elit",
    subTasks: 3,
    date: "2 hrs ago",
  },
  {
    title: "lorem ipsum dolor sit adipiscing elit",
    subTasks: 3,
    date: "2 hrs ago",
  },
  {
    title: "lorem ipsum dolor sit adipiscing elit",
    subTasks: 3,
    date: "2 hrs ago",
  },
];

const NoteItem = ({ title, subTasks, date }: INoteItem) => {
  return (
    <li className="inline-flex items-center gap-x-3.5 py-2.5 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-white hover:text-blue-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer">
      <span className="text-gray-500 dark:text-neutral-500">
        <AudioFileIcon className="w-5 h-5" />
      </span>
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-sm font-light text-gray-800 dark:text-white">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            {subTasks} sub-tasks
          </p>
        </div>
        <Badge className="text-xs font-normal bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-neutral-200 hover:bg-gray-200 dark:hover:bg-neutral-700">
          {date}
        </Badge>
      </div>
    </li>
  );
};

export const NoteList = () => {
  return (
    <ul className="flex flex-col">
      {data.slice(0, 4).map((item, index) => (
        <NoteItem key={index} {...item} />
      ))}
    </ul>
  );
};
