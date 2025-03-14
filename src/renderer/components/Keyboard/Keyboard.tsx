import { FC } from 'react';
import styles from './Keyboard.module.scss';
import Button from '../Button/Button';
import { BUTTONS } from '../../common/constants';
import { Type } from '../../common/enums';

interface KeyboardProps {
  onClick: (code: string, operation: boolean) => void;
}

const Keyboard: FC<KeyboardProps> = (props: KeyboardProps) => {
  const { onClick } = props;

  return (
    <div className={styles.keyboard}>
      {BUTTONS.map((button) => {
        return (
          <Button
            type={button.operation ? Type.Dark : Type.Light}
            value={button.char}
            onClick={() => {
              onClick(button.char, button.operation);
            }}
          />
        );
      })}
    </div>
  );
};

export default Keyboard;
