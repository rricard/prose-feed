/* @flow */

import Post from "../models/Post"
import MarkdownContent from "../models/content/MarkdownContent"

const WELCOME_POST_TITLE = "Welcome to ProseFeed!"

export function seed(): Promise {
  return new Post({title: WELCOME_POST_TITLE})
  .fetch()
  .then(r => r ? r : new Post({
    title: WELCOME_POST_TITLE,
    published: true,
    content: new MarkdownContent(
      `Hello! Welcome to ProseFeed! Let's now get started.`
    ),
  }).save())
}
