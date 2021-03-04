/*
 * Takes an array of objects and a key (string),
 * and returns a new object composed of keys,
 * where the corresponding value of each key
 * is an array of elements that have been matched.
 */
export const groupBy = (items, key) =>
  items.reduce((result, item) => {
    if (item[key]) {
      return { ...result, [item[key]]: [...(result[item[key]] || []), item] };
    }
    return result;
  }, {});
