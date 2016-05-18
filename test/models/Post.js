/* @flow */

import assert from "assert"

import Post from "../../src/models/Post"

describe("Post Model", () => {
  it("should obtain the Welcome Post with resolvable fields", () => {
    return new Post({title: "Welcome to ProseFeed!"}).fetch()
    .then(post => {
      assert(post.id > 0)
      assert.equal(post.title(), "Welcome to ProseFeed!")
      assert(post.creationDate() > 0)
      assert(post.updateDate() > 0)
    })
  })
})
