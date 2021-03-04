import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useEvent } from '../context/Event';
import { People as PeopleCollection } from '/imports/collections/people';
import { groupBy } from '../../utils/array';
import Skeleton from '@material-ui/lab/Skeleton';
import { PeopleSummary } from './PeopleSummary';
import { PeopleTable } from './PeopleTable';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  skeleton: {
    width: '100%',
  },
});

export const RegisteredPeople = () => {
  const classes = useStyles();

  // Gets the event (community id) from the Context
  const { communityId } = useEvent();

  const {
    people,
    checkInCount,
    notCheckInCount,
    checkInByCompany,
    isLoading,
  } = useTracker(() => {
    const noDataAvailable = { people: [] };
    if (!communityId) {
      return { ...noDataAvailable };
    }
    // Subscribes to all people registered in the selected event
    const handler = Meteor.subscribe('people.registered', { communityId });
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    // Returns people registered for the event,
    // sorted by first name (ascending)
    const peopleResult = PeopleCollection.find(
      { communityId },
      { sort: { firstName: 1 } }
    ).fetch();

    const checkInQuery = PeopleCollection.find({
      communityId,
      checkIn: { $ne: null },
      checkOut: null,
    });

    // Returns the total number of people who checked in
    const checkInCountResult = checkInQuery.count();

    // Returns the total number of people who have not checked in
    const notCheckInCountResult = PeopleCollection.find({
      communityId,
      checkIn: null,
    }).count();

    // Returns people who checked in grouped by the company name
    const checkInPeople = checkInQuery.fetch();
    const checkInByCompanyResult = groupBy(checkInPeople, 'companyName');

    return {
      people: peopleResult,
      checkInCount: checkInCountResult,
      notCheckInCount: notCheckInCountResult,
      checkInByCompany: checkInByCompanyResult,
    };
  });

  // Calls a method that updates the check-in date for now
  const handleCheckIn = (id, callback) =>
    Meteor.call('people.checkin', id, err => {
      if (!err && typeof callback === 'function') {
        callback();
      }
    });

  // Calls a method that updates the check-out date for now
  const handleCheckOut = (id, callback) =>
    Meteor.call('people.checkout', id, err => {
      if (!err && typeof callback === 'function') {
        callback();
      }
    });

  // if there are no people and new people are not being loaded,
  // returns null to avoid rendering the component
  if (!people.length && !isLoading) {
    return null;
  }

  return (
    <div>
      {!isLoading ? (
        <div>
          <PeopleSummary
            checkInCount={checkInCount}
            notCheckInCount={notCheckInCount}
            checkInByCompany={checkInByCompany}
          />
          <PeopleTable
            people={people}
            handleCheckIn={handleCheckIn}
            handleCheckOut={handleCheckOut}
          />
        </div>
      ) : (
        <div className={classes.skeleton}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </div>
  );
};
