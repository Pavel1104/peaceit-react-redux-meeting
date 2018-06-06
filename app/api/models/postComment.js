import { Record } from 'immutable';

const postComment = Record({
  id: undefined,
  postId: null,
  name: '',
  email: '',
  body: '',
});

export default postComment;
