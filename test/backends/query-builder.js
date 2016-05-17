/* @flow */

import assert from "assert"
import qb from "../../src/backends/query-builder"

describe("QueryBuilder Backend", () => {
  it("should establish a working connection with the DB", () => {
    assert(qb)
  })
})
