import clsx from 'clsx';
import classes from './Input.module.scss';
import React, { ChangeEvent, FC, useRef, useState } from 'react';

interface InputProps {
  className?: string;
  initialValue?: string;
}

export const Input: FC<InputProps> = (props: InputProps) => {
  const { className, initialValue } = props;
  const [value, setValue] = useState(initialValue);
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

  function handleEvent(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    updateWidth();
  }

  return (
    <div>
      <input
        className={clsx(className, classes.input)}
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleEvent}
      />
      <span className={clsx(className, classes.buffer)} ref={spanRef} />
    </div>
  );
};
