import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white, black } from '../../utils/colors';

const Button = ({ text, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
    <Text style={style.backgroundColor === white ? { color: black } : { color: white }}>
      {text}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
};

Button.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 7,
    height: 40,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    backgroundColor: black,
  },
});

export default Button;
