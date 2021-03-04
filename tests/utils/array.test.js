import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { groupBy } from '../../imports/utils/array';

if (Meteor.isServer) {
  describe('utils', () => {
    describe('array', () => {
      it('can group an array into a new object', () => {
        const input = [
          { name: 'John', age: 26 },
          { name: 'Jim', color: 'blue', age: 22 },
          { name: 'Sam', color: 'blue', age: 33 },
          { name: 'Eddie', color: 'green', age: 77 },
        ];

        const output = {
          blue: [
            { name: 'Jim', color: 'blue', age: 22 },
            { name: 'Sam', color: 'blue', age: 33 },
          ],
          green: [{ name: 'Eddie', color: 'green', age: 77 }],
        };

        assert.deepEqual(groupBy(input, 'color'), output);
      });
    });
  });
}
