import React from 'react';
import { StyleSheet, Platform, View, StatusBar, Text } from 'react-native';
import { Constants } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { setLocalNotification } from './utils/helpers';
import Decks from './components/Decks';
import SelectedDeck from './components/SelectedDeck';
import NewDeck from './components/NewDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { black, white, gray } from './utils/colors';
import decksReducer from './reducers';

const store = createStore(decksReducer, {}, compose(applyMiddleware(thunkMiddleware)));

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ focused, tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ),
        title: 'Decks',
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ focused, tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        ),
        title: 'New Deck',
      },
    },
  },
  {
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  },
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  SelectedDeck: {
    screen: SelectedDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    },
  },
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" translucent />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});
