import { Map as ImmutableMap, List as ImmutableList, fromJS } from 'immutable';
import { ActionType } from 'redux-actions-type';
import { Reducer } from 'redux';

// Actions
export const ActionTypes = {
  LOAD_REQUEST: 'users/LOAD_REQUEST',
  LOAD_SUCCESS: 'users/LOAD_SUCCESS',
  LOAD_FAILURE: 'users/LOAD_FAILURE',

  ADD: 'users/ADD',
} as const;

export const actions = {
  loadRequest() {
    return { type: ActionTypes.LOAD_REQUEST };
  },
  loadSuccess(users) {
    return { type: ActionTypes.LOAD_SUCCESS, users: users };
  },
  loadFailure() {
    return { type: ActionTypes.LOAD_FAILURE, errors: ['Something'] };
  },
  addUser(name) {
    return { type: ActionTypes.ADD, name: name };
  },
  getUsers() {
    return (dispatch) => {
      dispatch(actions.loadRequest());
      dispatch(actions.loadSuccess(['test1']));
    }
  },
};

type Actions = ActionType<typeof actions>;

// Reducer
const initialState = ImmutableMap({
  records: ImmutableList([])
});
const reducer: Reducer<any, Actions> = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.LOAD_REQUEST:
      return state;
    case ActionTypes.LOAD_SUCCESS:
      return state.merge({ records: ImmutableList(action.users) });
    case ActionTypes.LOAD_FAILURE:
      return state;
    case ActionTypes.ADD:
      return state.merge({ records: state.get('records').push(action.name) });
    default:
      return state;
  }
}

export default reducer;
