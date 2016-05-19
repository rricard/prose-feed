/* @flow */

import GraphQuill from "graph-quill"

import Post from "../models/Post"
import MarkdownContent from "../models/content/MarkdownContent"

// # GraphQL Schema
//
// We use directly the GraphQuill-annotated Models to create the schema like
// magic!
export default GraphQuill.createSchema([
  Post,
  MarkdownContent,
], [
  Post.allPosts,
  Post.allPublishedPosts,
])
