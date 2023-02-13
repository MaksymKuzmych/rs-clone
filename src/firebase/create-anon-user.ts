import { FirebaseError } from './firebase-config';
import { createUser } from './create-user';
import { defaultUserData } from './default-user-data';
import { getUserSettings } from './get-user-settings';

export const createAnonUser = async (id: string) => {
  try {
    const user = await getUserSettings(id);
    if (!user) {
      await createUser(id, defaultUserData);
    }
  } catch (error) {
    throw new FirebaseError(`Create Anon User: ${error}`);
  }
};
