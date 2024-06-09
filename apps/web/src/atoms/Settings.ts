import { selectAtom, atomWithStorage } from "jotai/utils";

export const defaultSettings = {
  appearance: {
    theme: "light",
    colorScheme: "neutral",
  },
  account: {
    name: "",
    language: "en",
    dob: new Date(),
  },
  tasks: {
    layout: "kanban",
    columns: 4,
  },
};

export type SettingsType = typeof defaultSettings;

export const settingsAtom = atomWithStorage<SettingsType>(
  "settings",
  defaultSettings,
);

const appearanceSelector = (settings: SettingsType) => settings.appearance;
const accountSelector = (settings: SettingsType) => settings.account;
const tasksSelector = (settings: SettingsType) => settings.tasks;

export const appearanceAtom = selectAtom(settingsAtom, appearanceSelector);
export const accountAtom = selectAtom(settingsAtom, accountSelector);
export const tasksAtom = selectAtom(settingsAtom, tasksSelector);

export const updateSettingsAtom = () => {};
