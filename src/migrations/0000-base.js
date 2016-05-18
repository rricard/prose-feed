/* @flow */

export function up(qb: any): Promise {
  return qb.schema
  .createTableIfNotExists("posts", t => {
    t.increments()
    t.string('title')
    t.timestamps()
  })
}

export function down(qb: any): Promise {
  return qb.schema
  .dropTableIfExists("posts")
}
