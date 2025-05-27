import classes from './Aside.module.scss';
import clsx from 'clsx';
import { FC } from 'react';
import { Tab } from '../Tab/Tab';
import { useAppSelector } from '../../app/hooks';
import { NavGroup } from '../NavGroup/NavGroup';
import { FunctionIcon } from '../NavGroup/ui/FunctionIcon/FunctionIcon';
import { SettingsIcon } from '../NavGroup/ui/SettingsIcon/SettingsIcon';

interface AsideProps {
  className?: string;
}
export const Aside: FC<AsideProps> = (props: AsideProps) => {
  const { className } = props;

  const opened = useAppSelector((state) => state.asideOpened.opened);

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.opened]: opened,
      })}
    >
      <NavGroup>
        <FunctionIcon />
        <SettingsIcon />
      </NavGroup>
      <Tab />
    </div>
  );
};
