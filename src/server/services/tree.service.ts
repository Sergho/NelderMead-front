import { ExpressionTree, ExpressionTreeObject } from '../../addon/binding';
import { GetGraphRequestDto } from '../types/dto/tree/get-graph.dto';
import { GraphPoint } from '../types/GraphPoint';
import { ValuedGraphPoint } from '../types/ValuedGraphPoint';

class TreeService {
  public getGraph(dto: GetGraphRequestDto): ValuedGraphPoint[] {
    const { expression, from, to, interval } = dto;

    if (from.coords.length != to.coords.length) throw new Error('Inequal edges dimensions');

    const dimension = from.coords.length;
    const actions = {
      1: this.getPoints2D,
    };

    if (!(dimension in actions)) throw new Error('Incorrect dimension');

    const tree = ExpressionTree.createTree(expression);
    const points = actions[dimension](tree, from, to, interval);

    const valuedPoints: ValuedGraphPoint[] = [];
    for (const point of points) {
      valuedPoints.push({ ...point, value: tree.evaluate(point.coords) });
    }

    return valuedPoints;
  }
  private getPoints2D(
    tree: ExpressionTreeObject,
    from: GraphPoint,
    to: GraphPoint,
    interval: number,
  ) {
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
