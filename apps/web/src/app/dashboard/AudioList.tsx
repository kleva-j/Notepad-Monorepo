import { AudioPauseIcon } from "@/components/icons/AudioPause";

export const AudioRecordItem = () => (
  <li className="inline-flex items-center gap-x-3 h-10 text-sm font-medium text-gray-500 dark:text-white border rounded-full border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800/20 px-1 group dark:hover:bg-neutral-800 cursor-pointer shadow-sm hover:shadow">
    <AudioPauseIcon className="w-7 h-7 stroke-[1.5px] text-gray-500/90 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-400 cursor-pointer transition-all" />
    <div className="flex-1">
      <div className="w-full h-0.5 dark:bg-gray-600 bg-gray-400" />
    </div>
    <time className="text-[11px] mr-2 dark:text-gray-200/60 text-gray-600/70 font-normal group-hover:text-gray-600 group-hover:dark:text-gray-50/50">
      1:40
    </time>
  </li>
);

export const AudioRecordList = () => {
  return (
    <ul className="flex flex-col my-0 list-inside gap-y-3">
      {[...Array(5).keys()].map((_, index) => (
        <AudioRecordItem key={index} />
      ))}
    </ul>
  );
};
