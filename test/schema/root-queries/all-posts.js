/* @flow */

import { createQueryAsserter } from "graph-spec"

import schema from "../../../src/schema"

const assertQuery = createQueryAsserter(schema)

describe("GraphQL Schema", () => {
  describe("query allPosts", () => {
    it("should list all posts", () => assertQuery(`
      fragment MarkdownFragment on MarkdownContent {
        markdown
        html
      }

      query TestAllPosts {
        allPosts {
          edges {
            node {
              id
              title
              postContent {
                type
                ...MarkdownFragment
              }
            }
          }
        }
      }
    `, {
      "allPosts": {
        "edges": [
          {
            "node": {
              "id": "UG9zdDox",
              "title": "Welcome to ProseFeed!",
              "postContent": {
                "type": "Markdown",
                "markdown": "Hello! Welcome to ProseFeed! Let's now get started.",
                "html":"<p>Hello! Welcome to ProseFeed! Let&#39;s now get started.</p>\n",
              },
            },
          },
        ],
      },
    }))
  })
})
