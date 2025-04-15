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
  console.log(content);
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Row index={1}>{content || ''}</Row>
    </div>
  );
};
