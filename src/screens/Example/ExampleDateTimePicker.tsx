import React, {useState} from 'react';
import {Block, DateTimePicker} from '@components/base';
import moment from 'moment';

const ExampleDateTimePicker = () => {
  const [date, setDate] = useState('');
  const [date2, setDate2] = useState('');
  const [time, setTime] = useState('');

  return (
    <Block padding={16} flex backgroundColor="white">
      <DateTimePicker
        value={date}
        onChange={setDate}
        placeholder="Select date"
        label="Date Picker"
        maximumDate={moment().add(30, 'd').toDate()}
        minimumDate={moment().subtract(90, 'd').toDate()}
      />
      <Block height={24} />
      <DateTimePicker
        value={time}
        onChange={setTime}
        placeholder="Select time"
        label="Time Picker"
        mode="time"
      />
      <Block height={24} />
      <DateTimePicker
        value={date2}
        onChange={setDate2}
        placeholder="Select date"
        label="Select date with custom icon"
        leftIcon={{type: 'octicons', name: 'calendar'}}
      />
    </Block>
  );
};

export default ExampleDateTimePicker;
