import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '/imports/collections/people';

Meteor.methods({
  'people.checkin'(personId) {
    check(personId, String);

    const person = People.findOne({ _id: personId });
    if (!person) {
      throw new Meteor.Error('Person not found.');
    }

    People.update(personId, {
      $set: {
        checkIn: new Date(),
      },
    });
  },
  'people.checkout'(personId) {
    check(personId, String);

    const person = People.findOne({ _id: personId });
    if (!person) {
      throw new Meteor.Error('Person not found.');
    }

    People.update(personId, {
      $set: {
        checkOut: new Date(),
      },
    });
  },
});
