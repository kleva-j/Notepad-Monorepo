import type { IKanbanColumn, IListColumn } from "@/types/tasks";

import { kanbanColumn, listColumn } from "@/lib/constant";
import { DEFAULT_CARDS, TableData } from "@/tasks/data";
import { customAlphabet } from "nanoid";

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

const prefixes = {
  task: "tsk",
};

interface GenerateIdOptions {
  /**
   * The length of the generated ID.
   * @default 16
   * @example 16 => "abc123def456ghi7"
   * */
  length?: number;
  /**
   * The separator to use between the prefix and the generated ID.
   * @default "_"
   * @example "_" => "str_abc123"
   * */
  separator?: string;
}

/**
 * Generates a unique ID with a given prefix.
 * @param prefix The prefix to use for the generated ID.
 * @param options The options for generating the ID.
 * @example
 * generateId("store") => "str_abc123def456"
 * generateId("store", { length: 8 }) => "str_abc123d"
 * generateId("store", { separator: "-" }) => "str-abc123def456"
 */
export function generateId(
  prefix?: keyof typeof prefixes,
  { length = 12, separator = "_" }: GenerateIdOptions = {}
) {
  const id = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    length
  )();
  return prefix ? `${prefixes[prefix]}${separator}${id}` : id;
}
