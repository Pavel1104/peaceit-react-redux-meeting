import { fromJS } from 'immutable';

import Post from 'api/models/post';
import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR
} from './constants';

const initialState = fromJS({
  isLoading: true,
  post: new Post(),
  error: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return state.set('isLoading', true);

    case FETCH_POST_SUCCESS:
      return state.merge({
        post: action.payload.post,
        isLoading: false,
      });

    case FETCH_POST_ERROR:
      return state.merge({
        error: action.payload.message,
        isLoading: false,
      });
  }

  return state;
}
