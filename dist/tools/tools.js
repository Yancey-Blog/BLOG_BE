"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const deepFlatten = exports.deepFlatten = arr => {
  const flatten = arr => [].concat(...arr);
  return flatten(arr.map(x => Array.isArray(x) ? deepFlatten(x) : x));
};

const deduplicateArray = exports.deduplicateArray = arr => {
  return [...new Set(arr)];
};