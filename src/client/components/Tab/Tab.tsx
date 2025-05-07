import clsx from 'clsx';
import classes from './Tab.module.scss';
import { ChangeEvent, FC, useState } from 'react';
import { Function } from '../Function/Function';
import { Log } from '../Log/Log';
import { createTree } from '../../axios/create-tree';
import { getGraph } from '../../axios/get-graph';

interface TabProps {
  className?: string;
}

export const Tab: FC<TabProps> = (props: TabProps) => {
  const { className } = props;

  const [expression, setExpression] = useState('');
  const [logs, setLogs] = useState('');

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setExpression(value);
  }

  async function handleSubmit() {
    const tree = await createTree(expression);
    setLogs(JSON.stringify(tree, null, 2));

    const graph = await getGraph(expression);
    console.log(graph);
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Function</h1>
      <Function
        onInput={handleChange}
        onSubmit={handleSubmit}
        expression={expression}
        className={classes.function}
      />
      <Log logs={logs} />
    </div>
  );
};
