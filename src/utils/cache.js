const cache = {};

export const getCache = (key) => cache[key];
export const setCache = (key, value) => {
  cache[key] = value;
};
