import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR
} from './constants';

export function fetchPostRequest(id) {
  return {
    type: FETCH_POST_REQUEST,
    payload: {
      id
    }
  }
}

export function fetchPostSuccess(post) {
  return {
    type: FETCH_POST_SUCCESS,
    payload: {
      post
    }
  }
}

export function fetchPostError(message) {
  return {
    type: FETCH_POST_ERROR,
    payload: {
      message,
    }
  }
}
