export const getLimits = (
  simplexes: { x: number[]; y: number[]; z?: number[] }[],
): {
  from: number;
  to: number;
} => {
  if (!simplexes?.length) return null;
  const dimension = simplexes[0]?.z ? 2 : 1;

  const result: {
    from: number;
    to: number;
  } = {
    from: null,
    to: null,
  };
  for (const simplex of simplexes) {
    let min, max;
    if (dimension === 1) {
      min = Math.min(...simplex.x);
      max = Math.max(...simplex.x);
    } else {
      min = Math.min(...simplex.x, ...simplex.y);
      max = Math.max(...simplex.x, ...simplex.y);
    }

    if (result.from === null || min < result.from) {
      result.from = min;
    }
    if (result.to === null || max > result.to) {
      result.to = max;
    }
  }

  return result;
};
