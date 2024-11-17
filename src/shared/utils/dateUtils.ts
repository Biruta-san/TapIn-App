export const getLocaleDateString = (date: string): string | null => {
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  } catch (error) {
    return null;
  }
};
