/* @flow */

import {qbPromise} from "../src/backends/query-builder"

// Ensure that the query builder will be ready (migrations + seed done)
before(() => qbPromise)
