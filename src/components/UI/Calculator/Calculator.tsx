import { TextField } from '@mui/material';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { CurrencySymbol, Theme, ThemeColor } from '../../../enums';

import styles from './Calculator.module.scss';

interface CalculatorProps {
  type: string;
  amount: string;
  notes: string;
  changeAmountHandler: (value: string) => void;
  changeNotesHandler: (value: string) => void;
  transferMoney: () => void;
}

export const Calculator = ({
  type,
  amount,
  notes,
  changeAmountHandler,
  changeNotesHandler,
  transferMoney,
}: CalculatorProps) => {
  const { userData } = useContext(AuthContext);

  const [isSolved, setIsSolved] = useState(true);

  const { t } = useTranslation();

  const divRef = useRef<HTMLDivElement>(null);

  const actions = useMemo(() => ['/', '*', '+', '-'], []);
  const digits = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], []);

  useEffect(() => {
    divRef.current?.focus();
  }, []);

  useEffect(() => {
    if (amount === '0') {
      changeAmountHandler('');
    }
  }, [amount, changeAmountHandler]);

  const solved = useCallback(() => setIsSolved(true), []);
  const notSolved = useCallback(() => setIsSolved(false), []);

  const notesHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => changeNotesHandler(event.target.value),
    [changeNotesHandler],
  );

  const updateCalculation = useCallback(
    (value: string) => {
      if (
        (actions.includes(value) && amount === '') ||
        (actions.includes(value) && actions.includes(amount.slice(-1)))
      ) {
        return;
      }

      if (actions.includes(value) && value !== '.') {
        notSolved();
      }

      if (actions.includes(value)) {
        if (amount.includes('/')) {
          const digits = amount.split('/');
          changeAmountHandler(+digits[0] / +digits[1] + value);
        } else if (amount.includes('*')) {
          const digits = amount.split('*');
          changeAmountHandler(+digits[0] * +digits[1] + value);
        } else if (amount.includes('+')) {
          const digits = amount.split('+');
          changeAmountHandler(+digits[0] + +digits[1] + value);
        } else if (amount.includes('-') && amount[0] !== '-') {
          const digits = amount.split('-');
          changeAmountHandler(+digits[0] - +digits[1] + value);
        } else if (amount.includes('-') && amount[0] === '-') {
          if (amount.slice(1).includes('-')) {
            const digits = amount.slice(1).split('-');
            changeAmountHandler(+-digits[0] - +digits[1] + value);
          } else {
            changeAmountHandler(amount + value);
          }
        } else {
          changeAmountHandler(amount + value);
        }
      } else {
        changeAmountHandler(amount + value);
      }
    },
    [actions, amount, changeAmountHandler, notSolved],
  );

  const calculate = useCallback(() => {
    if (isNaN(+amount[amount.length - 1])) {
      changeAmountHandler(amount.slice(0, amount.length - 1));
    } else if (amount.includes('/')) {
      const digits = amount.split('/');
      changeAmountHandler(`${+digits[0] / +digits[1]}`);
    } else if (amount.includes('*')) {
      const digits = amount.split('*');
      changeAmountHandler(`${+digits[0] * +digits[1]}`);
    } else if (amount.includes('+')) {
      const digits = amount.split('+');
      changeAmountHandler(`${+digits[0] + +digits[1]}`);
    } else if (amount.includes('-') && amount[0] !== '-') {
      const digits = amount.split('-');
      changeAmountHandler(`${+digits[0] - +digits[1]}`);
    } else if (amount.includes('-') && amount[0] === '-') {
      const digits = amount.split('-');
      changeAmountHandler(`${+-digits[1] - +digits[2]}`);
    } else {
      changeAmountHandler(amount);
    }
    solved();
  }, [amount, changeAmountHandler, solved]);

  const clear = useCallback(() => {
    if (amount === '') {
      return;
    }
    const value = amount.slice(0, -1);
    changeAmountHandler(value);
  }, [amount, changeAmountHandler]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (digits.includes(event.key) || actions.includes(event.key)) {
        updateCalculation(event.key);
      }
      if (event.key === 'Backspace') {
        clear();
      }
      if (event.key === 'Enter') {
        calculate();
      }
    },
    [actions, calculate, clear, digits, updateCalculation],
  );

  const digitsBtns = useMemo(
    () =>
      digits.map((digit) => (
        <button className={styles.btn} onClick={() => updateCalculation(digit)} key={digit}>
          {digit}
        </button>
      )),
    [digits, updateCalculation],
  );

  return (
    <>
      <div className={styles.outputWrapper} onKeyUp={handleKeyUp} ref={divRef} tabIndex={0}>
        <h4 className={styles.outputTitle}>{t(type)}</h4>
        <div className={styles.output}>
          {amount || '0'} {CurrencySymbol[userData.settings.currency]}
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <TextField
          autoComplete='off'
          variant='standard'
          color='primary'
          name='notes'
          label={t('Notes')}
          sx={{ width: '95%' }}
          type='text'
          fullWidth={true}
          value={notes}
          onChange={notesHandler}
        />
      </div>

      <div
        className={styles.calcGrid}
        style={{
          backgroundColor:
            userData.settings.theme === Theme.Light ? ThemeColor.Light : ThemeColor.Dark,
        }}
      >
        <button className={styles.btn} onClick={() => updateCalculation('/')}>
          ÷
        </button>
        {digitsBtns.slice(7)}
        <button className={styles.btn} onClick={clear}>
          <span className='material-icons'>backspace</span>
        </button>
        <button className={styles.btn} onClick={() => updateCalculation('*')}>
          ×
        </button>
        {digitsBtns.slice(4, 7)}
        <button className={styles.btn} onClick={clear}>
          <span className='material-icons'>event</span>
        </button>
        <button className={styles.btn} onClick={() => updateCalculation('-')}>
          -
        </button>
        {digitsBtns.slice(1, 4)}
        <button onClick={() => (isSolved ? transferMoney() : calculate())} className={styles.ok}>
          {isSolved ? <span className='material-icons'>check</span> : '='}
        </button>
        <button className={styles.btn} onClick={() => updateCalculation('+')}>
          +
        </button>
        <button className={styles.btn}>{userData.settings.currency}</button>
        {digitsBtns[0]}
        <button className={styles.btn} onClick={() => updateCalculation('.')}>
          .
        </button>
      </div>
    </>
  );
};
