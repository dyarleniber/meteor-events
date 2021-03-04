import { Meteor } from 'meteor/meteor';
import { mockMethodCall } from 'meteor/quave:testing';
import { assert } from 'chai';
import { Communities } from '/imports/collections/communities';
import { People } from '/imports/collections/people';
import '/imports/api/methods/peopleMethods';

if (Meteor.isServer) {
  describe('People', () => {
    describe('methods', () => {
      let communityId;
      let personId;

      beforeEach(() => {
        Communities.remove({});
        People.remove({});

        communityId = Communities.insert({
          name: 'Challenge',
        });

        personId = People.insert({
          firstName: 'Allie',
          lastName: 'Davison',
          title: 'Executive Director',
          companyName: 'Azavea',
          communityId,
        });
      });

      it('can check-in a person', () => {
        mockMethodCall('people.checkin', personId);
        assert.equal(
          People.find({
            communityId,
            checkIn: { $ne: null },
          }).count(),
          1
        );
      });

      it('can check-out a person', () => {
        mockMethodCall('people.checkout', personId);
        assert.equal(
          People.find({
            communityId,
            checkOut: { $ne: null },
          }).count(),
          1
        );
      });
    });
  });
}
