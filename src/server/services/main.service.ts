import { ExpressionTree, NelderMeadMethod } from '../../addon/binding';
import { Params } from '../../common/types/params';
import { GetGraphRequestDto } from '../../common/types/dto/get-graph.dto';
import { GraphPoints } from '../../common/types/graph-points';
import { Simplex } from '../../common/types/simplex';
import { GRAPH_BREAK_DIVERGENCE, PARAMS_LIMITS, SOLUTION_LIMIT } from '../constants';
import { SimplexParams } from '../../common/types/simplex-params';

class MainService {
  public getSimplexes(expression: string, params: Params, startSimplex: SimplexParams): Simplex[] {
    const tree = ExpressionTree.createTree(expression);
    this.checkParams(tree, params, startSimplex);

    const method = new NelderMeadMethod(tree, {
      reflection: +params.reflection,
      expansion: +params.expansion,
      contraction: +params.contraction,
      homothety: +params.homothety,
      dispersion: +params.dispersion,
    });

    method.setSimplex(this.getStartSimplex(startSimplex));

    const simplexes: Simplex[] = [];
    for (const simplex of method.minimumSearch(+params.iterationsLimit)) {
      if (simplexes.length >= params.iterationsLimit) break;
      const coords: number[][] = [];
      const values: number[] = [];

      let pointBreak = false;
      for (const point of simplex) {
        if (point.length === 0) {
          throw new Error('Constant function');
        }

        for (const index in point) {
          if (Math.abs(point[index]) > SOLUTION_LIMIT) {
            pointBreak = true;
            break;
          }
          if (!coords[index]) {
            coords[index] = [];
          }
          coords[index].push(point[index]);
        }

        try {
          if (point.includes(Infinity) || point.includes(-Infinity)) {
            throw new Error('Infinite point');
          }
          values.push(tree.evaluate(point));
        } catch {
          pointBreak = true;
          break;
        }
      }

      if (pointBreak) continue;
      simplexes.push({ coords, values });
    }

    return simplexes;
  }

  public getGraph(dto: GetGraphRequestDto): GraphPoints {
    const { expression, from, to, interval } = dto;

    const tree = ExpressionTree.createTree(expression);
    const dimension = tree.getNumberVariables();

    const actions = {
      1: this.getGraph2D,
      2: this.getPoints3D,
    };

    if (!(dimension in actions)) throw new Error('Incorrect dimension');

    return { ...actions[dimension](tree, from, to, +interval) };
  }
  private getGraph2D(
    tree: ExpressionTree,
    from: number,
    to: number,
    interval: number,
  ): GraphPoints {
    const min = Math.min(from, to);
    const max = Math.max(from, to);

    const result = {
      x: [],
      y: [],
    };

    let prevValue: number = null;
    for (let i = min; i < max + interval; i += interval) {
      result.x.push(i);
      let value: number = null;
      try {
        value = tree.evaluate([i]);
        if (Math.abs(prevValue - value) >= GRAPH_BREAK_DIVERGENCE)
          throw new Error('Function break');
      } catch {
        value = null;
      } finally {
        result.y.push(value);
        prevValue = value;
      }
    }

    return result;
  }

  private getPoints3D(
    tree: ExpressionTree,
    from: number,
    to: number,
    interval: number,
  ): GraphPoints {
    const min = Math.min(from, to);
    const max = Math.max(from, to);

    const result = {
      x: [],
      y: [],
      z: [],
    };

    for (let i = min; i <= max; i += interval) {
      result.x.push(i);
      result.y.push(i);
    }

    let prevValue: number;
    for (const x of result.x) {
      const line: number[] = [];
      for (const y of result.y) {
        let value: number = null;
        try {
          value = tree.evaluate([x, y]);
          if (Math.abs(prevValue - value) >= GRAPH_BREAK_DIVERGENCE)
            throw new Error('Function break');
        } catch {
          value = null;
        } finally {
          line.push(value);
          prevValue = value;
        }
      }
      result.z.push(line);
    }

    return result;
  }

  private checkParams(tree: ExpressionTree, params: Params, startSimplex: SimplexParams) {
    console.log(params);
    for (const param in params) {
      if (!(param in PARAMS_LIMITS)) continue;

      const value = +params[param];
      if (value < PARAMS_LIMITS[param]?.min)
        throw Error(`${param} must not be less than ${PARAMS_LIMITS[param].min}`);
      if (value > PARAMS_LIMITS[param]?.max)
        throw Error(`${param} must not be greater than ${PARAMS_LIMITS[param].max}`);
    }

    const dimension = tree.getNumberVariables();
    if (dimension !== +startSimplex.dimension) throw Error('Wrong start simplex dimension');
  }
  private getStartSimplex(startSimplex: SimplexParams): number[][] {
    const points: number[][] = [startSimplex.startPoint.map((n) => +n)];
    for (let i = 0; i < startSimplex.dimension; i++) {
      const point = [...startSimplex.startPoint].map((n) => +n);
      point[i] += +startSimplex.simplexOffset;
      points.push(point);
    }
    return points;
  }
}

export const mainService = new MainService();
