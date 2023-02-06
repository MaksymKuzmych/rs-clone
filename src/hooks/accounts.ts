import { useEffect, useState } from 'react';

import { IAccount } from '../interfaces';
import { accounts as accountsData } from '../data/accounts';

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addAccount = (account: IAccount) => {
    setAccounts([...accounts, account]);
  };

  function getAccounts() {
    try {
      setError('');
      setLoading(true);
      setAccounts(accountsData);
      setLoading(false);
    } catch (e) {
      const error = e as Error;
      setLoading(false);
      setError(error.message);
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  return { accounts, loading, error, addAccount };
};
