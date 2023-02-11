import { createUser } from './create-user';
import { defaultUserData } from './default-user-data';
import { getUserId } from './get-user-id';
import { getUserSettings } from './get-user-settings';

export const createAnonUser = async () => {
  const user = await getUserSettings(getUserId());
  if (!user) {
    await createUser(getUserId(), defaultUserData);
  }
};
