import clsx from 'clsx';
import classes from './Text.module.scss';
import { FC, useEffect, useRef, useState } from 'react';
import { Row } from '../Row/Row';

interface TextProps {
  className?: string;
  content?: string;
}

export const Text: FC<TextProps> = (props: TextProps) => {
  const { className, content } = props;
  const rows = content.length === 0 ? [] : content.split('\n');
  const lastRef = useRef<HTMLSpanElement>(null);
  const [indexWidth, setIndexWidth] = useState(0);

  useEffect(() => {
    const width = lastRef.current?.offsetWidth || 0;
    setIndexWidth(width);
  }, [content]);

  return (
    <div className={clsx(className, classes.wrapper)}>
      {rows.map((row: string, index: number) => {
        return (
          <Row
            key={index + 1}
            index={index + 1}
            indexWidth={index !== rows.length - 1 ? indexWidth : null}
            ref={index === rows.length - 1 ? lastRef : null}
          >
            {row}
          </Row>
        );
      })}
    </div>
  );
};
