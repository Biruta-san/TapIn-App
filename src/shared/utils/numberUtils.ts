export const getIntNumber = (value: string): number => {
  try {
    return parseInt(value, 10);
  } catch (error) {
    return 0;
  }
};
