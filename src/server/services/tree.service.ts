import { ExpressionTree, ExpressionTreeObject } from '../../addon/binding';
import { GetGraphRequestDto } from '../../common/types/dto/tree/get-graph.dto';
import { GRAPH_BREAK_DIVERGENCE } from '../constants';

class TreeService {
  public getGraph(dto: GetGraphRequestDto): any {
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
    tree: ExpressionTreeObject,
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
    tree: ExpressionTreeObject,
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

export const treeService = new TreeService();
