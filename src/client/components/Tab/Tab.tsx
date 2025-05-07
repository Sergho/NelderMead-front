import clsx from 'clsx';
import classes from './Tab.module.scss';
import { FC, useState } from 'react';
import { Function } from '../Function/Function';
import { Log } from '../Log/Log';
import { createTree } from '../../axios/create-tree';
import { getGraph } from '../../axios/get-graph';
import { useAppSelector } from '../../app/hooks';

interface TabProps {
  className?: string;
}

export const Tab: FC<TabProps> = (props: TabProps) => {
  const { className } = props;

  const expression = useAppSelector((state) => state.expressionInput.expression);

  const [logs, setLogs] = useState('');

  async function handleSubmit() {
    const tree = await createTree(expression);
    setLogs(JSON.stringify(tree, null, 2));

    const graph = await getGraph(expression);
    console.log(graph);
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Function</h1>
      <Function onSubmit={handleSubmit} expression={expression} className={classes.function} />
      <Log logs={logs} />
    </div>
  );
};
