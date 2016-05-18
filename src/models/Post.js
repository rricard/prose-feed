/* @flow */

import GraphQuill from "graph-quill"
import {
  GraphQLString,
} from "graphql"

import orm from "../backends/object-relational-mapper"

class Post extends orm.Model {
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

  title(): string {
    return this.get("title")
  }

  creationDate(): Date {
    return new Date(this.get("created_at"))
  }

  updateDate(): Date {
    return new Date(this.get("updated_at"))
  }
}

Post.prototype.tableName = "posts"

export default GraphQuill.createType(Post, {
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
