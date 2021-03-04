import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../imports/infra/initial-data';
import '/imports/api/publications/communitiesAll.js';
import '/imports/api/publications/peopleRegistered.js';
import '/imports/api/methods/peopleMethods';

Meteor.startup(() => {
  loadInitialData();
});
