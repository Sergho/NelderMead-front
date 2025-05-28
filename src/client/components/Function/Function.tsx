import clsx from 'clsx';
import classes from './Function.module.scss';
import { FC } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchSolution } from '../../features/solution/fetch-solution.thunk';
import { fetchGraph } from '../../features/graph/fetch-graph.thunk';
import { getLimits } from '../../utils/get-limits';
import { setStatus } from '../../features/graph/graph.slice';
import { Status } from '../../types/enums/status.enum';

interface FunctionProps {
  className?: string;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.inputs.expression);
  const params = useAppSelector((state) => state.inputs.params);
  const startSimplex = useAppSelector((state) => state.inputs.startSimplex);

  async function handleClick() {
    dispatch(fetchSolution({ expression, params, startSimplex }))
      .unwrap()
      .then((solution) => {
        const limits = getLimits(solution.simplexes);
        dispatch(fetchGraph({ expression, limits }));
      })
      .catch(() => {
        dispatch(setStatus(Status.Failed));
      });
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
