import { BentoGrid, BentoGridItem, Position } from "@/app/dashboard/grid";
import { PullRequestIcon } from "@/components/icons/PullRequest";
import { AudioLinesIcon } from "@/components/icons/AudioLines";
import { RecordingIcon } from "@/components/icons/Recording";
import { AudioRecordList } from "@/app/dashboard/AudioList";
import { NoteList } from "@/app/dashboard/NotesList";
import { TaskList } from "@/app/dashboard/TaskList";

export default function Page() {
  return (
    <article className="p-4">
      <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
        <BentoGridItem
          title="Recent Voice Notes"
          header={<NoteList />}
          className="md:col-span-2 justify-start gap-y-4"
          description="View your recent voice notes"
          headerPosition={Position.bottom}
          icon={<AudioLinesIcon className="h-5 w-5 text-neutral-500" />}
        />
        <BentoGridItem
          title="Notifications"
          className="md:col-span-1 space-y-4"
          headerPosition={Position.bottom}
        />
        <BentoGridItem
          title="Audio Recordings"
          header={<AudioRecordList />}
          className="md:col-span-1 space-y-4"
          description="View your recent recordings"
          icon={<RecordingIcon className="h-4 w-4 text-neutral-500" />}
          headerPosition={Position.bottom}
        />
        <BentoGridItem
          title="Action Items"
          description="View your recent action items."
          headerPosition={Position.bottom}
          header={<TaskList />}
          className="md:col-span-2 space-y-4"
          icon={<PullRequestIcon className="h-4 w-4 text-neutral-500" />}
        />
      </BentoGrid>
    </article>
  );
}
