import { ExpressionTree, ExpressionTreeObject } from '../../addon/binding';
import { GetGraphRequestDto } from '../../common/types/dto/tree/get-graph.dto';
import { GraphPoint } from '../../common/types/GraphPoint';
import { ValuedGraphPoint } from '../../common/types/ValuedGraphPoint';
import { GRAPH_BREAK_DIVERGENCE } from '../constants';

class TreeService {
  public getGraph(dto: GetGraphRequestDto): any {
    const { expression, from, to, interval } = dto;

    if (!from?.coords || !to?.coords) {
      throw new Error('Incorrect input format');
    }

    if (from?.coords?.length !== to?.coords?.length) throw new Error('Inequal edges dimensions');

    const dimension = from.coords.length;
    const actions = {
      1: this.getPoints2D,
    };

    if (!(dimension in actions)) throw new Error('Incorrect dimension');

    const tree = ExpressionTree.createTree(expression);
    const points = actions[dimension](tree, from, to, +interval);

    const valuedPoints: ValuedGraphPoint[] = [];
    let prevValue: number = null;
    for (const point of points) {
      let value: number = null;
      try {
        value = tree.evaluate(point.coords);
        if (Math.abs(prevValue - value) >= GRAPH_BREAK_DIVERGENCE)
          throw new Error('Function break');
      } catch {
        value = null;
      } finally {
        valuedPoints.push({ ...point, value });
        prevValue = value;
      }
    }

    return valuedPoints;
  }
  private getPoints2D(
    tree: ExpressionTreeObject,
    from: GraphPoint,
    to: GraphPoint,
    interval: number,
  ): GraphPoint[] {
    const min = Math.min(from.coords[0], to.coords[0]);
    const max = Math.max(from.coords[0], to.coords[0]);

    const points: GraphPoint[] = [];
    for (let i = min; i <= max; i += interval) {
      points.push({
        coords: [i],
      });
    }

    return points;
  }
}

export const treeService = new TreeService();
