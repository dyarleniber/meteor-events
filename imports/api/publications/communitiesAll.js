import { Meteor } from 'meteor/meteor';
import { Communities } from '/imports/collections/communities';

Meteor.publish('communities.all', function all() {
  return Communities.find({});
});
