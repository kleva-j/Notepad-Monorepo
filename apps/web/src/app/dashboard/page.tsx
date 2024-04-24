import { PullRequestIcon } from "@/components/icons/PullRequest";
import { BentoGrid, BentoGridItem } from "@/app/dashboard/grid";
import { RecordingIcon } from "@/components/icons/Recording";
import { Skeleton } from "@/components/Skeleton";

const items = [
  {
    title: "Your Voice Notes",
    className: "md:col-span-2",
  },
  {
    title: "Notifications",
    className: "md:col-span-1",
  },
  {
    title: "All Recordings",
    className: "md:col-span-1",
    icon: <RecordingIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Action Items",
    description: "View all your action items in one place.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <PullRequestIcon className="h-4 w-4 text-neutral-500" />,
  },
];

export default function Page() {
  return (
    <article className="p-4">
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </article>
  );
}
