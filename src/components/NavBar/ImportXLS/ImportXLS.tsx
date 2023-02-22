import { useSnackbar } from 'notistack';
import { ChangeEvent, useContext } from 'react';
import { AuthContext } from '../../../Auth/Auth';
import { deleteAllUserData } from '../../../firebase/delete-all-user-data';
import { deleteAllUserTransactions } from '../../../firebase/delete-all-user-transactions';
import { parseStatement } from '../../../utils/parse-statement';
import { pushImportedData } from '../../../utils/push-imported-data';

export const ImportXLS = () => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try {
      await deleteAllUserData(userData.settings.userId, {
        accounts: userData.data.accounts,
        categories: userData.data.categories,
      });
      await deleteAllUserTransactions(userData.settings.userId);
      await pushImportedData(userData.settings.userId, await parseStatement(files));
      enqueueSnackbar('Import Successfull', { variant: 'success' });
      await changeUserData();
    } catch (error) {
      enqueueSnackbar('Wrong Import Format', { variant: 'error' });
    }
  };

  return <input type='file' onChange={onChange} />;
};
