export const sameAs = (field, getValues) => (value) => {
  return value === getValues()[field];
};
