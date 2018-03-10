import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, StyleSheet } from 'react-native';
import { gray } from '../../utils/colors';

const Input = ({
  value, onTextChange, placeholder, style,
}) => (
  <View style={styles.textInputView}>
    <TextInput
      onChangeText={onTextChange}
      value={value}
      style={[styles.textInput, style]}
      placeholder={placeholder}
      placeholderTextColor={gray}
    />
  </View>
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
};

Input.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
    width: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Input;
