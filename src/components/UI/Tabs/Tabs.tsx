import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material';
import { ReactNode, SyntheticEvent, useState } from 'react';

const theme = createTheme({
  components: {
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          justifyContent: 'space-around',
        },
        indicator: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#fff',
          },
        },
      },
    },
  },
});

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
}

export const BasicTabs = ({ firstChild, secondChild }: BasicTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
            <Tab label='Item One' {...a11yProps(0)} style={{ width: '50%' }} />
            <Tab label='Item Two' {...a11yProps(1)} style={{ width: '50%' }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {firstChild}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {secondChild}
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};
