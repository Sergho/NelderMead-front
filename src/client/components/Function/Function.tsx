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
            return simplex
              .map((point) => {
                return `[${point.join(', ')}]`;
              })
              .join(' - ');
          })
          .join('\n'),
      ),
    );

    const graph = await getGraph(expression);
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
