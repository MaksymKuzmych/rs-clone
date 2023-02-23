import { IStore } from '../interfaces';
import { getUserSettings } from './get-user-settings';

export const pullUserSettings = async (userData: IStore, id: string) => {
  userData.settings = await getUserSettings(id);
  return userData;
};
