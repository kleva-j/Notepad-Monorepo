import { AudioPauseIcon } from "@/components/icons/AudioPause";

import Image from "next/image";

type AudioRecord = {};

const data: AudioRecord[] = [
  { title: "Recording 1" },
  { title: "Recording 2" },
  { title: "Recording 3" },
  { title: "Recording 4" },
];

export const AudioRecordItem = (props: AudioRecord) => (
  <li className="inline-flex items-center gap-x-2 h-10 text-sm font-medium text-gray-500 dark:text-white border rounded-full border-gray-300 dark:border-neutral-700 bg-gray-100 dark:bg-neutral-800/20 px-1 group">
    <AudioPauseIcon className="w-7 h-7 stroke-[1.5px] text-gray-500/90 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-400 cursor-pointer transition-all shadow-sm hover:shadow" />
    <div className="flex-1">
      <Image
        src="/wavesignal.png"
        className="object-cover w-12 h-6 rounded-full"
        alt="Recording"
        width={80}
        height={20}
      />
    </div>
    <time className="text-[11px] mr-2 dark:text-gray-200/60 text-gray-600/70 font-normal group-hover:text-gray-600 group-hover:dark:text-gray-50/50">
      1:40
    </time>
  </li>
);

export const AudioRecordList = () => {
  return (
    <ul className="flex flex-col my-0 list-inside gap-y-3">
      {data.slice(0, 4).map((item, index) => (
        <AudioRecordItem key={index} {...item} />
      ))}
    </ul>
  );
};
