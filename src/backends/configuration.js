/* @flow */

import nconf from "nconf"

// # Configuration backend
//
// Centralizes all configuration needs from the app.
// This backend is powered by [nconf](https://github.com/indexzero/nconf).
//
// ## Direct configuration via argv and env
//
// The most overriding configuration will be performed by providing args to the
// cli and then by providing env variables
//
// ### Argv
//
// Here we configure the exposed options in the CLI that will be translated in
// the config.
let config = nconf.argv({
  "db:client": {
    describe:
      "The database client used by the engine: pg, mysql, mariasql, sqlite3",
  },
  "db:conn": {
    describe:
      "A connection string used to connect (ex: postgres://localhost/mydb)",
  },
  "db:conn:host": {describe: "The DB's host used by the engine"},
  "db:conn:user": {describe: "The DB's user used by the engine"},
  "db:conn:password": {describe: "The user's password used by the engine"},
  "db:conn:database": {describe: "The DB on the host used by the engine"},
  "db:conn:filename": {describe: "SQLite's DB filename"},
  "db:conn:socketPath": {describe: "The DB's UNIX Socket"},
  "db:searchPath": {describe: "The network search path for the DB"},
})

// ### Env
//
// Here we change the separator value for nested params from ":" to "__" in
// order to be able to write the given opts
config = config.env('__')

// ### Defaults
//
// By default, we set the following things, also depending on the environment
// we're in.
//
// #### Environment-specific Defaults
//
// We can switch here on the environment we have:
let envDefaults: {[key: string]: mixed} = {}
switch(config.get("NODE_ENV")) {
case "test":
  envDefaults = {
    db: {
      conn: {
        user: "prosefeedtest",
        database: "prosefeedtest",
        filename: "./tmp/prosefeed.sqlite",
      },
    },
  }
  break
case "production":
  envDefaults = {}
  break
}

// #### Define defauts and merge with env-specific
//
// Here we define the default conf and merge it with our Environment-specific
// default params.
config = config.defaults(Object.assign({
  db: {
    client: "sqlite3",
    conn: {
      host: "localhost",
      user: "prosefeed",
      database: "prosefeed",
      filename: "./tmp/prosefeed.sqlite",
    },
  },
}, envDefaults))

export default config
