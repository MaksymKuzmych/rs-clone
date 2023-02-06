import { AddAccountInfo } from '../AddAccountInfo/AddAccountInfo';
import { AddAccountSettings } from '../AddAccountSettings/AddAccountSettings';
import { TemporaryDrawer } from '../UI/Drawer/Drawer';

export const AddAccountBtn = () => {
  return (
    <TemporaryDrawer anchor='bottom' btn={<AddAccountInfo />}>
      <AddAccountSettings />
    </TemporaryDrawer>
  );
};
