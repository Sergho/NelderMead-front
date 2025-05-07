import clsx from 'clsx';
import classes from './Input.module.scss';
import { ChangeEventHandler, FC, useRef } from 'react';

interface InputProps {
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const Input: FC<InputProps> = (props: InputProps) => {
  const { className, onChange, value } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  document.fonts.ready.then(updateWidth);

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
        onChange={onChange}
      />
      <span className={classes.buffer} ref={spanRef} />
    </div>
  );
};
