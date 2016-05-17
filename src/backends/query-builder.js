/* @flow */

import createKnex from "knex"

import config from "./configuration"

// # Query-builder backend
//
// [knex.js](http://knexjs.org)-based Query-builder configured using our
// [configuration backend](./configuration.js).
//
// ## Agnostic connection establishment
//
// We start by creating a function detached from anything to create a
// connection
//
// - `client` - The type of client to consider (sqlite3/pg/mysql/mariasql)
// - `connection` - Configures the client to connect to the DB
// - `searchPath` - Optional Network Search Path for the DB
// - **Returns** a new query builder (with pooled connections)
export function createQueryBuilder(
  client: string = "sqlite",
  connection: {[option: string]: string} = {filename: "/tmp/pfdb.sqlite"},
  searchPath?: string
) {
  return createKnex({
    client: client,
    connection: connection,
    searchPath: searchPath,
    useNullAsDefault: true,
  })
}

// ## Pull from configuration connection establishment
//
// Using the application's configuration, we can load the Query Builder
//
// - **Returns** a new query builder (with pooled connections)
export function createQueryBuilderFromConfiguration() {
  return createQueryBuilder(
    config.get("db:client"),
    config.get("db:conn"),
    config.get("db:searchPath")
  )
}

// ## Export a default, configuration-based, query-builder
//
// By default, don't require anyone to do anything
export default createQueryBuilderFromConfiguration()
