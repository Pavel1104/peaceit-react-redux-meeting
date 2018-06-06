import { Record, List } from 'immutable';

const post = Record({
  id: undefined,
  userId: null,
  title: '',
  body: '',
  comments: new List()
});

export default post;