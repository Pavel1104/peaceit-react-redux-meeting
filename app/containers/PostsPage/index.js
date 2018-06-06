/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { fetchPostsRequest } from './actions';

export class PostsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchPostsRequest();
  }

  render() {
    const { posts, isLoading, error } = this.props;

    return (
      <Grid item xs={6}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {posts.map(post => (
          <Card key={post.get('id')}>
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {post.get('title')}
              </Typography>
              <Typography component="p">
                {post.get('body')}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/posts/${post.get('id')}`}>
                <Button size="small" color="primary">
                  Go to post
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Grid>
    );
  }
}

PostsPage.propTypes = {
  fetchPostsRequest: PropTypes.func,
  posts: PropTypes.instanceOf(List),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPostsRequest
  }, dispatch);
}

// const mapStateToProps = createStructuredSelector({});
function mapStateToProps(state) {
  return {
    isLoading: state.get('posts').get('isLoading'),
    posts: state.get('posts').get('posts'),
    error: state.get('posts').get('error')
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'posts', reducer });
const withSaga = injectSaga({ key: 'posts', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PostsPage);
