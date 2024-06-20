"use client"

import { useMemo } from "react";

import { TasksTableToolbarActions } from "@/task-table/toolbar-actions";
import { TasksTableFloatingBar } from "@/task-table/floating-bar";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { DataTableAdvancedToolbar } from "@/table/advanced";
import { api } from "@repo/backend/convex/_generated/api";
import { DataTable, DataTableToolbar } from "@/table"; 
import { useTasksTable } from "@/task-table/provider";
import { useDataTable } from "@/hooks/use-data-table";
import { getColumns } from "@/task-table/columns";
import { filterFields } from "@/table/lib/utils";

interface TasksTableProps {
  preloadedTasks: Preloaded<typeof api.notes.getAllActionItems>;
}

export function TasksTable({ preloadedTasks }: TasksTableProps) {
  const { featureFlags } = useTasksTable()

  const data = usePreloadedQuery(preloadedTasks) || [];

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo(() => getColumns(), [])

  const { table } = useDataTable({
    data: [],
    columns,
    pageCount: 1,
    // optional props
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    defaultPerPage: 10,
    defaultSort: "createdAt.desc",
  })

  return (
    <DataTable
      table={table}
      floatingBar={
        featureFlags.includes("floatingBar") ? (
          <TasksTableFloatingBar table={table} />
        ) : null
      }
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <TasksTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  )
}
