import { Simplex } from '../../common/types/simplex';

export const getLimits = (
  simplexes: Simplex[],
): {
  from: number;
  to: number;
} => {
  if (!simplexes?.length) return null;

  const result: {
    from: number;
    to: number;
  } = {
    from: null,
    to: null,
  };

  for (const simplex of simplexes) {
    for (const coord of simplex.coords) {
      for (const value of coord) {
        if (result.from === null || value < result.from) {
          result.from = value;
        }
        if (result.to === null || value > result.to) {
          result.to = value;
        }
      }
    }
  }

  return result;
};
