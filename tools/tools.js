export const deepFlatten = (arr) => {
  const flatten = (arr) => [].concat(...arr);
  return flatten(arr.map(x => Array.isArray(x) ? deepFlatten(x) : x));
};

export const deduplicateArray = (arr) => {
  return [...new Set(arr)];
};
