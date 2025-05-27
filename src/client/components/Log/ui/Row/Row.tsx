import clsx from 'clsx';
import classes from './Row.module.scss';
import { forwardRef, PropsWithChildren } from 'react';
import { useAppSelector } from '../../../../app/hooks';

interface RowProps extends PropsWithChildren {
  className?: string;
  index: number;
  text?: string;
  indexWidth?: number;
}
export const Row = forwardRef<HTMLSpanElement, RowProps>((props, ref) => {
  const { className, index, children, indexWidth } = props;

  const isError = useAppSelector((state) => state.logs.isError);

  return (
    <div className={clsx(className, classes.wrapper)}>
      <span
        ref={ref}
        className={classes.index}
        style={{ width: indexWidth ? `${indexWidth}px` : 'auto' }}
      >
        {index}
      </span>
      <p
        className={clsx(classes.content, {
          [classes.error]: isError,
        })}
      >
        {children}
      </p>
    </div>
  );
});
