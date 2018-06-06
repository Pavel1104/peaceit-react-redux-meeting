import { call, put, takeLatest, take, cancel } from 'redux-saga/effects';

import Api from 'api/api';
import Post from 'api/models/post';
import PostComment from 'api/models/postComment';

import { FETCH_POST_REQUEST } from './constants';
import { fetchPostSuccess, fetchPostError } from './actions';

function* fetchPost({ payload }) {
  const postUrl = `/posts/${payload.id}`;
  const commentsUrl = `/posts/${payload.id}/comments`;

  try {
    const postResponse = yield call(Api.get, postUrl);
    const commentsResponse = yield call(Api.get, commentsUrl);

    let post = new Post(postResponse);

    post = post.set(
      'comments', 
      commentsResponse.map(comment => new PostComment(comment))
    );

    yield put(fetchPostSuccess(post));
  } catch (error) {
    yield put(fetchPostError(error.message));
  }
}

export default function* postSaga() {
  const fetchPostWatcher = yield takeLatest(FETCH_POST_REQUEST, fetchPost);

  yield take('@@router/LOCATION_CHANGE');

  yield cancel(fetchPostWatcher);
}
