import React, { useContext } from 'react';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { Context } from './index';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TableChartIcon from '@mui/icons-material/TableChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:5000/">
        ProjectManager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function App() {
  const { store } = useContext(Context);
  const routes = useRoutes(store.isAuth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <TableChartIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            ProjectManager
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>{routes}</div>
      </BrowserRouter>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          ProjectManager
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Created by Ivan Markevich.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App;
