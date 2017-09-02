import types from '../constants';

const createList = (filter) => {
  return (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case types.RECEIVE_TODOS:
        return action.response.map(t => t.id);
      default:
        return state;
    }
  };
};

export default createList;

export const getIds = state => state;
