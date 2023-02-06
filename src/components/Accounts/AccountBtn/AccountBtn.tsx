import { useEffect, useState } from 'react';

import { IAccount } from '../../../interfaces';
import { icons } from '../../../data/icons';
import { colors } from '../../../data/colors';
import { settings } from '../../../data/settings';
import { AccountSettings } from '../AccountSettings/AccountSettings';
import { TemporaryDrawer } from '../../UI/Drawer/Drawer';
import { AccountInfo } from '../AccountInfo/AccountInfo';

interface AccountBtnProps {
  account: IAccount;
}

export const AccountBtn = ({ account }: AccountBtnProps) => {
  const [iconName, setIconName] = useState('');
  const [colorName, setColorName] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    const defaultIcon = icons[9];
    const iconObj = icons.find((el) => account.iconID === el.id) || defaultIcon;
    setIconName(iconObj.name);
  }, [account.iconID]);

  useEffect(() => {
    const defaultColor = colors[0];
    const colorObj = colors.find((el) => account.colorID === el.id) || defaultColor;
    setColorName(colorObj.name);
  }, [account.colorID]);

  useEffect(() => {
    setCurrency(settings.currency);
  }, []);

  return (
    <TemporaryDrawer
      anchor='bottom'
      btn={<AccountInfo account={account} color={colorName} icon={iconName} currency={currency} />}
    >
      <AccountSettings account={account} color={colorName} icon={iconName} currency={currency} />
    </TemporaryDrawer>
  );
};
