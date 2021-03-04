import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  summaryContent: {
    width: '100%',
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
  },
  summaryValue: {
    fontWeight: 'bold',
  },
}));

export const PeopleSummary = ({
  checkInCount,
  notCheckInCount,
  checkInByCompany,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.summaryContent}>
      <Typography variant="overline" display="block" gutterBottom>
        People in the event right now:
        <span className={classes.summaryValue}>{checkInCount}</span>;
      </Typography>
      <Typography variant="overline" display="block" gutterBottom>
        People by company in the event right now:
        <span className={classes.summaryValue}>
          {Object.keys(checkInByCompany).map(
            (key, index) =>
              `${index !== 0 ? ',' : ''} ${key} (${
                checkInByCompany[key].length
              })`
          )}
        </span>
        ;
      </Typography>
      <Typography variant="overline" display="block">
        People not checked-in:
        <span className={classes.summaryValue}>{notCheckInCount}</span>;
      </Typography>
    </Paper>
  );
};
