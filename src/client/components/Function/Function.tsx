import clsx from 'clsx';
import classes from './Function.module.scss';
import { FC } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLogs } from '../../features/logs/logs.slice';
import { getGraph } from '../../axios/get-graph';
import { setGraphPoints } from '../../features/graph/graph-points.slice';
import { setAsideOpened } from '../../features/aside/aside.slice';
import { getSolution } from '../../axios/get-solution';
import { setSimplexes } from '../../features/simplex/simplex.slice';
import { getLimits } from '../../utils/get-limits';

interface FunctionProps {
  className?: string;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.expressionInput.expression);

  async function handleClick() {
    const solution = await getSolution(expression);
    dispatch(
      setLogs(
        solution.simplexes
          .map((simplex) => {
            const dimension = simplex?.z ? 2 : 1;
            const points: number[][] = [];
            for (let i = 0; i < simplex.x.length; i++) {
              if (dimension === 1) points.push([simplex.x[i], simplex.y[i]]);
              else points.push([simplex.x[i], simplex.y[i], simplex.z[i]]);
            }
            return points
              .map((point) => {
                return point.join(', ');
              })
              .join(' - ');
          })
          .join('\n'),
      ),
    );
    dispatch(setSimplexes(solution.simplexes));

    const limits = getLimits(solution.simplexes);
    const graph = await getGraph(expression, limits.from - 1, limits.to + 1);
    dispatch(setGraphPoints({ ...graph }));

    dispatch(setAsideOpened(false));
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Area className={classes.area} />
      <Button className={classes.button} onClick={handleClick} rounded>
        Launch
      </Button>
    </div>
  );
};
