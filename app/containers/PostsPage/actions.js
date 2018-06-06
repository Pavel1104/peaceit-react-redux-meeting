import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from './constants';

export function fetchPostsRequest() {
  return {
    type: FETCH_POSTS_REQUEST,
  }
}

export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: {
      posts,
    }
  }
}

export function fetchPostsError(message) {
  return {
    type: FETCH_POSTS_ERROR,
    payload: {
      message
    }
  }
}
