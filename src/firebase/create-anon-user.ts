import { createUser } from './create-user';
import { defaultUserData } from './default-user-data';
import { getUserSettings } from './get-user-settings';

export const createAnonUser = async (id: string) => {
  const user = await getUserSettings(id);
  if (!user) {
    await createUser(id, defaultUserData);
  }
};
