import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, KeyboardAvoidingView, Text, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Input from './General/Input';
import Button from './General/Button';
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
    // Keyboard.dismiss() has problems working with alerts... replace alerts?
    setTimeout(() => {
      Keyboard.dismiss();
    }, 500);
    if (alreadyExists) {
      alert(`Deck ${title} already exists`);
    } else {
      this.setState(() => ({ title: '' }));
      await this.props.addDeck(title);
      this.props.navigation.navigate('SelectedDeck', { title });
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
  getDeckByTitle: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
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
