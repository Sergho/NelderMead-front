import clsx from 'clsx';
import classes from './Graph.module.scss';
import { FC } from 'react';

interface GraphProps {
  className?: string;
}

export const Graph: FC<GraphProps> = (props: GraphProps) => {
  const { className } = props;
  return <div className={clsx(className, classes.wrapper)}></div>;
};
