/* @flow */

import path from "path"
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
// - `migrationsDir` - Where to fetch the migrations to run
// - `seedsDir` - Where to fetch the seeds to get
// - **Returns**
//   - a new query builder (with pooled connections)
//   - a promise to the same query builder **after** migration and seed.
//     You can't expect anything setted up before this promise returns!
export function createQueryBuilder(
  client: string = "sqlite",
  connection: {[option: string]: string} = {filename: "/tmp/pfdb.sqlite"},
  searchPath?: string,
  migrationsDir?: string = path.join(__dirname, "../migrations"),
  seedsDir?: string = path.join(__dirname, "../seeds")
): [mixed, Promise] {
  const knex: mixed = createKnex({
    client: client,
    connection: connection,
    searchPath: searchPath,
    useNullAsDefault: true,
    migrations: { directory: migrationsDir },
    seeds: { directory: seedsDir },
  })
  return [
    knex,
    (knex.migrate ? knex.migrate.latest() : Promise.resolve(knex))
    .then(() => knex.seed ? knex.seed.run() : knex)
    .then(() => knex),
  ]
}

// ## Pull from configuration connection establishment
//
// Using the application's configuration, we can load the Query Builder
//
// - **Returns**
//   - a new query builder (with pooled connections)
//   - a promise to the same query builder **after** migration and seed.
//     You can't expect anything setted up before this promise returns!
export function createQueryBuilderFromConfiguration(): [mixed, Promise] {
  return createQueryBuilder(
    config.get("db:client"),
    config.get("db:conn"),
    config.get("db:searchPath")
  )
}

// ## Export a default, configuration-based, query-builder
//
// By default, don't require anyone to do anything and send a query builder
// whether the migrations/run were performed or not
const [qb, promisedQb] = createQueryBuilderFromConfiguration()
export default qb

// ## Export the migration completion promise too
//
// Important if you want to hook completion events on the standard qb
export const qbPromise = promisedQb
