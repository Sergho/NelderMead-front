import clsx from 'clsx';
import classes from './Row.module.scss';
import { forwardRef, PropsWithChildren } from 'react';

interface RowProps extends PropsWithChildren {
  className?: string;
  index: number;
  text?: string;
  indexWidth?: number;
}
export const Row = forwardRef<HTMLSpanElement, RowProps>((props, ref) => {
  const { className, index, children, indexWidth } = props;

  return (
    <div className={clsx(className, classes.wrapper)}>
      <span
        ref={ref}
        className={classes.index}
        style={{ width: indexWidth ? `${indexWidth}px` : 'auto' }}
      >
        {index}
      </span>
      <p className={classes.content}>{children}</p>
    </div>
  );
});
