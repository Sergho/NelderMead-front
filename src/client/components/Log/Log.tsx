import clsx from 'clsx';
import classes from './Log.module.scss';
import { FC } from 'react';
import { Button } from '../Button/Button';
import { Darkness, Size } from '../../types/enums';
import { Text } from './ui/Text/Text';

interface LogProps {
  className?: string;
}

export const Log: FC<LogProps> = (props: LogProps) => {
  const { className } = props;
  return (
    <div className={clsx(className, classes.wrapper)}>
      <Text className={classes.text} />
      <Button className={classes.button} darkness={Darkness.Dark} size={Size.Big}>
        Save
      </Button>
    </div>
  );
};
