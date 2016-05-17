/* @flow */

import assert from "assert"
import config from "../../src/backends/configuration"

describe("Configuration Backend", () => {
  it("should read the environment variables properly", () => {
    assert.equal(config.get("NODE_ENV"), "test")
  })

  it("should set to test db configuration", () => {
    assert.equal(config.get("db:conn:user"), "prosefeedtest")
    assert.equal(config.get("db:conn:database"), "prosefeedtest")
    assert.equal(config.get("db:conn:filename"), "./tmp/prosefeed.sqlite")
  })
})
