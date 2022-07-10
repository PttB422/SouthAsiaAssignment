import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

type InputFieldProps<T> = {
  control: Control<T, any>;
  errors: Record<string, any>;
  fieldName: string;
  fieldLabel?: string;
  inputStyle?: ViewStyle;
  inputProp?: TextInputProps;
};

const InputField = <T extends FieldValues>({
  fieldLabel,
  control,
  fieldName,
  inputStyle,
  errors,
  inputProp,
}: InputFieldProps<T>) => {
  return (
    <View style={styles.container}>
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
          <TextInput
            style={[
              styles.input,
              { borderColor: errors[fieldName] ? '#F66D6D' : '#ddd' },
              inputStyle,
            ]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...inputProp}
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
    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  errorMsg: {
    color: '#F66D6D',
    fontSize: 12,
    paddingHorizontal: 12,
  },
  label: {
    paddingHorizontal: 12,
  },
});

export default InputField;
