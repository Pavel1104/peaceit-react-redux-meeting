import { fromJS, List } from 'immutable';

import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isLoading: true,
  posts: new List(),
  error: null,
});

function postsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return state.set('isLoading', true);

    case FETCH_POSTS_SUCCESS:
      return state.merge({
        posts: action.payload.posts,
        isLoading: false,
      });

    case FETCH_POSTS_ERROR:
      return state.merge({
        error: action.payload.message,
        isLoading: false,
      });
  }

  return state;
}

export default postsReducer;











