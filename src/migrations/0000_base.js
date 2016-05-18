/* @flow */

export function up(qb: mixed): Promise {
  return qb.schema && qb.schema
  .createTableIfNotExists("posts", t => {
    t.increments()
    t.string('title')
    t.timestamps()
  })
}

export function down(qb: mixed): Promise {
  return qb.schema && qb.schema
  .dropTableIfExists("posts")
}
