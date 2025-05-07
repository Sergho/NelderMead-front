import clsx from 'clsx';
import classes from './Log.module.scss';
import { FC } from 'react';
import { Button } from '../Button/Button';
import { Darkness, Size } from '../../types/enums';
import { Text } from './ui/Text/Text';
import { useAppSelector } from '../../app/hooks';

interface LogProps {
  className?: string;
}

export const Log: FC<LogProps> = (props: LogProps) => {
  const { className } = props;

  const logs = useAppSelector((state) => state.logs.logs);

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Text className={classes.text} content={logs} />
      <Button className={classes.button} darkness={Darkness.Dark} size={Size.Big}>
        Save
      </Button>
    </div>
  );
};
