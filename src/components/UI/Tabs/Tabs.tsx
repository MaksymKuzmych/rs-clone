import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material';
import { memo, ReactNode, SyntheticEvent, useCallback, useContext, useState } from 'react';

import { AuthContext } from '../../../Auth/Auth';
import { Theme, ThemeColor } from '../../../enums';

interface TabPanelProps {
  index: number;
  value: number;
  children?: ReactNode;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface BasicTabsProps {
  firstChild: ReactNode;
  secondChild: ReactNode;
  thirdChild?: ReactNode;
  firstTitle: string;
  secondTitle: string;
  thirdTitle?: string;
}

export const BasicTabs = memo(
  ({
    firstChild,
    secondChild,
    thirdChild,
    firstTitle,
    secondTitle,
    thirdTitle,
  }: BasicTabsProps) => {
    const { userData } = useContext(AuthContext);

    const [value, setValue] = useState(thirdChild ? 1 : 0);

    const handleChange = useCallback((event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    }, []);

    const theme = createTheme({
      components: {
        MuiTabs: {
          styleOverrides: {
            flexContainer: {
              justifyContent: 'space-around',
            },
            indicator: {
              backgroundColor:
                userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              '&.MuiTab-textColorPrimary': { color: '#777777' },
              '&.Mui-selected': {
                color: userData.settings.theme === Theme.Light ? ThemeColor.Dark : ThemeColor.Light,
              },
            },
          },
        },
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label={firstTitle}
                {...a11yProps(0)}
                style={thirdTitle ? { width: '33.3%' } : { width: '50%' }}
              />
              <Tab
                label={secondTitle}
                {...a11yProps(1)}
                style={thirdTitle ? { width: '33.3%' } : { width: '50%' }}
              />
              {thirdTitle && (
                <Tab label={thirdTitle} {...a11yProps(2)} style={{ width: '33.3%' }} />
              )}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {firstChild}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {secondChild}
          </TabPanel>
          {thirdChild && (
            <TabPanel value={value} index={2}>
              {thirdChild}
            </TabPanel>
          )}
        </Box>
      </ThemeProvider>
    );
  },
);
