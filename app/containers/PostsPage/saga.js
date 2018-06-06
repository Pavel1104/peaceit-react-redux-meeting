import { call, put, takeLatest, take, cancel } from 'redux-saga/effects';
import { List } from 'immutable';

import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import Api from 'api/api';
import Post from 'api/models/post';

import { FETCH_POSTS_REQUEST } from './constants';
import { fetchPostsSuccess, fetchPostsError } from './actions';

function* fetchPosts() {
  const url = '/posts';

  try {
    const response = yield call(Api.get, url);
    const posts = new List(response.map(post => new Post(post)));

    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsError(error.message));
  }
}

export default function* postsSaga() {
  const fetchPostsWatcher = yield takeLatest(FETCH_POSTS_REQUEST, fetchPosts);

  yield take('@@router/LOCATION_CHANGE');

  yield cancel(fetchPostsWatcher);
}
