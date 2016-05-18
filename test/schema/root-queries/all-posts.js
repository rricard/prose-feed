/* @flow */

import { createQueryAsserter } from "graph-spec"

import schema from "../../../src/schema"

const assertQuery = createQueryAsserter(schema)

describe("GraphQL Schema", () => {
  describe("query allPosts", () => {
    it("should list all posts", () => assertQuery(`
      query TestAllPosts {
        allPosts {
          edges {
            node {
              id
              title
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
            },
          },
        ],
      },
    }))
  })
})
