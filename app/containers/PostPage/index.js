/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { List } from 'immutable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import saga from './saga';
import reducer from './reducer';

import { fetchPostRequest } from './actions';

class PostPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const postId = this.props.match.params.id;

    this.props.fetchPostRequest(postId);
  }

  render() {
    const { isLoading, post, error } = this.props;

    return (
      <Grid item xs={10}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <Card>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {post.get('title')}
            </Typography>
            <Typography component="p">
              {post.get('body')}
            </Typography>
          </CardContent>
        </Card>
        {post.get('comments').map(comment => (
          <Card key={comment.get('id')}>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {comment.get('email')}
              </Typography>
              <Typography component="p">
                {comment.get('body')}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    );
  }
}

PostPage.propTypes = {
  fetchPostsRequest: PropTypes.func,
  posts: PropTypes.instanceOf(List),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPostRequest
  }, dispatch);
}

// const mapStateToProps = createStructuredSelector({});
function mapStateToProps(state) {
  return {
    isLoading: state.get('post').get('isLoading'),
    post: state.get('post').get('post'),
    error: state.get('post').get('error')
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'post', reducer });
const withSaga = injectSaga({ key: 'post', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PostPage);