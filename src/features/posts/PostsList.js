import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumOfPosts = createSelector(
  state => state.posts,
  posts => posts.length
)

export const PostsCounter = () => {
  const NumOfPosts = useSelector(selectNumOfPosts)
  return <div>Number of Posts: {NumOfPosts}</div>
}

export const PostsList = () => {
  const posts = useSelector(state => state.posts)

  const renderedPosts = posts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      <PostsCounter />
      {renderedPosts}
    </section>
  )
}