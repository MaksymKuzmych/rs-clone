import TextField from '@mui/material/TextField';
import { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material';

import { theme } from '../../../styles/theme';
import { registerUser } from '../../../firebase/register-user';
import { AuthContext } from '../../../Auth/Auth';
import { Provider, Theme, ThemeColor } from '../../../enums';
import { signInUser } from '../../../firebase/sign-in-user';
import { useSnackbar } from 'notistack';
import { signInProvider } from '../../../firebase/sign-in-provider';

import styles from './Login.module.scss';

export const Login = () => {
  const { userData, changeUserData } = useContext(AuthContext);

  const [type, setType] = useState('signIn');

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();

  const signInGoogleHandler = async () => await signInProvider(Provider.Google);
  const signInGithubHandler = async () => await signInProvider(Provider.Github);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object().shape({
      email: string()
        .email(`${t('Invalid email')}`)
        .required(`${t('Required')}`),
      password: string()
        .min(6, `${t('Password must be at least 6 characters')}`)
        .max(16, `${t('Password must be at most 16 characters')}`)
        .required(`${t('Required')}`),
    }),
    onSubmit: async (values) => {
      if (type === 'signIn') {
        try {
          await signInUser(values.email, values.password);
        } catch (error) {
          enqueueSnackbar(`${error}`, { variant: 'error' });
        }
      } else {
        try {
          await registerUser(values.email, values.password);
          await changeUserData();
          enqueueSnackbar(`${values.email} Login`, { variant: 'success' });
        } catch (error) {
          enqueueSnackbar(`${error}`, { variant: 'error' });
        }
      }
    },
  });

  return (
    <ThemeProvider theme={theme(userData.settings.theme)}>
      <div className={styles.wrapper}>
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
          <h1
            className={styles.title}
            style={{
              color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            }}
          >
            {type === 'signIn' ? t('Sign In') : t('Sign Up')}
          </h1>
          <TextField
            variant='standard'
            color='primary'
            fullWidth={true}
            label={t('Email')}
            name='email'
            type='text'
            onChange={formik.handleChange}
            helperText={formik.errors.email}
            error={!!formik.errors.email}
            value={formik.values.email}
          />
          <TextField
            variant='standard'
            color='primary'
            fullWidth={true}
            label={t('Password')}
            name='password'
            type='password'
            onChange={formik.handleChange}
            helperText={formik.errors.password}
            error={!!formik.errors.password}
            value={formik.values.password}
          />
          <button type='submit' className={styles.submitBtn}>
            {type === 'signIn' ? t('Sign In') : t('Sign Up')}
          </button>
          {type === 'signIn' && (
            <button onClick={signInGoogleHandler} className={styles.googleBtn} type='button'>
              <img className={styles.icon} src='./assets/google.png' alt='Google' /> Sign In with
              Google
            </button>
          )}
          {type === 'signIn' && (
            <button onClick={signInGithubHandler} className={styles.githubBtn} type='button'>
              <img className={styles.icon} src='./assets/github.png' alt='GitHub' /> SignIn with
              GitHub
            </button>
          )}
          {type === 'signIn' && (
            <button
              style={{
                color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              }}
              onClick={() => {
                setType('signUp');
                formik.initialValues = {
                  email: '',
                  password: '',
                };
              }}
            >
              {t("Don't have an account? Sign Up")}
            </button>
          )}
          {type === 'signUp' && (
            <button
              style={{
                color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              }}
              onClick={() => {
                setType('signIn');
              }}
            >
              {t('Already have an account? Sign In')}
            </button>
          )}
        </form>
      </div>
    </ThemeProvider>
  );
};
