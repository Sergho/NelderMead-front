import { FC } from 'react';
import styles from './Keyboard.module.scss';
import Button from '../Button/Button';
import { Type } from '../../common/enums';

const Keyboard: FC = () => {
  return (
    <div className={styles.keyboard}>
      <Button type={Type.Light} value="7" />
      <Button type={Type.Light} value="8" />
      <Button type={Type.Light} value="9" />
      <Button type={Type.Dark} value="+" />
      <Button type={Type.Light} value="4" />
      <Button type={Type.Light} value="5" />
      <Button type={Type.Light} value="6" />
      <Button type={Type.Dark} value="-" />
      <Button type={Type.Light} value="1" />
      <Button type={Type.Light} value="2" />
      <Button type={Type.Light} value="3" />
      <Button type={Type.Dark} value="x" />
      <Button type={Type.Light} value="." />
      <Button type={Type.Light} value="0" />
      <Button type={Type.Light} value="=" />
      <Button type={Type.Dark} value="/" />
    </div>
  );
};

export default Keyboard;
