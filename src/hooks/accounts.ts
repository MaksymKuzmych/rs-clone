import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/Auth';

import { CurrencySymbol } from '../enums';
import { IAccount } from '../interfaces';

export const useAccounts = () => {
  const userData = useContext(AuthContext);
  const [accounts, setAccounts] = useState<IAccount[]>(userData.data.accounts);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(CurrencySymbol[userData.settings.currency]);
  const [loading, setLoading] = useState(true);
  const user = userData;

  async function getAccounts() {
    try {
      // await pullUserData();
      setAccounts(userData.data.accounts);
      setCurrency(CurrencySymbol[userData.settings.currency]);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getAccounts() {
      try {
        setAccounts(userData.data.accounts);
        setCurrency(CurrencySymbol[userData.settings.currency]);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    }
    getAccounts();
  }, [userData.data.accounts, userData.settings.currency]);

  useEffect(() => {
    setAccounts(userData.data.accounts);
    setCurrency(CurrencySymbol[userData.settings.currency]);
  }, [user.data.accounts, user.settings.currency]);

  useEffect(() => {
    const allCardsAmount = accounts.reduce((acc, account) => acc + account.balance, 0);
    setAmount(allCardsAmount);
  }, [accounts]);

  return { accounts, amount, currency, loading };
};
