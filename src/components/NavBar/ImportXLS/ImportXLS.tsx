import { useSnackbar } from 'notistack';
import { ChangeEvent, useContext } from 'react';
import { AuthContext } from '../../../Auth/Auth';
import { deleteAllUserData } from '../../../firebase/delete-all-user-data';
import { parseStatement } from '../../../utils/parse-statement';
import { pushImportedData } from '../../../utils/push-imported-data';

export const ImportXLS = () => {
  const { userData, changeUserData } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    try {
      await deleteAllUserData(userData.settings.userId, userData.data);
      await pushImportedData(userData.settings.userId, await parseStatement(files));
      enqueueSnackbar('Import Successfull', { variant: 'success' });
      await changeUserData();
    } catch (error) {
      enqueueSnackbar('Wrong Import Format', { variant: 'error' });
    }
  };

  return <input type='file' onChange={onChange} />;
};
