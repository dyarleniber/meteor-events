import { format } from 'date-fns';
import { DATE } from '../infra/constants';

/*
 * Formats a date using a default format,
 * in case of invalid date, a default message will be returned.
 */
export const defaultFormat = date =>
  date ? format(date, DATE.FORMAT) : DATE.INVALID;
