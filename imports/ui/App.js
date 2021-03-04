import React from 'react';
import { EventProvider } from './context/Event';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme as customTheme } from './theme';
import { EventSelector } from './components/EventSelector';
import { RegisteredPeople } from './components/RegisteredPeople';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { TEXTS } from '../infra/constants';

const useStyles = makeStyles(theme => ({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  eventSelectorContent: {
    marginTop: theme.spacing(4),
  },
  registeredPeopleContent: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  footer: {
    padding: theme.spacing(6),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <EventProvider>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <main className={classes.mainContent}>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="primary"
                gutterBottom
              >
                {TEXTS.HOME_TITLE}
              </Typography>
              <Typography variant="h5" align="center" paragraph>
                {TEXTS.HOME_DESCRIPTION}
              </Typography>
              <div className={classes.eventSelectorContent}>
                <EventSelector />
              </div>
            </Container>
          </div>
          <Container className={classes.registeredPeopleContent} maxWidth="md">
            <RegisteredPeople />
          </Container>
          <footer className={classes.footer}>
            <Typography variant="body2" align="center">
              {`Copyright © ${new Date().getFullYear()}.`}
            </Typography>
          </footer>
        </main>
      </ThemeProvider>
    </EventProvider>
  );
};
