import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import Input from './General/Input';
import Button from './General/Button';
import { addQuestion } from '../actions';

class AddCard extends React.Component {
  static navigationOptions = () => ({ title: 'Add Card' });
  state = {
    question: '',
    answer: '',
  };
  handleChange = name => (value) => {
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async () => {
    const { title } = this.props.navigation.state.params;
    Keyboard.dismiss();
    this.setState(() => ({
      question: '',
      answer: '',
    }));
    await this.props.addQuestion(title, this.state);
    this.props.navigation.goBack(this.props.navigation.state.key);
  };
  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Input
            onTextChange={this.handleChange('question')}
            placeholder="Question"
            value={question}
          />
          <Input onTextChange={this.handleChange('answer')} placeholder="Answer" value={answer} />
          <Button text="Submit" onPress={this.handleSubmit} style={{ alignSelf: 'center' }} />
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

AddCard.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  addQuestion: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});

export default connect(null, { addQuestion })(AddCard);
