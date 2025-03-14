import { FC } from 'react';
import styles from './Keyboard.module.scss';
import Button from '../Button/Button';
import { BUTTONS } from '../../common/cosntants';

const Keyboard: FC = () => {
  return (
    <div className={styles.keyboard}>
      {BUTTONS.map((button) => {
        return <Button type={button.type} value={button.value} />;
      })}
    </div>
  );
};

export default Keyboard;
