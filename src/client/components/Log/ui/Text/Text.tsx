import clsx from 'clsx';
import classes from './Text.module.scss';
import { FC } from 'react';
import { Row } from '../Row/Row';

interface TextProps {
  className?: string;
}

export const Text: FC<TextProps> = (props: TextProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Row index={1}>First string</Row>
      <Row index={2}>Second string</Row>
      <Row index={3}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi
      </Row>
      <Row index={4}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi harum! Numquam itaque, tenetur velit at
        voluptates corrupti corporis libero consequatur.
      </Row>
      <Row index={5}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Row>
      <Row index={6}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi
      </Row>
      <Row index={7}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi harum! Numquam itaque, tenetur velit at
        voluptates corrupti corporis libero consequatur.
      </Row>
      <Row index={8}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Row>
      <Row index={9}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi
      </Row>
      <Row index={1}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi harum! Numquam itaque, tenetur velit at
        voluptates corrupti corporis libero consequatur.
      </Row>
      <Row index={2}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Row>
      <Row index={3}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi
      </Row>
      <Row index={4}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi harum! Numquam itaque, tenetur velit at
        voluptates corrupti corporis libero consequatur.
      </Row>
      <Row index={5}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Row>
      <Row index={6}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi
      </Row>
      <Row index={7}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti facere iure accusantium
        optio saepe accusamus nihil maiores possimus quasi harum! Numquam itaque, tenetur velit at
        voluptates corrupti corporis libero consequatur.
      </Row>
      <Row index={8}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Row>
    </div>
  );
};
