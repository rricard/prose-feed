/* @flow */

import GraphQuill from "graph-quill"
import {
  GraphQLString,
} from "graphql"

import orm from "../backends/object-relational-mapper"

// # Post model
//
// The most basic model of the blog engine. Don't actually refer to the content
// but defines the main metadata of a post.
//
// ## Class
class Post extends orm.Model {
  // ### Constructor
  //
  // We'll build on the inherited constructor of Bookshelf, all we do is add
  // some event hooks.
  constructor(...args) {
    super(...args)

    this.on("creating", model => {
      model.set("created_at", Date.now())
      model.set("updated_at", Date.now())
    })

    this.on("updating", model => {
      model.set("updated_at", Date.now())
    })
  }

  // ### Title field
  //
  // - **Returns** The title of the post
  title(): string {
    return this.get("title")
  }

  // ### Creation Date field
  //
  // - **Returns** The date of creation of the post
  creationDate(): Date {
    return new Date(this.get("created_at"))
  }

  // ### Update Date field
  //
  // - **Returns** The date of last update of the post
  updateDate(): Date {
    return new Date(this.get("updated_at"))
  }

  // ### All posts retriever
  //
  // - **Returns** all posts
  static allPosts(): Promise<Array<Post>> {
    return new Post()/*.orderBy("-updated_at")*/.fetchAll()
    .then(coll => coll.models)
  }
}

// ### Table setup
//
// Let the Post model act on the `posts` table
Post.prototype.tableName = "posts"

// ## Type Wrapping
//
// Annotate GraphQL types around the Post model
Post = GraphQuill.createType(Post, {
  name: "Post",
  description: "Represents an authored post in the blog",
  idField: "id",
}, {
  title: {
    description: "The title of the publication",
    type: GraphQLString,
  },
  creationDate: {
    description: "The moment when the publication was created",
    type: GraphQLString,
  },
  updateDate: {
    description: "The moment when the publication last updated",
    type: GraphQLString,
  },
})

// As well as for its static methods that be considered as root queries
Post.allPosts = GraphQuill.createRootQueryConnection(Post.allPosts, {
  name: "allPosts",
  connectedType: () => Post,
})

export default Post
