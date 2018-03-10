import sortBy from 'lodash/sortBy';
import * as TYPES from '../types';

function decksReducer(state = { decks: [] }, action) {
  const { question, decks, title } = action;
  switch (action.type) {
    case TYPES.ADD_QUESTION_SUCCESS:
      return {
        ...state,
        decks: state.decks.map(d => (d.title === title ? { ...d, questions: [...d.questions, question] } : d)),
      };
    case TYPES.ADD_DECK_SUCCESS:
      return {
        ...state,
        decks: [...state.decks, { title, questions: [] }],
      };
    case TYPES.RECEIVE_DECKS_SUCCESS:
      return { ...state, decks };
    default:
      return state;
  }
}

export const getDecks = state => sortBy(state.decks, 'title');
export const getDeck = state => title => state.decks.find(d => d.title === title);

export default decksReducer;
