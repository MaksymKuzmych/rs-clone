import Divider from '@mui/material/Divider';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from '../../../enums';
import { auth } from '../../../firebase/firebase-config';
import { signInProvider } from '../../../firebase/sign-in-provider';
import { unlinkProvider } from '../../../firebase/unlink-provider';

import styles from './NavLinkAccount.module.scss';

export const NavLinkAccount = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const providers = [
    auth.currentUser?.providerData[0]?.providerId,
    auth.currentUser?.providerData[1]?.providerId,
    auth.currentUser?.providerData[2]?.providerId,
  ];

  const [googleStatus, setGoogleStatus] = useState(providers.includes(Provider.Google));
  const [githubStatus, setGithubStatus] = useState(providers.includes(Provider.Github));

  const linkProvider = async (provider: Provider) => {
    try {
      if (providers.includes(provider)) {
        await unlinkProvider(provider);
        enqueueSnackbar(`${provider} unlinked`, { variant: 'success' });
      } else {
        await signInProvider(provider);
        enqueueSnackbar(`${provider} linked`, { variant: 'success' });
      }
      if (provider === Provider.Google) {
        setGoogleStatus(!googleStatus);
      } else {
        setGithubStatus(!githubStatus);
      }
    } catch (error) {
      enqueueSnackbar(`${error}`, { variant: 'error' });
    }
  };

  if (auth.currentUser?.isAnonymous) {
    return <></>;
  } else {
    return (
      <>
        <div className={styles.subtitle}>{t('Account ')}</div>
        <div className={styles.buttons}>
          <button
            onClick={() => linkProvider(Provider.Google)}
            className={styles.googleBtn}
            type='button'
          >
            <img className={styles.icon} src='./assets/google.png' alt='Google' />
            {googleStatus ? t('Unlink') : t('Link')} Google
          </button>
          <button
            onClick={() => linkProvider(Provider.Github)}
            className={styles.githubBtn}
            type='button'
          >
            <img className={styles.icon} src='./assets/github.png' alt='GitHub' />
            {githubStatus ? t('Unlink') : t('Link')} GitHub
          </button>
        </div>
        <Divider />
      </>
    );
  }
};
