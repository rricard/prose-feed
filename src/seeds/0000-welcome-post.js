/* @flow */

import Post from "../models/Post"

const WELCOME_POST_TITLE = "Welcome to ProseFeed!"

export function seed(): Promise {
  return new Post({title: WELCOME_POST_TITLE})
  .fetch()
  .then(r => r ? r : new Post({title: WELCOME_POST_TITLE}).save())
}
