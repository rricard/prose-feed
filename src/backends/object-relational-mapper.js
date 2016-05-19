/* @flow */

import createBookshelf from "bookshelf"

import defaultQb from "./query-builder"

// # Object Relational Mapper (ORM) backend
//
// [bookshelf.js](http://bookshelfjs.org)-based ORM configured using the
// [query-builder backend](./query-builder.js)
//
// ## Agnostic creation
//
// We start by giving the capability to create a bookshelf from any knex
//
// - `qb` - the knex query builder to wrap
// - **Returns** a bookshelf orm
export function createObjectRelationalMapper(qb: any): any {
  let bookshelf = createBookshelf(qb)
  bookshelf.plugin('virtuals')
  return bookshelf
}

// ## Pull from existing qb defaults
//
// We set up an orm using the existing qb backend
export default createObjectRelationalMapper(defaultQb)
