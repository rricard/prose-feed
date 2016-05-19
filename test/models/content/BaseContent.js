/* @flow */

import assert from "assert"

import BaseContent from "../../../src/models/content/BaseContent"

describe("BaseContent Model", () => {
  it("should store a content type and its raw data", () =>{
    const content = new BaseContent("Test", {hello: "world"})
    assert.equal(content.type(), "Test")
    assert.equal(content.raw().hello, "world")
  })
})
