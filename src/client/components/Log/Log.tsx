import clsx from 'clsx';
import classes from './Log.module.scss';
import { FC } from 'react';
import { Button } from '../Button/Button';
import { Text } from './ui/Text/Text';
import { useAppSelector } from '../../app/hooks';
import { Darkness } from '../../types/enums/darkness.enum';
import { Size } from '../../types/enums/size.enum';

interface LogProps {
  className?: string;
}

export const Log: FC<LogProps> = (props: LogProps) => {
  const { className } = props;

  const logs = useAppSelector((state) => state.logs.logs);

  function handleClick() {
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'nelder-mead.log';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  return (
    <div className={clsx(className, classes.wrapper)}>
      <Text className={classes.text} content={logs} />
      <Button
        onClick={handleClick}
        className={classes.button}
        darkness={Darkness.Dark}
        size={Size.Big}
      >
        Save
      </Button>
    </div>
  );
};
