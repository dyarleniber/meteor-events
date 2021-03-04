import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { format } from 'date-fns';
import { DATE } from '../../imports/infra/constants';
import { defaultFormat } from '../../imports/utils/date';

if (Meteor.isServer) {
  describe('utils', () => {
    describe('date', () => {
      it('can format a valid date', () => {
        const input = new Date();
        const output = format(input, DATE.FORMAT);

        assert.equal(defaultFormat(input), output);
      });

      it('can format a invalid date', () => {
        const input = null;
        const output = DATE.INVALID;

        assert.equal(defaultFormat(input), output);
      });
    });
  });
}
