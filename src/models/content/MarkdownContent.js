/* @flow */

import GraphQuill from "graph-quill"
import {
  GraphQLString,
} from "graphql"
import marked from "marked"

import BaseContent, {BaseContentInterface} from "./BaseContent"

// # Markdown class
//
// Handles markdown content
class MarkdownContent extends BaseContent {
  // ### Constructor
  //
  // Construct a markdown content just from the raw markdown text
  //
  // - `markdown` - the markdown raw text
  constructor(markdown: string) {
    super("Markdown", {markdown})
  }

  // ### Access raw markdown
  //
  // - **Returns** the markdown raw text
  markdown(): string {
    return this.raw().markdown
  }

  // ### Access processed markdown
  //
  // - **Returns** the processed markdown as html
  html(): string {
    return marked(this.raw().markdown)
  }
}

// ## Annotate GraphQL type
MarkdownContent = GraphQuill.createType(MarkdownContent, {
  name: "MarkdownContent",
  description: "Stores and presents markdown post content",
  interfaces: [BaseContentInterface],
}, {
  type: {
    type: GraphQLString,
    description: "The type of content being watched",
  },
  markdown: {
    type: GraphQLString,
    description: "The original markdown content",
  },
  html: {
    type: GraphQLString,
    description: "The converted markdown content to HTML",
  },
})

export default MarkdownContent
