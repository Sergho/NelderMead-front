import classes from './Aside.module.scss';
import clsx from 'clsx';
import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { NavGroup } from '../NavGroup/NavGroup';
import { FunctionIcon } from '../NavGroup/ui/FunctionIcon/FunctionIcon';
import { SettingsIcon } from '../NavGroup/ui/SettingsIcon/SettingsIcon';
import { TabGroup } from '../TabGroup/TabGroup';
import { FunctionTab } from '../TabGroup/ui/FunctionTab/FunctionTab';
import { SettingsTab } from '../TabGroup/ui/SettingsTab/SettingsTab';

interface AsideProps {
  className?: string;
}
export const Aside: FC<AsideProps> = (props: AsideProps) => {
  const { className } = props;

  const activeIndex = useAppSelector((state) => state.aside.activeIndex);

  return (
    <div
      className={clsx(className, classes.wrapper, {
        [classes.opened]: activeIndex !== null,
      })}
    >
      <NavGroup>
        <FunctionIcon />
        <SettingsIcon />
      </NavGroup>
      <TabGroup>
        <FunctionTab />
        <SettingsTab />
      </TabGroup>
    </div>
  );
};
