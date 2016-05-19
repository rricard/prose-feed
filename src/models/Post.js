/* @flow */

import GraphQuill from "graph-quill"
import {
  GraphQLString,
  GraphQLBoolean,
} from "graphql"

import orm from "../backends/object-relational-mapper"
import MarkdownContent from "./content/MarkdownContent"
import BaseContent, {BaseContentInterface} from "./content/BaseContent"

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
  // some event hooks and setup the virtual content system
  constructor(...args) {
    super(...args)

    const onUpdating = model => {
      model.set("updated_at", Date.now())
      if(model.get("published")) {
        model.set("published_at", Date.now())
      }
    }

    this.on("creating", model => {
      model.set("created_at", Date.now())
      onUpdating(model)
    })

    this.on("updating", onUpdating)
  }

  // ### Title field
  //
  // - **Returns** The title of the post
  title(): string {
    return this.get("title")
  }

  // ### Content Access
  //
  // - **Returns** the content object stored
  postContent(): BaseContent {
    return this.get("content")
  }

  // ### Content type forcing
  //
  // Forces the content in a certain type of format (null otherwise)
  markdownPostContent(): ?MarkdownContent {
    const raw = this.get("content").raw()
    return raw.markdown ? new MarkdownContent(raw.markdown) : null
  }


  // ### Publication assertion
  //
  // - **Returns** Whether the post is published or not
  published(): boolean {
    return this.get("published")
  }

  // ### Publication date
  //
  // - **Returns** The date of publication of the post or `null` if not
  publicationDate(): ?Date {
    if(this.published()) {
      return new Date(this.get('published_at'))
    }
    return null
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

  // ### All _published_ posts retriever
  //
  // - **Returns** all _published_ posts
  static allPublishedPosts(): Promise<Array<Post>> {
    return new Post({published: true})/*.orderBy("-updated_at")*/.fetchAll()
    .then(coll => coll.models)
  }

  // ### Single post retreiver (by id)
  //
  // - `id` - the id of the post to retreive
  // - **Returns** the post
  static getById(id: number): Promise<Post> {
    return new Post({id}).fetch()
  }
}

// ### Table setup
//
// Let the Post model act on the `posts` table
Post.prototype.tableName = "posts"

// ### Virtuals
//
// Associate virtual values to Post such as the content.
// We need to ensure our methods won't be cancelled
Post.prototype.virtuals = {
  content: {
    get: function getContent() {
      const type = this.get("content_type")
      const pureRaw = this.get("content_raw")
      const raw = pureRaw.length !== undefined ?
        JSON.parse(pureRaw) :
        pureRaw
      switch(type) {
      case "Markdown":
        return new MarkdownContent(raw.markdown)
      }
      return new BaseContent(type, raw)
    },
    set: function setContent(content: BaseContent) {
      this.set("content_type", content.type())
      this.set("content_raw", JSON.stringify(content.raw()))
    },
  },
}

// ## Type Wrapping
//
// Annotate GraphQL types around the Post model
Post = GraphQuill.createType(Post, {
  name: "Post",
  description: "Represents an authored post in the blog",
  idField: "id",
  resolveById: Post.getById,
}, {
  title: {
    description: "The title of the publication",
    type: GraphQLString,
  },
  postContent: {
    description: "The content of the post",
    type: BaseContentInterface,
  },
  markdownPostContent: {
    description: "Coerce the content to markdown content or `null`",
    type: () => MarkdownContent,
  },
  published: {
    description: "Whether the post was published or not",
    type: GraphQLBoolean,
  },
  creationDate: {
    description: "The moment when the publication was created",
    type: GraphQLString,
  },
  publicationDate: {
    description: "The moment when the publication was published",
    type: GraphQLString,
  },
  updateDate: {
    description: "The moment when the publication last updated",
    type: GraphQLString,
  },
})

// As well as for its static methods that be considered as root queries
Post.allPosts = GraphQuill.createRootQueryConnection(
  Post.allPosts, "allPosts", {
    description: "All of the posts",
    connectedType: () => Post,
  }
)
Post.allPublishedPosts = GraphQuill.createRootQueryConnection(
  Post.allPublishedPosts, "allPublishedPosts", {
    description: "All of the _published_ posts",
    connectedType: () => Post,
  }
)

export default Post
