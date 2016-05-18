/* @flow */

import assert from "assert"
import {qbPromise} from "../../src/backends/query-builder"

describe("QueryBuilder Backend", () => {
  it("should establish a working connection with the DB", () => {
    return qbPromise
    .then(qb => qb.select().table('posts'))
    .then(r => assert(r.length !== undefined))
  })
})
