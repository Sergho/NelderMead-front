import clsx from 'clsx';
import classes from './Text.module.scss';
import { FC } from 'react';
import { Row } from '../Row/Row';

interface TextProps {
  className?: string;
  content?: string;
}

export const Text: FC<TextProps> = (props: TextProps) => {
  const { className, content } = props;

  const getRows = (): string[] => {
    if (content.length === 0) return [];
    return content.split('\n');
  };

  return (
    <div className={clsx(className, classes.wrapper)}>
      {getRows().map((row: string, index: number) => {
        return (
          <Row key={index} index={index}>
            {row}
          </Row>
        );
      })}
    </div>
  );
};
