import { ExpressionTree, NelderMeadMethod } from '../../addon/binding';
import { GetGraphRequestDto } from '../../common/types/dto/get-graph.dto';
import { GRAPH_BREAK_DIVERGENCE } from '../constants';

class MainService {
  public getSimplexes(expression: string): number[][][] {
    const tree = ExpressionTree.createTree(expression);
    const method = new NelderMeadMethod(tree);
    const simplexes = method.minimumSearch();

    const valuedSimplexes: number[][][] = [];
    for (const simplex of simplexes) {
      const valuedSimplex: number[][] = [];
      let pointBreak = false;
      for (const point of simplex) {
        let value: number;
        try {
          value = tree.evaluate(point);
          valuedSimplex.push([...point, value]);
        } catch {
          pointBreak = true;
          break;
        }
      }
      if (pointBreak) break;
      valuedSimplexes.push(valuedSimplex);
    }

    return valuedSimplexes;
  }

  public getGraph(dto: GetGraphRequestDto): {
    x: number[];
    y: number[];
    z?: number[];
  } {
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
  ): { x: number[]; y: number[] } {
    const min = Math.min(from, to);
    const max = Math.max(from, to);

    const result = {
      x: [],
      y: [],
    };

    let prevValue: number = null;
    for (let i = min; i <= max; i += interval) {
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
  ): {
    x: number[];
    y: number[];
    z: number[];
  } {
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
}

export const mainService = new MainService();
