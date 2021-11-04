import {Block, Select, Text, FormSelect} from '@components/base';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {number, object} from 'yup';

export const exampleValidate = object().shape({
  select: object().shape({
    value: number().min(3, 'Item need larger than 2'),
  }),
});

const ExampleSelect = () => {
  const [selected, setSelected] = useState();
  const [selected2, setSelected2] = useState();

  const [multiple, setMultiple] = useState();

  const {control} = useForm({
    resolver: yupResolver(exampleValidate),
    mode: 'onChange',
    defaultValues: [],
  });

  return (
    <Block flex backgroundColor="white" padding={16}>
      <Select
        label="Single Select"
        selected={selected}
        onSelected={setSelected}
        data={sampleData}
        placeholder="Select item"
      />
      <Block height={24} />
      <Select
        label="Multiple Select"
        selected={multiple}
        onSelected={setMultiple}
        data={sampleData}
        placeholder="Select items"
        type="multiple"
        submitText="Submit"
      />
      <Block height={24} />
      <Select
        label="Select with custom icon"
        selected={selected2}
        onSelected={setSelected2}
        data={sampleData}
        placeholder="Select item"
        leftIcon={{type: 'octicons', name: 'home'}}
        rightIcon={{type: 'octicons', name: 'chevron-up'}}
      />

      <Block height={24} />
      <Text fontType="bold" size={16}>
        Sample Form
      </Text>
      <FormSelect
        name="select"
        label="Sample Select"
        data={sampleData}
        placeholder="Select items"
        control={control}
        showError
      />
    </Block>
  );
};

export default ExampleSelect;

const sampleData = Array(8)
  .fill(0)
  .map((_i, index) => ({
    label: `Label ${index}`,
    value: index,
  }));
