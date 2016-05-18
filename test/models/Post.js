/* @flow */

import assert from "assert"

import Post from "../../src/models/Post"

const WELCOME_POST_TITLE = "Welcome to ProseFeed!"

describe("Post Model", () => {
  it("should obtain the Welcome Post with resolvable fields", () => {
    return new Post({title: WELCOME_POST_TITLE}).fetch()
    .then((post: Post) => {
      assert(post.id > 0)
      assert.equal(post.title(), WELCOME_POST_TITLE)
      assert(post.creationDate() > 0)
      assert(post.updateDate() > 0)
    })
  })

  it("should have a method to list posts", () => {
    return Post.allPosts()
    .then((posts: Array<Post>) => {
      assert(posts.length > 0)
      const post = posts.filter(p => p.title() === WELCOME_POST_TITLE)[0]
      assert(post.id > 0)
      assert.equal(post.title(), WELCOME_POST_TITLE)
      assert(post.creationDate() > 0)
      assert(post.updateDate() > 0)
    })
  })
})
