import clsx from 'clsx';
import classes from './Input.module.scss';
import { ChangeEvent, FC, useRef } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { setExpressionInput } from '../../../../features/function/expression-input.slice';

interface InputProps {
  className?: string;
  value?: string;
}

export const Input: FC<InputProps> = (props: InputProps) => {
  const { className, value } = props;

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  document.fonts.ready.then(updateWidth);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setExpressionInput(e.target.value));
    updateWidth();
  }

  function updateWidth() {
    if (inputRef.current && spanRef.current) {
      spanRef.current.textContent = value;
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
        value={value}
        onChange={handleChange}
      />
      <span className={classes.buffer} ref={spanRef} />
    </div>
  );
};
