/* @flow */

import {
  GraphQLInterfaceType,
  GraphQLString,
} from "graphql"
import MarkdownContent from "./MarkdownContent"

// # BaseContent class
//
// Post content will be embedded in a JSON field right inside the Post.
// This class is the starting point of building new contents in this JSON field
class BaseContent {

  // ### Constructor
  //
  // - `type` - the content's type
  // - `raw` - the raw content
  constructor(type: string, raw: mixed) {
    this._type = type
    this._raw = raw
  }

  // ### Access Type
  //
  // - **Returns** the content's type
  type(): string {
    return this._type
  }

  // ### Access ContentBase
  //
  // - **Returns** raw stored content
  raw(): mixed {
    return this._raw
  }
}

// ## Interface
//
// For genericity, we provide an interface for contents
export const BaseContentInterface = new GraphQLInterfaceType({
  name: "Content",
  description: "Represents any kind of content",
  fields: {
    type: {
      type: GraphQLString,
      description: "The type of content being watched",
    },
  },
  resolveType: (obj: BaseContent) => {
    switch(obj.type()) {
    case "Markdown":
      return MarkdownContent.GraphQLType
    }
    return null
  },
})

export default BaseContent
