import clsx from 'clsx';
import classes from './Input.module.scss';
import { ChangeEvent, FC, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setExpression } from '../../../../features/inputs/inputs.slice';

interface InputProps {
  className?: string;
}

export const Input: FC<InputProps> = (props: InputProps) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.inputs.expression);

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  document.fonts.ready.then(updateWidth);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setExpression(e.target.value));
    updateWidth();
  }

  function updateWidth() {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = expression;
      const width = spanRef.current.clientWidth;
      inputRef.current.style.width = `${width}px`;
    }
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <input
        className={classes.input}
        ref={inputRef}
        type="text"
        value={expression}
        onChange={handleChange}
      />
      <span className={classes.buffer} ref={spanRef} />
    </div>
  );
};
