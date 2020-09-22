import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

const selectNumOfPosts = createSelector(
  (state) => state.posts,
  (posts) => posts.length
);

export const PostsCounter = () => {
  const NumOfPosts = useSelector(selectNumOfPosts);
  return <div>Number of Posts: {NumOfPosts}</div>;
};

export const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p>{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      <PostsCounter />
      {renderedPosts}
    </section>
  );
};
