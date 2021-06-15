import React from 'react';
import { Button } from '@/design/components';

const TimePicker = ({ value, onChange }) => {
  return <Button type="secondary">{value.format('')}</Button>;
};

export default TimePicker;
