import { ISettings } from '../interfaces';
import { getUserSettings } from './get-user-settings';

export const pullUserSettings = async (userSettings: ISettings, id: string) => {
  userSettings = await getUserSettings(id);
  return userSettings;
};
