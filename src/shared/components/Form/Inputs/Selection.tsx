import React from 'react';
import {DimensionValue, StyleSheet} from 'react-native';
import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';
import Caption from './Caption';

export interface Option {
  value: number;
  title: string;
}

interface SelectionProps {
  options: Option[];
  setValue: (value: number | number[]) => void;
  w?: DimensionValue;
  width?: DimensionValue;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

const Selection = ({
  options,
  setValue,
  w,
  width,
  label,
  helperText,
  placeholder,
}: SelectionProps): React.ReactElement => {
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >();

  const styles = StyleSheet.create({
    container: {
      width: w ?? width ?? '80%',
    },
  });

  return (
    <Layout style={styles.container} level="1">
      <Select
        selectedIndex={selectedIndex}
        label={label}
        placeholder={placeholder}
        caption={<Caption helperText={helperText} />}
        value={
          selectedIndex ? options[(selectedIndex as IndexPath).row].title : ''
        }
        onSelect={index => {
          setSelectedIndex(index);
          if (options?.length > 0 && index instanceof IndexPath) {
            setValue(options[index.row].value);
          }
        }}>
        <>
          {options.map(option => (
            <SelectItem key={option.value} title={option.title} />
          ))}
        </>
      </Select>
    </Layout>
  );
};

export default Selection;
