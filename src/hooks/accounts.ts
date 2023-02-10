import { useEffect, useState } from 'react';
import { Currency } from '../enums';
import { getFilteredUserData } from '../firebase/get-filtered-user-data';

import { IAccount } from '../interfaces';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(Currency.UAH);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addAccount = (account: IAccount) => {
    setAccounts([...accounts, account]);
  };

  async function getAccounts() {
    try {
      setError('');
      setLoading(true);
      setAccounts((await getFilteredUserData('27', { accounts: null })) as IAccount[]);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAccounts();
    setCurrency(Currency.UAH);
  }, []);

  useEffect(() => {
    const allCardsAmount = accounts.reduce((acc, account) => acc + account.balance, 0);
    setAmount(allCardsAmount);
  }, [accounts]);

  return { accounts, amount, currency, loading, error, addAccount };
};
