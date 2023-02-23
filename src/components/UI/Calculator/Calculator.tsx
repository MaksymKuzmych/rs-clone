import { TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../Auth/Auth';
import { CurrencySymbol, Theme, ThemeColor } from '../../../enums';
import { BasicModal } from '../Modal/Modal';
import { DateSelect } from './DateSelect/DateSelect';

import styles from './Calculator.module.scss';

interface CalculatorProps {
  type: string;
  amount: string;
  notes: string;
  day: Dayjs | null;
  changeAmountHandler: (value: string) => void;
  changeNotesHandler: (value: string) => void;
  changeDayHandler: (value: Dayjs | null) => void;
  transferMoney: () => void;
}

export const Calculator = memo(
  ({
    type,
    amount,
    notes,
    day,
    changeAmountHandler,
    changeNotesHandler,
    changeDayHandler,
    transferMoney,
  }: CalculatorProps) => {
    const { userData } = useContext(AuthContext);

    const [openModal, setOpenModal] = useState(false);
    const [isSolved, setIsSolved] = useState(true);

    const { t } = useTranslation();

    const divRef = useRef<HTMLDivElement>(null);

    const actions = useMemo(() => ['/', '*', '+', '-'], []);
    const digits = useMemo(() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], []);

    const handleOpen = useCallback(() => setOpenModal(true), []);
    const handleClose = useCallback(() => setOpenModal(false), []);

    const solved = useCallback(() => setIsSolved(true), []);
    const notSolved = useCallback(() => setIsSolved(false), []);

    useEffect(() => divRef.current?.focus(), []);

    useEffect(() => {
      if (amount === '0') {
        changeAmountHandler('');
      }
    }, [amount, changeAmountHandler]);

    const notesHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => changeNotesHandler(event.target.value),
      [changeNotesHandler],
    );

    const updateCalculation = useCallback(
      (value: string) => {
        if (
          (actions.includes(value) && amount === '' && value !== '-') ||
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
        changeAmountHandler(amount.slice(0, -1));
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
      changeAmountHandler(amount.slice(0, -1));
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
          <button className={styles.btn} onClick={handleOpen}>
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
        <div
          className={styles.dateText}
          style={{
            color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
          }}
        >
          {new Date(dayjs(day).toDate()).toLocaleDateString(userData.settings.lang, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <BasicModal openModal={openModal} handleClose={handleClose}>
          <DateSelect day={day} changeDayHandler={changeDayHandler} handleClose={handleClose} />
        </BasicModal>
      </>
    );
  },
);
