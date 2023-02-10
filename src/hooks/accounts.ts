import { useEffect, useState } from 'react';

import { IAccount } from '../interfaces';
import { store } from '../utils/store';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<IAccount[]>(store.data.accounts);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(store.settings.currency);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addAccount = (account: IAccount) => {
    setAccounts([...accounts, account]);
  };

  function getAccounts() {
    try {
      setError('');
      setLoading(true);
      setAccounts(store.data.accounts);
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAccounts();
    setCurrency(store.settings.currency);
  }, []);

  useEffect(() => {
    const allCardsAmount = accounts.reduce((acc, account) => acc + account.balance, 0);
    setAmount(allCardsAmount);
  }, [accounts]);

  return { accounts, amount, currency, loading, error, addAccount };
};
