/* @flow */

import assert from "assert"

import MarkdownContent from "../../../src/models/content/MarkdownContent"

const MD = `# Hello

_World!_
`

const HTML = `<h1 id="hello">Hello</h1>
<p><em>World!</em></p>
`

describe("MarkdownContent Model", () => {
  it("should store some markdown and be able to render it", () =>{
    const content = new MarkdownContent(MD)
    assert.equal(content.type(), "Markdown")
    assert.equal(content.raw().markdown, MD)
    assert.equal(content.markdown(), MD)
    assert.equal(content.html(), HTML)
  })
})
