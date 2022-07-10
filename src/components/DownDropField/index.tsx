import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import ArrowDownIcon from '@components/Icons/ArrowDown';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
type DropDownFieldProps<T, E> = {
  control: Control<T, any>;
  errors: Record<string, any>;
  fieldName: string;
  fieldLabel?: string;
  data: E[];
  valueField: string;
  labelField: string;
  value?: string;
};

const DropDownField = <T extends FieldValues, E>({
  errors,
  control,
  fieldName,
  fieldLabel,
  data,
  valueField,
  labelField,
  value,
}: DropDownFieldProps<T, E>) => {
  const findDefaultIndex = () =>
    data.findIndex(
      //@ts-ignore
      (item) => item[valueField] === value,
    );
  return (
    <View>
      <Text
        style={[
          styles.label,
          { color: errors[fieldName] ? '#F66D6D' : '#000' },
        ]}>
        {fieldLabel}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectDropdown
            data={data}
            defaultValueByIndex={findDefaultIndex()}
            onSelect={(selectedItem) => {
              onChange(selectedItem[valueField]);
              onBlur();
              return selectedItem[valueField];
            }}
            buttonTextAfterSelection={(selectedItem) =>
              selectedItem[labelField]
            }
            renderCustomizedRowChild={(selectedItem) => (
              <Text>{selectedItem[labelField]}</Text>
            )}
            rowTextForSelection={(item) => item}
            buttonStyle={{
              ...styles.buttonStyle,
              borderColor: errors[fieldName] ? '#F66D6D' : '#ddd',
            }}
            buttonTextStyle={styles.buttonTextStyle}
            dropdownStyle={styles.dropdownStyle}
            renderDropdownIcon={() => <ArrowDownIcon />}
            onBlur={onBlur}
          />
        )}
        name={fieldName as Path<T>}
      />
      {errors[fieldName] && (
        <Text style={styles.errorMsg}>{errors[fieldName].message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  errorMsg: {
    color: '#F66D6D',
    fontSize: 12,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  label: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  buttonStyle: {
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    width: '100%',
  },
  buttonTextStyle: {
    fontSize: 14,
    color: '#000',
    textAlign: 'left',
  },
  dropdownStyle: {
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
  },
});
export default DropDownField;
