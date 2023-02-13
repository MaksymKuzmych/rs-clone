import { checkUser } from './check-user';
import { createUser } from './create-user';
import { defaultUserData } from './default-user-data';
import { FirebaseError } from './firebase-config';

export const createAnonUser = async (userId: string) => {
  try {
    const userExist = await checkUser(userId);
    if (!userExist) {
      await createUser(userId, defaultUserData);
    }
  } catch (error) {
    throw new FirebaseError(`Create Anon User: ${error}`);
  }
};
