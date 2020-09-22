import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { parseISO, formatDistanceToNow } from 'date-fns';
import {
  fetchPosts,
  selectAllPosts,
  selectPostIds,
  selectPostById,
} from './postsSlice';
import { selectUserById } from '../users/usersSlice';

export const PostsCounter = () => {
  const ids = useSelector(selectPostIds);
  return <div>Number of Posts: {ids.length}</div>;
};

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const author = useSelector((state) => selectUserById(state, post.user));

  const date = parseISO(post.date);
  const timeAgo = formatDistanceToNow(date);

  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <span>{author ? author.name : 'Unknown author!'}</span>
      <span title={post.date}>
        &nbsp; <i>{timeAgo} ago</i>
      </span>
      <p>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  const dispatch = useDispatch();
  // const posts = useSelector(selectAllPosts);
  const postIds = useSelector(selectPostIds);

  // console.log('[debug] posts ', posts);

  const postStatus = useSelector((state) => {
    return state.posts.status;
  });
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;

  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === 'succeeded') {
    const orderedPostIds = postIds.slice().reverse();
    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <section>
      <h2>Posts</h2>
      <PostsCounter />
      {content}
    </section>
  );
};
