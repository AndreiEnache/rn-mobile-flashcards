import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import Input from './General/Input';
import Button from './General/Button';
import * as api from '../utils/api';
import { addDeck } from '../actions';
import { getDeck } from '../reducers';

class NewDeck extends React.Component {
  state = {
    title: '',
  };

  handleChange = (text) => {
    this.setState({
      title: text,
    });
  };

  handleSubmit = async () => {
    let { title } = this.state;
    title = title.trim();
    const alreadyExists = !!this.props.getDeckByTitle(title);
    if (alreadyExists) {
      alert(`Deck ${title} already exists`);
    } else {
      Keyboard.dismiss();
      await this.props.addDeck(title);
      this.props.navigation.goBack(this.props.navigation.state.key);
    }
  };
  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.mainTextView}>
          <Text style={styles.mainText}>What is the title of your new deck?</Text>
        </View>
        <Input value={title} onTextChange={this.handleChange} placeholder="Deck title" />

        <Button onPress={this.handleSubmit} text="Submit" style={{ marginBottom: 86 }} />
      </KeyboardAvoidingView>
    );
  }
}

NewDeck.propTypes = {
  addDeck: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTextView: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  mainText: {
    fontSize: 50,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  getDeckByTitle: getDeck(state),
});
export default connect(mapStateToProps, { addDeck })(NewDeck);