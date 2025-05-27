import clsx from 'clsx';
import classes from './SettingsTab.module.scss';
import { FC } from 'react';
import { ParamsInput } from '../../../ParamsInput/ParamsInput';

interface SettingsTabProps {
  className?: string;
}

export const SettingsTab: FC<SettingsTabProps> = (props: SettingsTabProps) => {
  const { className } = props;

  return (
    <div className={clsx(className, classes.wrapper)}>
      <h1 className={classes.title}>Settings</h1>
      <ParamsInput className={classes.inputs} />
    </div>
  );
};
