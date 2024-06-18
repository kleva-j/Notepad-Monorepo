import type { IKanbanColumn, IListColumn } from "@/types/tasks";

import { kanbanColumn, listColumn } from "@/lib/constant";
import { DEFAULT_CARDS, TableData } from "@/tasks/data";

export function getRandomDate(start: Date, end: Date): string {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  ).toISOString();
}

export const getCardByColumn = () => {
  const cardsByColumn: IKanbanColumn = DEFAULT_CARDS.reduce((acc, card) => {
    acc[card.column as keyof IKanbanColumn].push(card);
    return acc;
  }, kanbanColumn);
  return cardsByColumn;
};

export const getTableDataByColumn = () => {
  const cardsByColumn: IListColumn = TableData.reduce((acc, card) => {
    acc[card.column as keyof IListColumn].push(card);
    return acc;
  }, listColumn);
  return cardsByColumn;
};
