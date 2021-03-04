import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { useEvent } from '../context/Event';
import { Communities as CommunitiesCollection } from '/imports/collections/communities';
import Skeleton from '@material-ui/lab/Skeleton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import { TEXTS } from '../../infra/constants';

const useStyles = makeStyles(theme => ({
  skeleton: {
    width: '100%',
  },
  form: {
    width: '100%',
  },
  select: {
    '& select': {
      padding: theme.spacing(2),
    },
  },
}));

export const EventSelector = () => {
  const classes = useStyles();

  // Gets the event and an 'event setter' from the Context
  const { communityId, setCommunityId } = useEvent();

  const { communities, isLoading } = useTracker(() => {
    const noDataAvailable = { communities: [] };
    // Subscribes to all events (communities)
    const handler = Meteor.subscribe('communities.all');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    // Returns all events
    const communitiesResult = CommunitiesCollection.find({}).fetch();

    return { communities: communitiesResult };
  });

  // Sets the event (community id) to the Context
  const handleChange = event => {
    setCommunityId(event.target.value);
  };

  return (
    <div>
      {!isLoading ? (
        <FormControl className={classes.form}>
          <InputLabel htmlFor="event" shrink>
            Event
          </InputLabel>
          <NativeSelect
            id="event"
            className={classes.select}
            value={communityId}
            onChange={handleChange}
            defaultValue=""
          >
            <option value="">{TEXTS.EVENT_DEFAULT}</option>
            {communities.map(community => (
              <option key={community._id} value={community._id}>
                {community.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      ) : (
        <div className={classes.skeleton}>
          <Skeleton />
        </div>
      )}
    </div>
  );
};
