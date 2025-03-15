export const updatedQuery = (result: string) => {
  if (result === 'Error!') return [];
  const res = result.split('').map((char) => {
    return { char, operation: false };
  });
  return res;
};
