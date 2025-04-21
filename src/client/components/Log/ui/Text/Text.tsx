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
  const indexRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [indexWidth, setIndexWidth] = useState(0);

  useEffect(() => {
    const widths = indexRefs.current
      .filter((ref) => ref !== null)
      .map((ref) => ref?.offsetWidth || 0);

    console.log(widths);

    const maxWidth = Math.max(...widths, 0);
    setIndexWidth(maxWidth);
  }, [content]);

  return (
    <div className={clsx(className, classes.wrapper)}>
      {rows.map((row: string, index: number) => {
        return (
          <Row
            key={index}
            index={index}
            indexWidth={indexWidth}
            ref={(el) => {
              indexRefs.current[index] = el;
            }}
          >
            {row}
          </Row>
        );
      })}
    </div>
  );
};
