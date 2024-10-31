import React from 'react';
import style from './Heading.module.css';
import { Text } from '../../../UI/Text';

interface HeadingProps {
  text: string;
}

export const Heading: React.FC<HeadingProps> = ({ text }) => (
  <Text
    As='h1'
    size={22}
    tsize={26}
    center
    className={style.heading}
  >
    {text}
  </Text>
  );