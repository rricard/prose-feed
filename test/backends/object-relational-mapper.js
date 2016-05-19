/* @flow */

import assert from "assert"
import orm from "../../src/backends/object-relational-mapper"

describe("ORM Backend", () => {
  it("should be setup", () => {
    assert(orm.Model)
  })
})
