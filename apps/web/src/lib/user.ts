import { defaultSettings, SettingsType } from "@/atoms/Settings";

export function getMetadataFromUser(user: any) {
  const metadata = user.unsafeMetadata;
  const name = `${user.firstName} ${user.lastName}`;
  const { dob, language, theme, colorScheme, layout, columns } = metadata;
  const { account, appearance, tasks } = defaultSettings;
  return {
    account: {
      name: name || account.name,
      dob: dob || account.dob,
      language: language || account.language,
    },
    appearance: {
      theme: theme || appearance.theme,
      colorScheme: colorScheme || appearance.colorScheme,
    },
    tasks: {
      layout: layout || tasks.layout,
      columns: columns || tasks.columns,
    },
  } as SettingsType;
}
