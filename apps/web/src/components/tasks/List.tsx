import { ListColumnGroup } from "@/tasks/ListColumnGroup";
import { getTableDataByColumn } from "@/lib/utils";

const { todo, completed, backlog, ...rest } = getTableDataByColumn();

export function ListView() {
  return (
    <ListColumnGroup
      data={{ backlog, todo, completed, inProgress: rest["in progress"] }}
    />
  );
}
