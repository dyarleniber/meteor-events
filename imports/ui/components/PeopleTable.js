import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { differenceInMilliseconds } from 'date-fns';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { defaultFormat } from '../../utils/date';
import { TABLE_OPTIONS, CHECKOUT } from '../../infra/constants';

const useStyles = makeStyles(theme => ({
  tableHeadCell: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  tableContent: {
    width: '100%',
  },
}));

export const PeopleTable = ({ people, handleCheckIn, handleCheckOut }) => {
  const classes = useStyles();

  // This date is used when comparing dates,
  // to define whether a check-out button should appear
  const [currentDate, setCurrentDate] = useState(new Date());

  // These are the values of the pagination state on the client side
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(
    TABLE_OPTIONS.INITIAL_ROWS_PER_PAGE
  );

  // Sets the timer to update the 'currentDate' after a check-in event
  const setDateTimeout = () => {
    Meteor.setTimeout(() => {
      setCurrentDate(new Date());
    }, CHECKOUT.BOUNDARY_IN_MS);
  };

  // Updates the current page number of the pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Updates the current rows per page number of the pagination
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.tableContent}>
      <TableContainer>
        <Table aria-label="Registered people table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Full name</TableCell>
              <TableCell className={classes.tableHeadCell} align="left">
                Company name
              </TableCell>
              <TableCell className={classes.tableHeadCell} align="left">
                Title
              </TableCell>
            </TableRow>
          </TableHead>
          {people
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(person => {
              // Gets the number of milliseconds
              // between the current date
              // and the date of the check-in
              const checkInPastTime = person.checkIn
                ? differenceInMilliseconds(
                    currentDate,
                    new Date(person.checkIn)
                  )
                : 0;

              // Boolean values to define whether
              // the check-in and check-out buttons
              // should appear
              const checkInBtn = !person.checkIn;
              const checkOutBtn =
                person.checkIn &&
                checkInPastTime > CHECKOUT.BOUNDARY_IN_MS &&
                !person.checkOut;

              return (
                <TableBody key={person._id}>
                  <TableRow hover>
                    <TableCell component="th" scope="row">
                      {`${person.firstName} ${person.lastName}`}
                    </TableCell>
                    <TableCell align="left">{person.companyName}</TableCell>
                    <TableCell align="left">{person.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Grid container spacing={2}>
                        <Grid item xs>
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            {`Check-in date: ${defaultFormat(person.checkIn)}`}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography
                            variant="overline"
                            display="block"
                            gutterBottom
                          >
                            {`Check-out date: ${defaultFormat(
                              person.checkOut
                            )}`}
                          </Typography>
                        </Grid>
                      </Grid>
                      {(checkInBtn || checkOutBtn) && (
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            {checkInBtn && (
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleCheckIn(person._id, setDateTimeout)
                                }
                              >
                                {`Check-in ${person.firstName} ${person.lastName}`}
                              </Button>
                            )}
                            {checkOutBtn && (
                              <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                onClick={() => handleCheckOut(person._id)}
                              >
                                {`Check-out ${person.firstName} ${person.lastName}`}
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={TABLE_OPTIONS.ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={people.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
