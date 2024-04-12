import { Badge } from "@repo/ui/components/ui/badge";

export default function Page(): JSX.Element {
  return (
    <main>
      <div className="flex gap-2">
        <Badge>Badge</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </main>
  );
}
