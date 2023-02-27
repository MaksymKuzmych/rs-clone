import { setUserData } from '../firebase/set-user-data';
import { IImportedData } from '../interfaces';

export const pushImportedData = async (userId: string, importedData?: IImportedData) => {
  if (importedData) {
    await setUserData(userId, {
      accounts: importedData.accounts,
      categories: importedData.categories,
      transactions: importedData.transactions,
    });
  } else {
    throw new Error();
  }
};
