import { Meteor } from 'meteor/meteor';
import { People } from '/imports/collections/people';

Meteor.publish('people.registered', function registered({ communityId }) {
  return People.find({ communityId });
});
