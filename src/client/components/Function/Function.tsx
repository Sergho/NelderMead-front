import clsx from 'clsx';
import classes from './Function.module.scss';
import { FC } from 'react';
import { Area } from './ui/Area/Area';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLogs } from '../../features/logs/logs.slice';
import { createTree } from '../../axios/create-tree';
import { getGraph } from '../../axios/get-graph';

interface FunctionProps {
  className?: string;
}

export const Function: FC<FunctionProps> = (props: FunctionProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.expressionInput.expression);

  async function handleClick() {
    const tree = await createTree(expression);
    dispatch(setLogs(JSON.stringify(tree, null, 2)));

    const graph = await getGraph(expression);
    console.log(graph);
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
