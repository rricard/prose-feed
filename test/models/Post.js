/* @flow */

import assert from "assert"

import Post from "../../src/models/Post"

const WELCOME_POST_TITLE = "Welcome to ProseFeed!"

const MD = "Hello! Welcome to ProseFeed! Let's now get started."

const HTML = `<p>Hello! Welcome to ProseFeed! Let&#39;s now get started.</p>
`

describe("Post Model", () => {
  const assertWelcomePost = (post: Post) => {
    assert(post.id > 0)
    assert.equal(post.title(), WELCOME_POST_TITLE)
    assert.equal(post.published(), true)
    assert.equal(post.postContent().type(), "Markdown")
    assert.equal(post.postContent().markdown(), MD)
    assert.equal(post.postContent().html(), HTML)
    assert(post.publicationDate() > 0)
    assert(post.creationDate() > 0)
    assert(post.updateDate() > 0)
  }

  it("should obtain the Welcome Post with resolvable fields", () => {
    return new Post({title: WELCOME_POST_TITLE}).fetch()
    .then(assertWelcomePost)
  })

  it("should have a method to list posts", () => {
    return Post.allPosts()
    .then((posts: Array<Post>) => {
      assert(posts.length > 0)
      assertWelcomePost(
        posts.filter(p => p.title() === WELCOME_POST_TITLE)[0]
      )
    })
  })

  it("should have a method to list published posts", () => {
    return Post.allPublishedPosts()
    .then((posts: Array<Post>) => {
      assert(posts.length > 0)
      assertWelcomePost(
        posts.filter(p => p.title() === WELCOME_POST_TITLE)[0]
      )
    })
  })
})
